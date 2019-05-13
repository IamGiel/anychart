// pagination.component.ts
import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { FetchData } from '../../common/service/fetch-data';
import { LocalStoreService } from '../../../core/auth/local-storage.service';
import { CDFService } from '../../procurement/category-dashboard-filter/category-dashboard-filter.service';
@Component({
    selector: 'jhi-category-dashboard-filter',
    templateUrl: './category-dashboard-filter.component.html',
    styleUrls: ['./category-dashboard-filter.css']
})
export class CDFComponent implements OnInit {
    isProductsTeam: boolean = false;
    filters: any = {
        suppliers: [],
        categoryManagers: [],
        supplierEmails: [],
        companies: [],
        supplierCountries: [],
        supplierContacts: [],
        supplierAddresses: [],
        supplierCategories: [],
        supplierPhones: [],
        supplierDuns: [],
        supplierSpends: [],
        empty: null,
        end: {
            suppliers: false,
            categoryManagers: false,
            supplierEmails: false,
            companies: false,
            supplierCountries: false,
            supplierContacts: false,
            supplierAddresses: false,
            supplierCategories: false,
            supplierPhones: false,
            supplierDuns: false,
            supplierSpends: false
        },
        size: null,
        from: {
            suppliers: '',
            categoryManagers: '',
            supplierEmails: '',
            companies: '',
            supplierCountries: '',
            supplierContacts: '',
            supplierAddresses: '',
            supplierCategories: '',
            supplierPhones: '',
            supplierDuns: '',
            supplierSpends: ''
        },
        search: {
            suppliers: '',
            categoryManagers: '',
            supplierEmails: '',
            companies: '',
            supplierCountries: '',
            supplierContacts: '',
            supplierAddresses: '',
            supplierCategories: '',
            supplierPhones: '',
            supplierDuns: '',
            supplierSpends: ''
        },
        isEmpty: {
            categoryManagers: false,
            supplierEmails: false,
            supplierCountries: false,
            supplierContacts: false,
            supplierAddresses: false,
            supplierCategories: false,
            supplierPhones: false,
            supplierDuns: false,
            supplierSpends: false
        }
    };
    filterConstants = [
        'supplierSpends',
        'supplierDuns',
        'suppliers',
        'supplierEmails',
        'categoryManagers',
        'companies',
        'supplierCountries',
        'supplierContacts',
        'supplierAddresses',
        'supplierCategories',
        'supplierPhones'
    ];
    typing = false;
    j = JSON;
    onCall = false;
    selectOptions = [{ name: 'Select', value: null }, { name: 'Yes', value: true }, { name: 'No', value: false }];
    ngSelected: any = {
        suppliers: [],
        categoryManagers: [],
        supplierEmails: [],
        companies: [],
        supplierCountries: [],
        supplierContacts: [],
        supplierAddresses: [],
        supplierCategories: [],
        supplierPhones: [],
        supplierDuns: [],
        supplierSpends: []
    };
    searching: any = {
        suppliers: true,
        categoryManagers: true,
        supplierEmails: true,
        companies: true,
        supplierCountries: true,
        supplierContacts: true,
        supplierAddresses: true,
        supplierCategories: true,
        supplierPhones: true,
        supplierDuns: true,
        supplierSpends: true
    };

    constructor(
        public cdfs: CDFService,
        public activeModal: NgbActiveModal,
        private fetchData: FetchData,
        private cd: ChangeDetectorRef,
        private lc: LocalStoreService
    ) {
        for (var x in this.filterConstants) {
            let type = this.filterConstants[x];
            this.ngSelected[type] = [];
            this.searching[type] = true;
            this.filters[type] = [];
        }
    }

    onClear(type) {
        this.filters[type].forEach(e => {
            e.checked = false;
        });
        if (this.filters.isEmpty[type] != undefined) {
            this.filters.isEmpty[type] = false;
        }
        this.ngSelected[type] = [];
    }

    setNgSelect(type) {
        if (this.filters[type] != undefined) {
            this.ngSelected[type] = this.filters[type].filter(f => f.checked).map(m => {
                return type == 'categoryManagers' ? m.categoryManagers : m.name;
            });
        }
    }

    onAdd(e, t, s) {
        this.filters[t].forEach(o => {
            if (o[s] == e[s]) {
                o.checked = true;
            }
        });
    }

    onRemove(e, t, s) {
        this.filters[t].forEach(o => {
            if (o[s] == e.label) {
                o.checked = false;
            }
        });
    }

