import { Route } from '@angular/router';

import { AccountInfoComponent } from './account-info.component';

export const accountInfoRoute: Route = {
    path: 'account-info',
    data: {
        pageTitle: 'pageTitle.supplier.account-info'
    },
    component: AccountInfoComponent
};
