import { Route } from '@angular/router';

import { RequestDataComponent } from './request-data.component';
import { UserRouteAccessService } from 'app/core';
export const requestDataRoute: Route = {
    path: 'request-data',
    data: {
        pageTitle: 'pageTitle.compliance.request-data'
    },
    //canActivate: [UserRouteAccessService],
    component: RequestDataComponent
};
