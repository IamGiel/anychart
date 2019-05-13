import { Route } from '@angular/router';

import { HomeComponent } from './';

import { LoginComponent } from './../account/login/login.component';
import { UserRouteAccessService } from 'app/core';
export const HOME_ROUTE: Route = {
    path: '',
    component: LoginComponent,
    data: {
        authorities: [],
       // canActivate: [UserRouteAccessService],
        pageTitle: 'home.title'
    }
};
