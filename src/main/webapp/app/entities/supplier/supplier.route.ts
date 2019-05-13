import { Routes } from '@angular/router';

import {
    introRoute,
    claimProfileRoute,
    accountInfoRoute,
    pendingRequestsRoute,
    paymentInfoRoute,
    dashboardRoute,
    supdetailsSupllierRoute,
    faqRoute
} from './';

const SUPPLIER_ROUTES = [
    introRoute,
    claimProfileRoute,
    accountInfoRoute,
    pendingRequestsRoute,
    paymentInfoRoute,
    dashboardRoute,
    supdetailsSupllierRoute,
    faqRoute
];

export const supplierState: Routes = [
    {
        path: 'supplier',
        data: {
            authorities: ['ROLE_SUPPLIER_USER']
        },
        children: SUPPLIER_ROUTES
    }
];
