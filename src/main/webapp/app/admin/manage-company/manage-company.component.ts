import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchData } from '../../entities/common/service/fetch-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../../core/user/company.model';
import { CompanyUpdateComponent } from '../manage-company/company-update.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { LocalStoreService } from '../../core/auth/local-storage.service';

@Component({
    selector: 'jhi-manage-company',
    templateUrl: './manage-company.component.html',
    styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit {
    companie: Company[];

    /*public companies = [
        {
            id: 1,
            name: 'ABC company',
            domains: ['@abc.com', '@abc.in', '@abc.co.in']
        },
        {
            id: 2,
            name: 'XYZ company',
            domains: ['@xyz.com', '@xyz.in', '@xyz.co.in']
        }
    ];*/
    companies: any;
    tempList: any = {};
    total: any;
    page = 0;
    size = 10;
    searchText: string = '';
    sortParam: string = '';
    direction: string = '';
    filterList: any;
    currentPage: number = null;
    constructor(
        private fetchData: FetchData,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private lc: LocalStoreService
    ) {
        this.tempList.content = [];
    }

    ngOnInit() {
        this.loadAll();
    }
    loadAll() {
        let param = 'page=' + this.page + '&size=' + this.size;
        this.getCompnayList(param);
    }
    getCompnayList(param) {
        let updatetempList: boolean = false;
        this.filterList = {
            page: this.page,
            size: this.size,
            searchText: this.searchText,
            sortParam: this.sortParam,
            direction: this.direction
        };
        if (this.currentPage != this.page) {
            updatetempList = true;
        }
        this.fetchData.getCompanyList(param).subscribe(
            res => {
                this.companies = res.content;
                this.total = res.totalElements;
                this.currentPage = this.page;
                if (
                    res.totalElements != null &&
                    res.totalElements != 0 &&
                    this.tempList.content != undefined &&
                    this.tempList.content.length == 0 &&
                    updatetempList &&
                    this.searchText.length == 0
                ) {
                    this.tempList = res;
                }
                this.lc.storeLocalInfo('company-filter-list', this.filterList);
            },
            res => {
                console.log(res);
            }
        );
    }
    createCompany(company) {
        const modalRef = this.modalService.open(CompanyUpdateComponent, {
            centered: true,
            size: 'lg',
            backdrop: 'static',
            windowClass: 'custom-md-modal'
        });
        modalRef.componentInstance.companyData = company;
        modalRef.result.then(
            result => {
                console.log(result);
                if (result == 'success') {
                    if (company == 'create') {
                        this.loadAll();
                    } else {
                        this.callBackend();
                    }
                }
            },
            reason => {
                console.log(reason);
            }
        );
    }
    viewCompany(data) {
        const modalRef = this.modalService.open(CompanyDetailsComponent, {
            centered: true,
            size: 'lg',
            backdrop: 'static',
            windowClass: 'custom-md-modal'
        });
        modalRef.componentInstance.companyId = data;
    }
    goToPage(n: number): void {
        this.page = n;
    }
    onSorted($event) {
        console.log($event);
        this.sortParam = $event.sortColumn;
        this.direction = $event.sortDirection;
        this.callBackend();
    }
    onNext(): void {
        this.page++;
        this.callBackend();
    }

    onPrev(): void {
        this.page--;
        this.callBackend();
    }
    callBackend() {
        let param =
            'page=' +
            this.page +
            '&size=' +
            this.size +
            '&searchText=' +
            this.searchText +
            '&sortParam=' +
            this.sortParam +
            '&direction=' +
            this.direction;
        this.getCompnayList(param);
    }
    showOldData(event) {
        if (event.target.value == '') {
            // input is cleared then load 1st result
            this.searchText = '';
            this.companies = this.tempList.content;
            this.total = this.tempList.totalElements;
            // this.loadAll();
        }
    }

    searchData(event) {
        let searchSharedValue = event.target.value.toLowerCase();
        this.searchText = searchSharedValue;
        if (searchSharedValue != null) {
            this.page = 0;
            this.sortParam = '';
            this.direction = '';
            let param =
                'page=' +
                this.page +
                '&size=' +
                this.size +
                '&searchText=' +
                this.searchText +
                '&sortParam=' +
                this.sortParam +
                '&direction=' +
                this.direction;
            this.getCompnayList(param);
        }
    }
}
