import { Routes } from '@angular/router';

import { SupplierdetailsComponent } from './supplierdetails.component';
import { AdminComponent } from './company-info/admin/admin.component';
import { UserRouteAccessService } from 'app/core';
export const supdetailsRoute: Routes = [
    {
        path: 'supdetails/:id/:duns',
        canActivate: [UserRouteAccessService],
        data: {
            pageTitle: 'pageTitle.supplier.details'
        },
        component: SupplierdetailsComponent
    },
    {
        path: 'company-info/admin/:id',
        canActivate: [UserRouteAccessService],
        data: {
            pageTitle: 'pageTitle.supplier.details'
        },
        component: AdminComponent
    }
];
