import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from '../../common/service/previous-route.service';
import { LocalStoreService } from '../../../core/auth/local-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    activeTab = 'dashboard';
    activeSubTab = 'Suppliers data';

    closeResult: string;
    filterSubMenu: boolean = false;
    constructor(private prs: PreviousRouteService, private lc: LocalStoreService, private modalService: NgbModal) {}

    ngOnInit() {
        this.checkPrevoiusPage();
    }

    tabClicked(tab: string) {
        this.activeSubTab = tab;
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
        console.log(content);
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
}
