import { Route } from '@angular/router';

import { SupplierdetailsComponent } from '../../procurement/supplierdetails/supplierdetails.component';
import { UserRouteAccessService } from 'app/core';
export const supdetailsSupllierRoute: Route = {
    path: 'supdetails/:id/:duns',
    data: {
        pageTitle: 'pageTitle.supplier.details'
    },
    canActivate: [UserRouteAccessService],
    component: SupplierdetailsComponent
};
