import { Injectable } from '@angular/core';
import { ManageUserComponent } from './manage-user.component';
import { ViewUserComponent } from '../manage-user/view-user/view-user.component';
//import { UpdateUserComponent } from '../manage-user/update-user/update-user.component';
import { Routes } from '@angular/router';

export const manageUserRoute: Routes = [
    {
        path: 'manage-user',
        component: ManageUserComponent
    },
    {
        path: 'manage-user/:id',
        component: ViewUserComponent
    }
];
