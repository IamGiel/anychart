import { Route } from '@angular/router';

import { AccountInfoComponent } from './account-info.component';

export const accountInfoRoute: Route = {
    path: 'account-info',
    data: {
        pageTitle: 'pageTitle.compliance.account'
    },
    component: AccountInfoComponent
};
