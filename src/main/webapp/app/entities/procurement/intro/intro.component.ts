import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TCModalService } from '../../common/components/terms-conditions/terms-conditions.modal.service';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { ProcurementFaqModalComponent } from '../../common/modals/procurement-faq-modal/procurement-faq-modal.component';
@Component({
    selector: 'jhi-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['../intro/intro.css']
})
export class IntroComponent implements OnInit {
    modalRef: NgbModalRef;
    isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private customPiwik: CustomPiwik,
        private TCModalService: TCModalService
    ) {}

    ngOnInit() {}
    getStarted() {
        this.customPiwik.setCustomData('userId', '/procurement/intro/getStarted/click', window.location.href);
        this.router.navigate(['/procurement/upload-supplier']);
    }

    openFaq() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(ProcurementFaqModalComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isOpen = false;
            },
            reason => {
                this.isOpen = false;
            }
        );
        return modalRef;
    }
    terms() {
        this.modalRef = this.TCModalService.open();
    }
}
