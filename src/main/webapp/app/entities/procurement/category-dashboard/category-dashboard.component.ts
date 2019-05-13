import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryDashboardService } from './category-dashboard.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../shared/service/shared-data-service';
import { CDFModalService } from '../category-dashboard-filter/category-dashboard-filter.modal.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { FetchData } from '../../common/service/fetch-data';
import { LocalStoreService } from '../../../core/auth/local-storage.service';
import { CDFService } from '../category-dashboard-filter/category-dashboard-filter.service';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'jhi-category-dashboard',
    templateUrl: './category-dashboard.component.html',
    styleUrls: ['../category-dashboard/category-dashboard.css']
})
export class CategoryDashboardComponent implements OnInit, OnDestroy {
    list: any;
    tempList: any;
    loadingData: boolean = true;
    alive = true;
    loading = false;
    total = 0;
    page = 0;
    limit = 10;
    searchKeyword: any[];
    categoryManagers: any[];
    serPop = '';
    noPop = '';
    paydexPop = '';
    modalRef: NgbModalRef;
    isCatManager: boolean = false;
    isProductsTeam: boolean = false;
    param = 'catMgr';
    successMsg: string = '';
    errMsg: string = '';
    payloed: any;
    filterSubscription: Subscription;
    empty: any;
    filterConstants = [
        'supplierSpends',
        'suppliers',
        'supplierDuns',
        'supplierEmails',
        'categoryManagers',
        'companies',
        'supplierCountries',
        'supplierContacts',
        'supplierAddresses',
        'supplierCategories',
        'supplierPhones'
    ];
    filters: any = {};
    totalFilters: number;
    isEmpty = [];
    constructor(
        private customPiwik: CustomPiwik,
        private ds: CategoryDashboardService,
        private router: Router,
        private data: SharedDataService,
        private CDFModalService: CDFModalService,
        private fetchData: FetchData,
        private lc: LocalStoreService,
        private cdf: CDFService
    ) {}
    ngOnDestroy() {
        this.filterSubscription.unsubscribe();
    }
    ngOnInit() {
        for (var x in this.filterConstants) {
            this.filters[this.filterConstants[x]] = [];
        }
        if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_PRODUCTS_TEAM_USER') >= 0) {
            //this.isCatManager=true;
            this.isProductsTeam = true;
            this.param = 'ProdTeam';
        }
        if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_CM_USER') >= 0) {
            this.isCatManager = true;
        }
        this.page = 0;
        const paginationCache = this.lc.getLocalInfo('categoryDashboardPagination');
        let init = true;

        if (paginationCache != undefined && paginationCache != null) {
     
            if (paginationCache.page != undefined && paginationCache.page != null) {
                this.page = paginationCache.page;
            }
            if (paginationCache.filters != undefined && paginationCache.filters != null) {
                this.cdf.updateFilters(paginationCache.filters);
            }
        } else {
            this.cdf.clearFilters();
        }
        this.filterSubscription = this.cdf.data.subscribe(res => {
    
            if (init) {
                init = false;
            } else {
                this.page = 0;
            }

            this.isEmpty = [];
            for (var x in this.filterConstants) {
                if (res[this.filterConstants[x]] != undefined) {
                    if (res[this.filterConstants[x]] == null) {
                        res[this.filterConstants[x]] = [];
                    }
                    if (this.filterConstants[x] == 'suppliers') {
                        this.searchKeyword = res.suppliers
                            .filter(f => {
                                return f.checked;
                            })
                            .map(m => {
                                return m.name;
                            });
                    } else {
                        this.filters[this.filterConstants[x]] = res[this.filterConstants[x]]
                            .filter(f => {
                                return f.checked;
                            })
                            .map(m => {
                                return m.categoryManagers != undefined ? m.categoryManagers : m.name;
                            });
                    }
                }
                if (res.isEmpty[this.filterConstants[x]] != undefined && res.isEmpty[this.filterConstants[x]]) {
                    if (this.filterConstants[x] == 'supplierContacts') {
                        this.isEmpty.push('isContactNameEmpty');
                    }
                    if (this.filterConstants[x] == 'supplierEmails') {
                        this.isEmpty.push('isContactEmailEmpty');
                    }
                    if (this.filterConstants[x] == 'supplierPhones') {
                        this.isEmpty.push('isContactPhoneEmpty');
                    }
                    if (this.filterConstants[x] == 'supplierAddresses') {
                        this.isEmpty.push('isAddressEmpty');
                    }
                    if (this.filterConstants[x] == 'supplierSpends') {
                        this.isEmpty.push('isSpendAbsoluteEmpty');
                    }
                    if (this.filterConstants[x] == 'supplierDuns') {
                        this.isEmpty.push('isDunsNumberEmpty');
                    }
                    if (this.filterConstants[x] == 'categoryManagers') {
                        this.isEmpty.push('isCategoryManagerEmpty');
                    }
                    if (this.filterConstants[x] == 'supplierCountries') {
                        this.isEmpty.push('isSupplierCountryEmpty');
                    }
                    if (this.filterConstants[x] == 'supplierCategories') {
                        this.isEmpty.push('isCategoryEmpty');
                    }
                }
            }

            this.totalFilters =
                this.isEmpty.length +
                (this.searchKeyword.length != undefined && this.searchKeyword.length != null ? this.searchKeyword.length : 0);
            for (var x in this.filters) {
                this.totalFilters += this.filters[x].length;
            }

            this.empty = null;
            if (res.empty != undefined) {
                this.empty = res.empty;
            }

            this.getData('');
        });

        //this.getData(this.payloed);
    }
    openFilter() {
        this.modalRef = this.CDFModalService.open();
    }
    goToPage(n: number): void {
        this.page = n;
    }
    onSorted($event) {
    }
    onNext(): void {
        this.page++;
        this.callBackend();
    }

    onPrev(): void {
        this.page--;
        this.callBackend();
    }

    getData(search) {
        this.loadingData = true;
        this.payloed = {
            from: this.page * this.limit,
            size: this.limit
        };
        if (this.searchKeyword != null && this.searchKeyword != undefined && this.searchKeyword.length > 0) {
            this.payloed.supplierSearch = this.searchKeyword;
        }
        if (
            this.filters.categoryManagers != null &&
            this.filters.categoryManagers != undefined &&
            this.filters.categoryManagers.length > 0
        ) {
            this.payloed.categoryMangerNameSearch = this.filters.categoryManagers;
        }
        if (this.filters.companies != null && this.filters.companies != undefined && this.filters.companies.length > 0) {
            this.payloed.userCompanySearch = this.filters.companies;
        }
        if (this.filters.supplierEmails != null && this.filters.supplierEmails != undefined && this.filters.supplierEmails.length > 0) {
            this.payloed.supplierEmails = this.filters.supplierEmails;
        }
        if (
            this.filters.supplierCountries != null &&
            this.filters.supplierCountries != undefined &&
            this.filters.supplierCountries.length > 0
        ) {
            this.payloed.supplierCountry = this.filters.supplierCountries;
        }
        if (
            this.filters.supplierContacts != null &&
            this.filters.supplierContacts != undefined &&
            this.filters.supplierContacts.length > 0
        ) {
            this.payloed.supplierContacts = this.filters.supplierContacts;
        }
        if (
            this.filters.supplierAddresses != null &&
            this.filters.supplierAddresses != undefined &&
            this.filters.supplierAddresses.length > 0
        ) {
            this.payloed.supplierAddress = this.filters.supplierAddresses;
        }
        if (
            this.filters.supplierAddresses != null &&
            this.filters.supplierAddresses != undefined &&
            this.filters.supplierAddresses.length > 0
        ) {
            this.payloed.supplierAddress = this.filters.supplierAddresses;
        }
        if (
            this.filters.supplierCategories != null &&
            this.filters.supplierCategories != undefined &&
            this.filters.supplierCategories.length > 0
        ) {
            this.payloed.supplierCategory = this.filters.supplierCategories;
        }
        if (this.filters.supplierPhones != null && this.filters.supplierPhones != undefined && this.filters.supplierPhones.length > 0) {
            this.payloed.supplierPhones = this.filters.supplierPhones;
        }
        if (this.filters.supplierDuns != null && this.filters.supplierDuns != undefined && this.filters.supplierDuns.length > 0) {
            this.payloed.supplierDunsNumbers = this.filters.supplierDuns;
        }
        if (this.filters.supplierSpends != null && this.filters.supplierSpends != undefined && this.filters.supplierSpends.length > 0) {
            this.payloed.supplierSpendAbsolute = this.filters.supplierSpends;
        }
        /*  if (this.empty != null) {
            this.payloed.empty = this.empty;
        } */

        if (this.isEmpty.length > 0) {
            for (var x in this.isEmpty) {
                this.payloed[this.isEmpty[x]] = true;
            }
        }

        this.fetchData.getSupplierList(this.payloed, this.param).subscribe(
            res => {
                this.list = res.data;
                if (res.totalCounts != 0) {
                    this.tempList = this.list;
                }
                this.total = res.totalCounts;
                this.loadingData = false;
            },
            err => {
                this.loadingData = false;
            }
        );

        this.setPaginationcache();
    }

    setPaginationcache() {
        const paginationCache: any = {};
        paginationCache.page = this.page;
        paginationCache.filters = this.cdf.getFilters();
        this.lc.storeLocalInfo('categoryDashboardPagination', paginationCache);
    }
    showOldData(event) {
        if (event.target.value == '') {
            // input is cleared then load last search eresult
            this.list = this.tempList;
        }
    }
    callBackend() {
        this.getData(this.searchKeyword);
    }
    searchData(event) {
        let searchSharedValue = event.target.value.toLowerCase();
        this.searchKeyword = searchSharedValue;
        if (searchSharedValue != null) {
            this.page = 0;
            this.getData(searchSharedValue);
        }
    }

    clearSearch() {
        this.searchKeyword = null;
        this.cdf.clearFilters();
        //this.callBackend();
    }
    isSupCollapse = true;
    toggleSupColmn() {
        this.isCatCollapse = true;
        if (this.isSupCollapse) {
            this.isSupCollapse = false;
        } else {
            this.isSupCollapse = true;
        }
    }
    isCatCollapse = true;
    toggleCatColmn() {
        this.isSupCollapse = true;
        if (this.isCatCollapse) {
            this.isCatCollapse = false;
        } else {
            this.isCatCollapse = true;
        }
    }
    editData(item) {
        item.editable = true;
    }
    updateData(item) {
        item.editable = false;
        item.btnHide = true;
        if (this.isProductsTeam) {
            let payload = {
                supplierName: item.supplierName,
                contactName: item.contactName,
                contactEmail: item.contactEmail,
                contactPhone: item.contactPhone,
                dunsNumber: item.dunsNumber,
                isiNumber: item.providerKey.ISIN,
                address: item.address,
                spendAbsolute: item.spendAbsolute,
                spendPercentage: item.spendPercentage
            };
            let param = item.id;

            this.fetchData.updateSupplierList(payload, param).subscribe(
                res => {
                    item.btnHide = false;
                },
                err => {
                    item.btnHide = false;
                }
            );
        }
        if (this.isCatManager) {
            let payload = {
                contactName: item.contactName,
                contactEmail: item.contactEmail,
                contactPhone: item.contactPhone
            };
            let param = item.id;
            this.fetchData.updateSupplierByCatManager(payload, param).subscribe(
                res => {
                    item.btnHide = false;
                },
                err => {
                    item.btnHide = false;
                }
            );
        }
    }
    cancelEdit(item) {
        item.editable = false;
    }
    goToCompliance() {
        this.router.navigate(['/procurement/dashboard']);
    }
    sendComplianceRequest(item) {
        let payload = [item.id];
        this.fetchData.createComplianceRequest(payload).subscribe(
            res => {
                if (res.successList != undefined && res.successList != null && res.successList.length > 0) {
                    item.complianceRequested = true;
                    this.successMsg = 'Compliance Request(s) sent for selected supplier(s).';
                } else {
                    this.errMsg = 'Mandatory data is not available !';
                }
            },
            err => {
                this.errMsg = 'Mandatory data is not available !';
            }
        );
        setTimeout(() => {
            this.errMsg = '';
            this.successMsg = '';
        }, 5000);
    }
    whatClassIsIt(item) {
        if (item != undefined && item != null && item.indexOf('Base') != -1) return 'Base';
        else if (item != undefined && item != null && item.indexOf('Essential') != -1) return 'Essential';
        else if (item != undefined && item != null && item.indexOf('Advantage') != -1) return 'Advantage';
        else return '';
    }
}
