import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BaseColorService } from '../../service/base-color-service';

@Component({
    selector: 'jhi-procurement-faq-modal',
    templateUrl: './procurement-faq-modal.component.html',
    styleUrls: ['./procurement-faq-modal.component.css']
})
export class ProcurementFaqModalComponent implements OnInit {
    // mheader: string;
    currentRoute;
    isProc = false;

    constructor(private bcs: BaseColorService, private location: Location, public activeModal: NgbActiveModal, private router: Router) {}
    closeModal() {
        this.activeModal.close('Modal Closed');
    }
    ngOnInit() {
        if (this.bcs.isProc() === 'procurement' || this.bcs.isProc() === 'default') {
            this.isProc = true;
        } else {
            this.isProc = false;
        }
    }

    changeHeaderColor() {
        if (this.isProc === true) {
            return 'procTheme';
        } else {
            return 'supTheme';
        }
    }
    changeScrollColor() {
        if (this.isProc === true) {
            return 'modal-body m-body m-body-proc';
        } else {
            return 'modal-body m-body m-body-sup';
        }
    }
}
