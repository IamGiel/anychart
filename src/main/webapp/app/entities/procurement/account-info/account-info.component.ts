import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.css']
})
export class AccountInfoComponent implements OnInit {
    companyName: any;
    completedForm: boolean = true;
    constructor() {}

    ngOnInit() {}
}
