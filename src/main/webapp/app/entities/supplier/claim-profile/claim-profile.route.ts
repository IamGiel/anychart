import { Route } from '@angular/router';

import { ClaimProfileComponent } from './claim-profile.component';

export const claimProfileRoute: Route = {
    path: 'claim-profile',
    data: {
        pageTitle: 'pageTitle.supplier.claim-profile'
    },
    component: ClaimProfileComponent
};
