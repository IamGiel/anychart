import { Route } from '@angular/router';

import { LoginComponent } from './login.component';

export const loginRoute: Route = {
    path: 'login',
    data: {
        pageTitle: 'pageTitle.login'
    },
    component: LoginComponent
};
