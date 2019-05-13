import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BaseColorService } from '../../service/base-color-service';

@Component({
    selector: 'jhi-privacy-policy-modal',
    templateUrl: './privacy-policy-modal.component.html',
    styleUrls: ['./privacy-policy-modal.component.css']
})
export class PrivacyPolicyModalComponent implements OnInit {
    // mheader: string;
    currentRoute;
    isProc = false;

    constructor(private bcs: BaseColorService, private location: Location, public activeModal: NgbActiveModal, private router: Router) {}
    closeModal() {
        this.activeModal.close('Modal Closed');
    }
    ngOnInit() {
        if (this.bcs.isProc() === 'procurement' || this.bcs.isProc() === 'default') {
            // alert('includes SUPPLIER!!!! ');
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
        if (this.isProc === true) {
            return 'modal-body m-body m-body-proc';
        } else {
            return 'modal-body m-body m-body-sup';
        }
    }
}
