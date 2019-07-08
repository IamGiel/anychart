import { Component, OnInit, ViewChild } from '@angular/core';
import { PreviousRouteService } from '../../common/service/previous-route.service';
import { LocalStoreService } from '../../../core/auth/local-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    @ViewChild('dashboardfilter') dashboardfilter;

    activeTab = 'dashboard';
    activeSubTab = 'Suppliers data';

    closeResult: string;
    filterSubMenu: boolean = false;

    item1 = 'Financial Data';
    item2 = 'D&B Rating';
    item3 = 'Higher than';
    item4 = '1';
    filter1 = [
        { id: '1', value: 'Financial Data' },
        { id: '2', value: 'Environmental Data' },
        { id: '3', value: 'Ethical & Regulatory Data' },
        { id: '4', value: 'Labour,Health & Saftey' }
    ];
    filter2 = [{ id: '1', value: 'D&B Rating' }, { id: '2', value: 'D&B SER Rating' }, { id: '3', value: 'D&B Paydex' }];
    filter3 = [{ id: '1', value: 'Higher than' }, { id: '2', value: 'Lower than' }, { id: '3', value: 'Between' }];
    filter4 = [
        { id: '1', value: '1' },
        { id: '2', value: '2' },
        { id: '3', value: '3' },
        { id: '4', value: '4' },
        { id: '5', value: '5' },
        { id: '6', value: '6' },
        { id: '7', value: '7' },
        { id: '8', value: '8' },
        { id: '9', value: '9' }
    ];
    totalSelectFilterList = [];
    sletectedFilter = '';

    constructor(
        private prs: PreviousRouteService,
        private lc: LocalStoreService,
        private modalService: NgbModal,
        public dashboardService: DashboardService
    ) {
        document.addEventListener('click', this.offClickHandlers.bind(this));
    }

    offClickHandlers(event: any) {
        //this.filterSubMenu = false;

        if (this.dashboardfilter.nativeElement != undefined && !this.dashboardfilter.nativeElement.contains(event.target)) {
            this.filterSubMenu = false;
        }
    }

    ngOnInit() {
        this.checkPrevoiusPage();
    }

    tabClicked(tab: string) {
        console.log(tab);
        this.activeSubTab = tab;
        // this.dashboardService.clearFilterApplied();
    }

    maintabClicked(tab: string) {
        this.activeTab = tab;
        this.lc.storeLocalInfo('prevousPageNo', 1);
    }
    checkPrevoiusPage() {
        if (
            this.prs.getPreviousUrl() != undefined &&
            this.prs.getPreviousUrl() != null &&
            this.prs.getPreviousUrl().indexOf('/procurement/supdetails/') >= 0
        ) {
            this.activeTab = 'Suppliers list';
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    open(content) {
        //console.log(content);
        this.filterSubMenu = false;
        this.totalSelectFilterList = [];
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    addFilterList() {
        this.totalSelectFilterList.push(this.item2 + ' ' + this.item3 + ' ' + this.item4);
        this.sletectedFilter = this.totalSelectFilterList[0];
    }

    removeSelectedFilter(index) {
        this.totalSelectFilterList.splice(index, 1);
    }
}
