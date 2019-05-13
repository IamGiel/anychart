import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { PaymentProcessingComponent } from './payment-processing.component';

/*export const paymentProcessingRoute: Route = {
    path: 'payment-processing',
    component: PaymentProcessingComponent,
    data: {
        authorities: [],
        pageTitle: 'activate.title'
    },
    canActivate: [UserRouteAccessService]
};*/
export const paymentProcessingRoute: Routes = [
    {
        path: 'payment-processing',
        component: PaymentProcessingComponent,
        data: {
            pageTitle: 'pageTitle.payment'
        }
    },
    {
        path: 'payment-processing/:id/:state',
        component: PaymentProcessingComponent,
        data: {
            pageTitle: 'pageTitle.payment'
        }
    }
];
