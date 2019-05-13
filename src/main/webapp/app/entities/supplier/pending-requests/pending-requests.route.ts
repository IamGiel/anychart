import { Route } from '@angular/router';

import { PendingRequestsComponent } from '../pending-requests/pending-requests.component';
import { UserRouteAccessService } from 'app/core';
export const pendingRequestsRoute: Route = {
    path: 'pending-requests',
    data: {
        pageTitle: 'pageTitle.supplier.pending-requests'
    },
    canActivate: [UserRouteAccessService],
    component: PendingRequestsComponent
};
