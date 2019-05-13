import { Route } from '@angular/router';

import { CategoryDashboardComponent } from './category-dashboard.component';
import { UserRouteAccessService } from 'app/core';
export const categoryDashboardRoute: Route = {
    path: 'category-dashboard',
    data: {
        pageTitle: 'pageTitle.compliance.dashboard'
    },
    canActivate: [UserRouteAccessService],
    component: CategoryDashboardComponent
};
