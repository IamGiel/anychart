import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { FetchData } from '../../common/service/fetch-data';

@Component({
    selector: 'jhi-payment-processing',
    templateUrl: './payment-processing.html'
})
export class PaymentProcessingComponent implements OnInit, OnDestroy {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    error: string;
    id: string = null;
    state: string = null;
    trasctionId = null;
    resaon = null;
    amount = null;
    success: boolean = false;
    loading: boolean = true;
    payload: any;
    constructor(private router: Router, private customPiwik: CustomPiwik, private route: ActivatedRoute, private fetchData: FetchData) {}

    ngOnInit() {
        this.bodyTag.classList.remove('procurement-body');
        this.bodyTag.classList.remove('default-body');
        this.bodyTag.classList.remove('supplier-body');
        this.bodyTag.classList.add('default-body-supplier');
        this.customPiwik.setCustomData('userId', '/paymentProcessing/navigated', window.location.href);
        /* setTimeout(() => {
            this.router.navigate(['/supplier/dashboard']);
        }, 12000);*/
        /*if url is like localhost/app/param1/param2 -->then below syntx to get queryParams
        this.param1 = this.route.snapshot.paramMap.get("param1");
        this.param2 = this.route.snapshot.paramMap.get("param2");
        console.log(this.param2)
        */
        /*id url is like localhost/app?param1=xx&param2=xx --,then use below syntax to get query string value*/
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
            this.state = params['state'];
            this.payload = {
                state: this.state,
                id: this.id
            };
        });
        console.log(this.id);
        console.log(this.state);
        console.log(this.payload);
        console.log('test' + this.payload);

        if (this.id != undefined && this.id != null && (this.state != undefined && this.state != null)) {
            this.fetchData.getCartStatus(this.payload).subscribe(
                res => {
                    console.log(res);
                    this.success = true;
                    this.loading = false;
                    this.trasctionId = res.transactionId;
                    this.amount = res.transactionAmt;
                    this.resaon = res.transactionStatus;
                    this.loading = false;
                },
                err => {
                    this.resaon = err.error.message;
                    this.success = false;
                    this.loading = false;
                    console.log(err);
                }
            );
        } else {
            setTimeout(() => {
                this.router.navigate(['/supplier/dashboard']);
            }, 12000);
        }
    }
    goToCart() {
        this.router.navigate(['/supplier/payment-info']);
        this.customPiwik.setCustomData('userId', '/paymentProcessing/navigate/cart', window.location.href);
    }
    goToHome() {
        this.router.navigate(['/supplier/dashboard']);
        this.customPiwik.setCustomData('userId', '/paymentProcessing/navigate/dashboard', window.location.href);
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.add('supplier-body');
        this.bodyTag.classList.remove('procurement-body');
        this.bodyTag.classList.remove('default-body-supplier');
        this.bodyTag.classList.remove('default-body');
    }
}