    ngOnInit() {
        if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_PRODUCTS_TEAM_USER') >= 0) {
            this.isProductsTeam = true;
        }
        for (var x in this.filterConstants) {
            let type = this.filterConstants[x];
            this.cdfs.clearBackup(type);
        }
        this.filters.size = this.copy(this.cdfs.getFilters()).size;
        this.filters.empty = this.copy(this.cdfs.getFilters()).empty;
        for (var x in this.filterConstants) {
            let type = this.filterConstants[x];
            this.filters.end[type] = this.copy(this.cdfs.getFilters()).end[type];
            this.filters[type] = this.copy(this.cdfs.getFilters())[type];
            this.filters.from[type] = this.copy(this.cdfs.getFilters()).from[type];
            this.filters.search[type] = this.copy(this.cdfs.getFilters()).search[type];
            this.filters.isEmpty[type] = this.copy(this.cdfs.getFilters()).isEmpty[type];
            this.setNgSelect(type);
            if (this.filters[type].length == 0) {
                this.filters.end[type] = '';
                this.filters.from[type] = '';
                this.filters.search[type] = '';
                this.init(type);
            } else {
                this.searching[type] = false;
            }
        }
    }

    copy(o) {
        return JSON.parse(JSON.stringify(o));
    }

    init(type) {
        if (this.filters[type] == undefined) {
            return;
        }
        this.cdfs.init(type).subscribe(res => {
            res = res == null ? [] : res;
            this.filters[type] = this.filters[type].concat(res);
            this.cdfs.initFilters(this.copy(this.filters));
            if (res.length < this.filters.size) {
                this.filters.end[type] = true;
                this.cdfs.setEnd(type, this.filters.end[type]);
            }
            this.setNgSelect(type);
            this.searching[type] = false;
        });
    }

    onScrollToEnd(type) {
        if (!this.filters.end[type] && this.filters[type].length > 0) {
            this.onScroll(type);
        }
    }

    onScroll(type) {
        let name = '';
        if (type != 'categoryManagers') {
            name = this.cdfs.getLastFilter(type, this.filters).name;
        }
        if (type == 'categoryManagers') {
            name = this.cdfs.getLastFilter(type, this.filters).categoryManagers;
        }
        this.searching[type] = true;
        this.cdfs.nextPage(type, name, this.filters.search[type]).subscribe(
            res => {
                if (res != undefined && res != null) {
                    this.filters[type] = this.filters[type].concat(res);
                }
                res = res == null ? [] : res;
                if (res.length < this.filters.size) {
                    this.filters.end[type] = true;
                }
                this.setNgSelect(type);
                this.searching[type] = false;
            },
            err => {
                this.filters.end[type] = true;
                this.searching[type] = false;
            }
        );
    }

    clear() {
        for (var x in this.filterConstants) {
            let type = this.filterConstants[x];
            this.filters.search[type] = '';
            this.cdfs.clearBackup(type);
            this.onchange(type);
        }
        this.cdfs.setFilters(this.filters);
        this.cdfs.clearFilters();
        this.activeModal.dismiss('dismissed');
    }

    showResult(filterForm: NgForm) {
        this.cdfs.updateFilters(this.filters);
        this.close();
    }

    close() {
        this.activeModal.close('closed');
    }

    resetPagination(type) {
        this.filters.from[type] = '';
        this.filters.end[type] = false;
        this.filters[type] = [];
        this.setNgSelect(type);
    }

    onchange(type) {
        //when search is cleared
        if (this.filters.search[type].length == 0) {
            //If back-up found, use back-up and clear back-up
            if (this.cdfs.getBackup()[type].length > 0) {
                this.filters.search[type] = '';
                this.filters.from[type] = this.copy(this.cdfs.getBackup()).from[type];
                this.filters.end[type] = this.copy(this.cdfs.getBackup()).end[type];
                this.filters[type] = this.copy(this.cdfs.getBackup())[type];
                this.setNgSelect(type);
                this.cdfs.clearBackup(type);
            } else {
                //When back-up not found, re initialize filters
                this.filters.search[type] = '';
                this.resetPagination(type);
                this.cdfs.nextPage(type, this.filters.from[type], this.filters.search[type]).subscribe(
                    res => {
                        if (res != null) {
                            this.filters[type] = this.filters[type].concat(res);
                        }
                        res = res == null ? [] : res;
                        if (res.length < this.filters.size) {
                            this.filters.end[type] = true;
                        }
                        this.setNgSelect(type);
                    },
                    err => {
                        this.filters.end[type] = true;
                    }
                );
            }
        }
        //when search term is longer than 2 chars
        if (this.filters.search[type].length >= 2) {
            //If back-up not found, set back-up
            if (this.cdfs.getBackup()[type].length == 0) {
                this.cdfs.setBackup(type, this.copy(this.filters));
            }
            this.resetPagination(type);

            this.cdfs.setEnd(type, false);
            this.cdfs.setFrom(type, '');
            if (!this.searching[type]) {
                this.searching[type] = true;
                const currentSearch = this.filters.search[type];
                this.cdfs.nextPage(type, this.filters.from[type], this.filters.search[type]).subscribe(
                    res => {
                        if (res != undefined && res != null) {
                            this.filters[type] = this.filters[type].concat(res);
                        }
                        res = res == null ? [] : res;
                        if (res.length < this.filters.size) {
                            this.filters.end[type] = true;
                        }
                        this.setNgSelect(type);
                        this.searching[type] = false;
                        if (currentSearch != this.filters.search[type]) {
                            this.onchange(type);
                        }
                    },
                    err => {
                        this.filters.end[type] = true;
                        this.cdfs.setEnd(type, true);
                        this.searching[type] = false;
                        if (currentSearch != this.filters.search[type]) {
                            this.onchange(type);
                        }
                    }
                );
            }
        }
    }
    getData(a, b) {}
}
