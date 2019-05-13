import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomPiwik } from '../../../app/entities/common/service/custom-piwik';
import { TCModalService } from '../../entities/common/components/terms-conditions/terms-conditions.modal.service';
import { PrivacyPolicyModalComponent } from '../../entities/common/modals/privacy-policy-modal/privacy-policy-modal.component';
import { CookiePolicyModalComponent } from '../../entities/common/modals/cookie-policy-modal/cookie-policy-modal.component';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    currentRoute: String;
    isProc: boolean;
    closeResult: string;
    isPrivacyOpen = false;
    isCookieOpen = false;
    modalRef: NgbModalRef;

    constructor(
        private TCModalService: TCModalService,
        private location: Location,
        private modalService: NgbModal,
        private router: Router,
        private customPiwik: CustomPiwik
    ) {}

    ngOnInit() {}

    openPrivacy() {
        if (this.isPrivacyOpen) {
            return;
        }
        this.isPrivacyOpen = true;
        const modalRef = this.modalService.open(PrivacyPolicyModalComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isPrivacyOpen = false;
            },
            reason => {
                this.isPrivacyOpen = false;
            }
        );
        this.customPiwik.setCustomData('userId', '/footer/open/privacy-policy', window.location.href);
        return modalRef;
    }

    openCookie() {
        if (this.isCookieOpen) {
            return;
        }
        this.isCookieOpen = true;
        const modalRef = this.modalService.open(CookiePolicyModalComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isCookieOpen = false;
            },
            reason => {
                this.isCookieOpen = false;
            }
        );
        this.customPiwik.setCustomData('userId', '/footer/open/cookie-policy', window.location.href);
        return modalRef;
    }

    openTerms() {
        this.modalRef = this.TCModalService.open();
        this.customPiwik.setCustomData('userId', '/footer/open/terms-service', window.location.href);
    }
}
