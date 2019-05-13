import { Route } from '@angular/router';

import { IntroComponent } from './intro.component';
import { UserRouteAccessService } from 'app/core';
export const introRoute: Route = {
    path: 'intro',
    // canActivate: [UserRouteAccessService],
    data: {
        authorities: [],
        pageTitle: 'pageTitle.compliance.intro'
    },
    component: IntroComponent
};
