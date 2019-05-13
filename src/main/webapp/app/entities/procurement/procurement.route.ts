import { Routes } from '@angular/router';

import {
    introRoute,
    loginRoute,
    accountInfoRoute,
    uploadSupplierRoute,
    dashboardRoute,
    requestDataRoute,
    supdetailsRoute,
    categoryDashboardRoute
} from './';

const PROC_ROUTES = [
    introRoute,
    loginRoute,
    accountInfoRoute,
    uploadSupplierRoute,
    dashboardRoute,
    requestDataRoute,
    ...supdetailsRoute,
    categoryDashboardRoute
];

export const procurementState: Routes = [
    {
        path: 'procurement',
        data: {
            authorities: ['ROLE_PROCUREMENT_USER', 'ROLE_CM_USER', 'ROLE_PRODUCTS_TEAM_USER']
        },
        children: PROC_ROUTES
    }
];
