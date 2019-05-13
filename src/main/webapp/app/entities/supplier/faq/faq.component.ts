import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { CustomPiwik } from '../../common/service/custom-piwik';

@Component({
    selector: 'jhi-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['../faq/faq.css']
})
export class FAQComponent implements OnInit, OnDestroy {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    constructor(
        private customPiwik: CustomPiwik,
        private router: Router,
        private route: ActivatedRoute,
        private localStorage: LocalStoreService
    ) {}
    uuid: any;

    ngOnInit() {
        this.bodyTag.classList.add('supplier-body');
        this.bodyTag.classList.remove('procurement-body');
        //this.uuid = this.route.snapshot.paramMap.get('id');
        this.route.params.subscribe(params => {
            this.uuid = params['id'];
            this.localStorage.storeLocalInfo('uuid', this.uuid);
        });
    }
    faqList: any[] = [
        {
            section: 'sec1',
            list: [
                {
                    question: '1. I forgot my password/ I want to reset my password.',
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
    ];

    faqQuestionClicked(ind, parent) {
        console.log(parent[ind]);
        if (!parent[ind].showAnsBasics) {
            parent.forEach(function(value) {
                value.showAnsBasics = false;
            });
            this.faqList.forEach(function(value) {
                value.list.forEach(function(innerValue) {
                    innerValue.showAnsBasics = false;
                });
            });
            //CustomPiwik.setCustomData(vm.username, "/FAQ/QuestetionsClicked/"+parent[ind].question);
            parent[ind].showAnsBasics = true;
        } else {
            parent[ind].showAnsBasics = false;
        }
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.remove('supplier-body');
    }
    getStarted() {
        console.log(this.uuid);
        this.customPiwik.setCustomData('userId', 'supplier/faq/getStarted/click', window.location.href);
        this.router.navigate(['/supplier/claim-profile']);
    }
}
