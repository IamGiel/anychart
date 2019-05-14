import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { Router } from '@angular/router';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
@Component({
    selector: 'jhi-response-modal',
    templateUrl: './response.modal.html'
})
export class ResponseModal implements OnInit {
    constructor(
        private customPiwik: CustomPiwik,
        public activeModal: NgbActiveModal,
        private router: Router,
        private lc: LocalStoreService
    ) {}

    ngOnInit() {}

    closeMsg() {
        if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_CM_USER') >= 0) {
            this.router.navigate(['/procurement/category-dashboard']);
        } else {
            this.router.navigate(['/procurement/dashboard']);
        }
        this.activeModal.close();
    }
    goToDashboard() {
        this.router.navigate(['/procurement/dashboard']);
        this.activeModal.close();
    }
}
