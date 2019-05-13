import { Route } from '@angular/router';

import { PaymentInfoComponent } from '../payment-info/payment-info.component';
import { UserRouteAccessService } from 'app/core';
export const paymentInfoRoute: Route = {
    path: 'payment-info',
    data: {
        pageTitle: 'pageTitle.supplier.payment-info'
    },
    canActivate: [UserRouteAccessService],
    component: PaymentInfoComponent
};
