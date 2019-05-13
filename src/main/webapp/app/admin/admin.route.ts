import { Routes } from '@angular/router';

import {
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    metricsRoute,
    gatewayRoute,
    trackerRoute,
    userMgmtRoute,
    manageCompanyRoute,
    manageComplianceRoute,
    manageUserRoute,
    AchillesBadgeRoute
} from './';

import { UserRouteAccessService } from 'app/core';
import { ProcessFileRoute } from './process-file/process-file-route';

const ADMIN_ROUTES = [
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    gatewayRoute,
    trackerRoute,
    ...userMgmtRoute,
    metricsRoute,
    ...manageCompanyRoute,
    manageComplianceRoute,
    ...manageUserRoute,
    ProcessFileRoute,
    AchillesBadgeRoute
];

export const adminState: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: ADMIN_ROUTES
    }
];
