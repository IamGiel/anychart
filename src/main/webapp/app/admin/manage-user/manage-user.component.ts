import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchData } from '../../entities/common/service/fetch-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { CompanyDetailsComponent } from '../manage-company/company-details/company-details.component';

@Component({
    selector: 'jhi-manage-user',
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
    users: any = [];
    total = 0;
    page = 0;
    size = 10;
    tempList: any = {};
    currentPage: number = null;
    searchText: string = '';
    direction: string = '';
    sortParam: string = '';

    constructor(
        private fetchData: FetchData,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {
        this.tempList.content = [];
    }

    ngOnInit() {
        this.loadAll();
    }
    loadAll() {
        let param = 'page=' + this.page + '&size=' + this.size + '&search=';
        this.getUserList(param);
    }
    getUserList(param) {
        let updatetempList: boolean = false;

        if (this.currentPage != this.page) {
            updatetempList = true;
        }
        this.fetchData.getUserList(param).subscribe(
            res => {
                this.users = res.content;
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
        console.log(this.tempList);
    }

    createUser(user) {
        const modalRef = this.modalService.open(UpdateUserComponent, {
            centered: true,
            size: 'lg',
            backdrop: 'static',
            windowClass: 'custom-md-modal'
        });
        modalRef.componentInstance.userData = user;
        modalRef.result.then(
            result => {
                console.log(result);
                if (result == 'success') {
                    if (user == 'create') {
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
    viewUser(data) {
        const modalRef = this.modalService.open(ViewUserComponent, {
            centered: true,
            size: 'lg',
            backdrop: 'static',
            windowClass: 'custom-md-modal'
        });
        modalRef.componentInstance.userDetails = data;
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
        let param = 'page=' + this.page + '&size=' + this.size + '&search=' + this.searchText;
        this.getUserList(param);
    }
    showOldData(event) {
        if (event.target.value == '') {
            console.log(this.tempList);
            // input is cleared then load 1st result
            this.searchText = '';
            this.users = this.tempList.content;
            this.total = this.tempList.totalElements;
            // this.loadAll();
        }
    }
    searchData(event) {
        let searchSharedValue = event.target.value.toLowerCase();
        this.searchText = event.target.value.toLowerCase();
        if (searchSharedValue != null) {
            this.page = 0;
            let param = 'page=' + this.page + '&size=' + this.size + '&search=' + this.searchText;
            this.getUserList(param);
        }
    }
    /*function to show company details in user managemnet screen*/
    viewCompany(companyId) {
        const modalRef = this.modalService.open(CompanyDetailsComponent, {
            centered: true,
            size: 'lg',
            backdrop: 'static',
            windowClass: 'custom-md-modal'
        });
        modalRef.componentInstance.companyId = companyId;
    }
    /*end of function to show company details in user managemnet screen*/
}
