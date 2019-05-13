import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FetchData } from '../../common/service/fetch-data';
import { CustomPiwik } from '../../common/service/custom-piwik';

@Component({
    selector: 'jhi-dashboard-modal',
    templateUrl: './dashboard.modal.html',
    styleUrls: ['../dashboard/dashboard.css']
})
export class DashboardModal implements OnInit {
    @Input() data;
    comment: string;
    constructor(private customPiwik: CustomPiwik, public activeModal: NgbActiveModal, private fetchData: FetchData) {}

    ngOnInit() {}

    decline() {
        //api call here
        let payload: any = {};
        payload.requestId = this.data.ids;
        payload.declinedMessage = this.comment;
        this.fetchData.declineRequest(payload).subscribe(
            r => {
                this.customPiwik.setCustomData(
                    'userId',
                    'supplier/dashboard/request/decline/items/' + this.data.ids + '/success',
                    window.location.href
                );

                this.activeModal.close(this.data);
            },
            err => {
                this.customPiwik.setCustomData(
                    'userId',
                    'supplier/dashboard/request/decline/items/' + this.data.ids + '/fail',
                    window.location.href
                );
            }
        );
    }
}
