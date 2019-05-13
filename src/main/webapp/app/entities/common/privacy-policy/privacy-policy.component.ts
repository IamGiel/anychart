import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'jhi-privacy-policy',
    templateUrl: './privacy-policy.html',
    styleUrls: ['./privacy-policy.css']
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    error: string;
    success: string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.bodyTag.classList.remove('procurement-body', 'default-body', 'supplier-body', 'default-body-supplier');
        this.bodyTag.classList.add('common-body');
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.add('supplier-body');
        this.bodyTag.classList.remove('procurement-body', 'default-body', 'common-body', 'default-body-supplier');
    }
}
