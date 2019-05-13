import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BaseColorService } from '../../service/base-color-service';

@Component({
    selector: 'jhi-terms-of-service-modal',
    templateUrl: './terms-of-service-modal.component.html',
    styleUrls: ['./terms-of-service-modal.component.css']
})
export class TermsOfServiceModalComponent implements OnInit {
    // mheader: string;
    currentRoute;
    isProc = false;

    constructor(private location: Location, public activeModal: NgbActiveModal, private router: Router, private bcs: BaseColorService) {}
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
            return 'procTheme modal-header';
        } else {
            return 'supTheme modal-header';
        }
    }

    changeScrollColor() {
        if (this.isProc) {
            return 'modal-body m-body m-body-proc';
        } else {
            return 'modal-body m-body m-body-sup';
        }
    }
}
