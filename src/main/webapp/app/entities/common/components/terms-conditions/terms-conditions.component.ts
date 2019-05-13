// pagination.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'jhi-terms-conditions',
    templateUrl: './terms-conditions.component.html',
    styleUrls: ['./terms-conditions.css']
})
export class TermsConditionsComponent {
    constructor(public activeModal: NgbActiveModal) {}
    ngOnInit() {}
    cancel() {
        this.activeModal.dismiss('cancel');
    }
}
