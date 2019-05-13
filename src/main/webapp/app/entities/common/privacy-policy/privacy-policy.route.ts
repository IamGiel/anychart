import { Route } from '@angular/router';

import { PrivacyPolicyComponent } from './privacy-policy.component';
import { UserRouteAccessService } from '../../../core/auth/user-route-access-service';

export const privacyPolicyRoute: Route = {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: {
        authorities: [],
        pageTitle: 'activate.title'
    }
    //canActivate: [UserRouteAccessService]
};
