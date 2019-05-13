import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { FetchData } from '../../common/service/fetch-data';
import { BaseColorService } from '../service/base-color-service';
import { CustomPiwik } from '../service/custom-piwik';

@Component({
    selector: 'jhi-faq',
    templateUrl: './faq.html',
    styleUrls: ['./faq.css']
})
export class FAQComponent implements OnInit, OnDestroy {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    error: string;
    success: string;
    isCollapsed = false;
    currentlyOpened: any;
    faqList: any[];
    constructor(private router: Router, private fetchData: FetchData, private bcs: BaseColorService, private customPiwik: CustomPiwik) {}

    ngOnInit() {
        this.getFAQList();
    }
    getFAQList() {
        let type = this.bcs.isProc();
        if (type == 'procurement') {
            type = 'compliance';
        }
        this.fetchData.getFAQs(type).subscribe(
            res => {
                console.log(res);
                this.faqList = res;
                this.customPiwik.setCustomData('userId', type + '/faq/success', window.location.href);
            },
            err => {
                this.customPiwik.setCustomData('userId', type + '/faq/fail', window.location.href);
            }
        );
    }
    ngOnDestroy() {}

    collapse(category) {
        if (this.currentlyOpened !== undefined && this.currentlyOpened != category) {
            this.currentlyOpened.isCollapsed = false;
        }
        category.isCollapsed = !category.isCollapsed;
        this.currentlyOpened = category;
    }
    /*faqList: any[] = [
    {
        section: 'sec1',
        list: [
            {
                question: 'What is Beroe LiVE?.',
                answer: "Click on the 'Forgot Password' option and the password reset link will be sent to your registered mail."
            },
            {
                question: "2. I don't have access to an official email address. Can I register and access Beroe Live portal?",
                answer: 'Registrations on Beroe Live platform are now made available only to users with an official email address.'
            }
        ]
    },
    {
        section: 'sec2',
        list: [
            {
                question: '3. I forgot my password/ I want to reset my password.',
                answer: "Click on the 'Forgot Password' option and the password reset link will be sent to your registered mail."
            },
            {
                question: "4. I don't have access to an official email address. Can I register and access Beroe Live portal?",
                answer: 'Registrations on Beroe Live platform are now made available only to users with an official email address.'
            }
        ]
    }
];*/
}
