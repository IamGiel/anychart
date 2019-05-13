import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
    @Input() userDetails: any;
    loading: boolean = true;
    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.loading = false;
        console.log(this.userDetails);
    }
}
