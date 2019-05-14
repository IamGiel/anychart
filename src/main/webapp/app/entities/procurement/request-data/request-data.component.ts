import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RequestDataService } from './request-data.service';
import { Router } from '@angular/router';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModal } from '../request-data/response.modal';

@Component({
    selector: 'jhi-request-data',
    templateUrl: './request-data.component.html',
    styleUrls: ['../request-data/request-data.css']
})
export class RequestDataComponent implements OnInit {
    pendingList: any;
    swCategorySelected = [];
    fileUpload: number;
    pendingListNew: any;
    selected: number;
    processFee = 0;
    @ViewChild('widgetsContent', { read: ElementRef })
    public widgetsContent: ElementRef<any>;
    constructor(
        private customPiwik: CustomPiwik,
        private request: RequestDataService,
        private router: Router,
        private lc: LocalStoreService,
        private modalService: NgbModal
    ) {}
    ngOnInit() {
        this.loadAllRequest();
        this.fileUpload = this.lc.getLocalInfo('fileUpload').uploadedFileId;
        //this.sendtestRequest();
        this.processFee = 10;
    }
    loadAllRequest() {
        this.pendingListNew = [
            {
                id: 4,
                checked: true,
                reqName: 'KYS 1',
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
                checked: false,
                reqName: 'KYS 2',
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
                checked: false,
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
                id: 1,
                checked: false,
                reqName: 'Essential',
                amout: '$149.00',
                reqDesc: 'This will data will be visible on the supplier’s profile in the dashboard.',
                reqType: 'Standard Option',
                reqFinancial: ['SER (Supplier Evaluation Rating)'],
                reqEnviormental: ['EcoVadis Overall Rating', 'Dow Jones - Adverse Media Scan for Environment'],
                reqLabor: ['Mini Questionnaire Based Assesment by Achilles', 'Dow Jones - Adverse Media Scan for Labor'],
                reqEthical: ['Ethical & Regulatory Scan against company and top executives provided by Dow Jones'],
                ques: ['Company Questionnaires & Self Assesment']
            },
            {
                id: 2,
                checked: false,
                reqName: 'Advantage',
                amout: '$399.00',
                reqDesc: 'The D&B Comprehensive Report will be delivered via a downloadable PDF.',
                reqType: 'Add Comprehensive Report',
                reqFinancial: ['SER (Supplier Evaluation Rating)', 'PAYDEX', 'D & B Rating'],
                reqEnviormental: [
                    'EcoVadis Overall Rating',
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
        // this.selected = this.pendingListNew[0].id;
        //this.swCategorySelected.push(this.selected);

        return this.request
            .getActiveRequest()
            .toPromise()
            .then(response => {
                this.pendingList = response.body;
                // console.log(response.body);
                this.pendingList = this.pendingList.map(p => {
                    //bydefault all request checked
                    p.checked = true;
                    this.swCategorySelected.push(p.id);
                    return p;
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    sendtestRequest() {
        console.log('send req ');
        const reqdata = {
            email: 'xyz.ew@abc.com', //mandatory
            firstName: 'xyz',
            lastName: 'm',
            companyName: 'abc' //mandatory
            // roles: ['SUPPLIER']  //mandatory
        };
        return this.request
            .sendtestRequest(reqdata)
            .toPromise()
            .then(response => {
                console.log(response.body);
            })
            .catch(err => {
                console.log(err);
            });
    }
    getData = function(data) {
        console.log(data);

        if (data.checked) {
            this.swCategorySelected.push(data.id);
        } else if (!data.checked) {
            this.swCategorySelected.splice(this.swCategorySelected.indexOf(data.id), 1);
        }
        this.selected = data;
        this.swCategorySelected.push(data);
    };
    sendRequest() {
        console.log('send req ');
        const reqdata = {
            uploadSupplierFileId: this.fileUpload,
            // compliancePackageIds: this.swCategorySelected
            compliancePackageIds: [this.selected]
        };
        return this.request
            .sendRequest(reqdata)
            .toPromise()
            .then(response => {
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/request/sendRequest/' + this.fileUpload + '/success/',
                    window.location.href
                );
                /* if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_CM_USER') >= 0) {
                    this.router.navigate(['/procurement/category-dashboard']);
                } else {
                    this.router.navigate(['/procurement/dashboard']);
                }*/
                this.modalService.open(ResponseModal, { centered: true, size: 'sm', backdrop: 'static', keyboard: false });
                console.log(response.body);
            })
            .catch(err => {
                console.log(err);
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/request/sendRequest/' + this.fileUpload + '/fail',
                    window.location.href
                );
            });
    }
    sendRequestNavigate() {
        this.modalService.open(ResponseModal, { centered: true, size: 'sm', backdrop: 'static', keyboard: false });
    }
    goBack() {
        this.router.navigate(['/procurement/upload-supplier']);
    }
    public scrollLeft(event): void {
        this.widgetsContent.nativeElement.scrollLeft = this.widgetsContent.nativeElement.scrollLeft + 300;
    }

    public scrollRight(event): void {
        this.widgetsContent.nativeElement.scrollLeft = this.widgetsContent.nativeElement.scrollLeft - 300;
    }
}
