import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../shared/service/cart-service';
import { ICart, Cart } from '../../../shared/models/cart.model';
import { CompanyListsService } from '../dashboard/company-list.service';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { CustomPiwik } from '../../common/service/custom-piwik';

@Component({
    selector: 'jhi-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['../payment-info/payment-info.css']
})
export class PaymentInfoComponent implements OnInit, OnDestroy {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    cart: Cart;
    hostedPageUrl: string;
    constructor(
        private customPiwik: CustomPiwik,
        public cartService: CartService,
        public companyListService: CompanyListsService,
        private lc: LocalStoreService
    ) {}

    ngOnInit() {
        this.bodyTag.classList.add('supplier-body');
        this.bodyTag.classList.remove('procurement-body');
        this.cartService.loadCart();
        this.cartService.cart.subscribe(c => {
            if (c != null && c.mesg === undefined) {
                this.cart = c;

                if (c.requestCount != undefined) {
                    this.cartService.setCartCount(c.requestCount);
                }
                console.log(this.cart);
            } else {
                this.cart = null;
            }
        });
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.remove('supplier-body');
    }

    pay(price: number) {
        let payload: any = {};
        payload.unitPrice = price;
        if (this.cartService.getCart() != undefined && this.cartService.getCart() != null) {
            payload.cartId = this.cartService.getCart().cartId;
        }
        payload.paymentServiceId = 'livex_compliance_' + this.randomString(15);
        this.companyListService.getCheckoutUrl(payload).subscribe(res => {
            this.customPiwik.setCustomData('userId', 'supplier/paymentInfo/pay/click', window.location.href);
            this.hostedPageUrl = res.body['hostedPageUrl'];
            window.open(this.hostedPageUrl + '?cartId=' + payload.cartId + '&paymentServiceId=' + payload.paymentServiceId, '_self');
        });
    }

    randomString(length) {
        const d = new Date().valueOf();
        const n = d.toString();
        let result = '';
        let p = 0;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) {
            result += i & 1 && n.charAt(p) ? n.charAt(p) : chars[Math.floor(Math.random() * chars.length)];
            if (i & 1) p++;
        }
        return result;
    }
}
