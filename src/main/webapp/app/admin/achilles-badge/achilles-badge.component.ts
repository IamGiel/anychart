import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchData } from '../../entities/common/service/fetch-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AchillesBadgeUpdateComponent } from './achilles-badge-update.component';
@Component({
    selector: 'jhi-achilles-badge',
    templateUrl: './achilles-badge.component.html',
    styleUrls: ['./achilles-badge.component.css']
})
export class AchillesBadgeComponent implements OnInit {
    public badges = [
        {
            id: 1,
            name: 'Silver badge',
            duns: '2344234',
            createdBy: 'admin',
            createdDate: '2019-03-28T07:24:58Z',
            lastUpdatedBy: 'admin',
            lastUpdatedDate: '2019-03-28T08:56:17Z'
        },
        {
            id: 2,
            name: 'Gold badge',
            duns: '234324234',
            createdBy: 'admin',
            createdDate: '2019-03-28T07:24:58Z',
            lastUpdatedBy: 'admin',
            lastUpdatedDate: '2019-03-28T08:56:17Z'
        }
    ];
    // badges: any;
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
        private modalService: NgbModal
    ) {
        this.tempList.content = [];
    }

    ngOnInit() {
        //this.loadAll();
    }
    loadAll() {
        let param = 'page=' + this.page + '&size=' + this.size;
        this.getBadgeList(param);
    }
    getBadgeList(param) {
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
                //this.badges = res.content;
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
            },
            res => {
                console.log(res);
            }
        );
    }
    assignBadge(company) {
        const modalRef = this.modalService.open(AchillesBadgeUpdateComponent, {
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
    Page(n: number): void {
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
        this.getBadgeList(param);
    }
    showOldData(event) {
        if (event.target.value == '') {
            // input is cleared then load 1st result
            this.searchText = '';
            this.badges = this.tempList.content;
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
            this.getBadgeList(param);
        }
    }
}
