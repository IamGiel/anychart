import { Component, OnInit, OnDestroy } from '@angular/core';
import { PendingRequestService } from './pending-request.service';
import { Router } from '@angular/router';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { SupplierFaqModalComponent } from '../../common/modals/supplier-faq-modal/supplier-faq-modal.component';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-pending-requests',
    templateUrl: './pending-requests.component.html',
    styleUrls: ['../pending-requests/pending-requests.css']
})
export class PendingRequestsComponent implements OnInit, OnDestroy {
    penidngDataRequest: any;
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    err: boolean = false;
    errMsg: string;
    PDR: any;
    pendingList: any;
    userDetails: any;
    pendingListNew: any;
    isOpen = false;
    processFee = 0;
    constructor(
        private customPiwik: CustomPiwik,
        private router: Router,
        private request: PendingRequestService,
        private localStorage: LocalStoreService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.loadAllRequest();
    }
    loadAllRequest() {
        console.log('callesd' + document.getElementsByTagName('body')[0]);
        this.bodyTag.classList.add('supplier-body');
        /*this.penidngDataRequest = {
            requesterName: 'Hannah Griffith',
            requesterDesg: 'VP of Risk Management',
            requesterCompany: 'Gap Inc',
            reportType: ['D&B Digital Data Set and Comprehensive Report'],
            totalAmount: '$99.99',
            requestedTime: '2 days',
            pendingList: [
                {
                    reqName: 'D&B Digital Data Set',
                    amout: '$54.99',
                    reqDesc: 'This will data will be visible on the supplier’s profile in the dashboard. What included?',
                    reqType: 'Standard Option'
                },
                {
                    reqName: 'D&B Comprehensive Report',
                    amout: '$45.00',
                    reqDesc: 'The D&B Comprehensive Report will be delivered via a downloadable PDF.',
                    reqType: 'Add Comprehensive Report'
                }
            ]
        };*/
        this.pendingListNew = [
            {
                id: 4,
                checked: true,
                reqName: 'KYS Basic',
                amout: '$19.00',
                reqDesc: 'This will data will be visible on the supplier’s profile in the dashboard.',
                reqType: 'Standard Option',
                reqFinancial: [],
                reqEnviormental: [],
                reqLabor: [],
                reqEthical: [],
                ques: ['Company Questionnaires & Self Assesment']
            },
            {
                id: 5,
                reqName: 'KYS Essential',
                amout: '$49.00',
                reqDesc: 'This will data will be visible on the supplier’s profile in the dashboard.',
                reqType: 'Standard Option',
                reqFinancial: ['SER (Supplier Evaluation Rating)'],
                reqEnviormental: [],
                reqLabor: [],
                reqEthical: ['Sanctions provided by Dow Jones'],
                ques: ['Company Questionnaires & Self Assesment']
            },
            {
                id: 3,
                checked: true,
                reqName: 'Base',
                amout: '$99.00',
                reqDesc: 'This will data will be visible on the supplier’s profile in the dashboard.',
                reqType: 'Standard Option',
                reqFinancial: ['SER (Supplier Evaluation Rating)'],
                reqEnviormental: ['Dow Jones - Adverse Media Scan for Environment'],
                reqLabor: ['Dow Jones - Adverse Media Scan for Labor'],
                reqEthical: ['Ethical & Regulatory Scan against company and top executives provided by Dow Jones'],
                ques: ['Company Questionnaires & Self Assesment']
            },
            {
                reqName: 'Essential',
                amout: '$149.00',
                reqDesc: 'This will data will be visible on the supplier’s profile in the dashboard.',
                reqType: 'Standard Option',
                reqFinancial: ['SER (Supplier Evaluation Rating)'],
                reqEnviormental: ['CSR Hub Overall Rating', 'Dow Jones - Adverse Media Scan for Environment'],
                reqLabor: ['Mini Questionnaire Based Assesment by Achilles', 'Dow Jones - Adverse Media Scan for Labor'],
                reqEthical: ['Ethical & Regulatory Scan against company and top executives provided by Dow Jones'],
                ques: ['Company Questionnaires & Self Assesment']
            },
            {
                reqName: 'Advantage',
                amout: '$399.00',
                reqDesc: 'The D&B Comprehensive Report will be delivered via a downloadable PDF.',
                reqType: 'Add Comprehensive Report',
                reqFinancial: ['SER (Supplier Evaluation Rating', 'PAYDEX', 'D & B Rating'],
                reqEnviormental: [
                    'CSR Hub Overall Rating',
                    'Category Rating - Community',
                    'Category Rating - Employees',
                    'Category Rating - Environment',
                    'Category Rating - Governance',
                    'Dow Jones - Adverse Media Scan for Environment'
                ],
                reqLabor: ['Silver Assessment by Achilles', 'Dow Jones - Adverse Media Scan for Labor'],
                reqEthical: ['Ethical & Regulatory Scan against company and top executives provided by Dow Jones'],
                ques: ['Company Questionnaires & Self Assesment']
            }
        ];

        let reqId = this.localStorage.getLocalInfo('uuid');
        return this.request
            .getPendingRequest(reqId)
            .toPromise()
            .then(response => {
                this.PDR = response.body;
                this.userDetails = response.body['userProfile'];

                //this.pendingList = response.body['requestedPackageList'];

                //this.router.navigate(['/supplier/payment-info']);
            })
            .catch(err => {
                console.log(err);
                this.err = true;
                this.errMsg = err.message;
                setTimeout(() => {
                    this.err = false;
                }, 5000);
            });
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.remove('supplier-body');
    }
    approveRequest() {
        const reqdata = [this.PDR.requestId];
        return this.request
            .AddCartRequest(reqdata)
            .toPromise()
            .then(response => {
                console.log(response.body);
                this.customPiwik.setCustomData(
                    'userId',
                    'supplier/pendingRequest/id/' + reqdata + '/approve/success',
                    window.location.href
                );
                this.router.navigate(['/supplier/payment-info']);
            })
            .catch(err => {
                console.log(err);
                this.err = true;
                this.errMsg = err.error.message;
                setTimeout(() => {
                    this.err = false;
                }, 5000);
                this.customPiwik.setCustomData('userId', 'supplier/pendingRequest/id/' + reqdata + '/approve/fail', window.location.href);
            });
    }
    viewAllRequest() {
        this.customPiwik.setCustomData('userId', 'supplier/pendingRequest/viewAllRequests/click', window.location.href);
        this.router.navigate(['/supplier/dashboard']);
    }
    gotoFaq() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(SupplierFaqModalComponent, { size: 'lg' });
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
