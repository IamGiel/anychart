import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

//import { TermsConditionsComponent } from './terms-conditions.component';
import { TermsOfServiceModalComponent } from '../../modals/terms-of-service-modal/terms-of-service-modal.component';

@Injectable({ providedIn: 'root' })
export class TCModalService {
    private isOpen = false;
    constructor(private modalService: NgbModal) {}

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(TermsOfServiceModalComponent, { size: 'lg' });
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
}
