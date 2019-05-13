import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CDFComponent } from './category-dashboard-filter.component';

@Injectable({ providedIn: 'root' })
export class CDFModalService {
    private isOpen = false;
    constructor(private modalService: NgbModal) {}
    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(CDFComponent, { size: 'lg', backdrop:'static', windowClass: 'category-dashboard-modal' });
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
