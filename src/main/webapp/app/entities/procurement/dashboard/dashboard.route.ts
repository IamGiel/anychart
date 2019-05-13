import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserRouteAccessService } from 'app/core';
export const dashboardRoute: Route = {
    path: 'dashboard',
    data: {
        pageTitle: 'pageTitle.compliance.dashboard'
    },
    canActivate: [UserRouteAccessService],
    component: DashboardComponent
};
