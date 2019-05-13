import { Route } from '@angular/router';

import { UploadSupplierComponent } from './upload-supplier.component';
import { UserRouteAccessService } from 'app/core';
export const uploadSupplierRoute: Route = {
    path: 'upload-supplier',
    data: {
        pageTitle: 'pageTitle.compliance.upload-supplier'
    },
    canActivate: [UserRouteAccessService],
    component: UploadSupplierComponent
};
