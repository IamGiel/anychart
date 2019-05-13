import { Injectable } from '@angular/core';
import { ManageCompanyComponent } from './manage-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { Routes } from '@angular/router';

export const manageCompanyRoute: Routes = [
    {
        path: 'manage-company',
        component: ManageCompanyComponent
    },
    {
        path: 'manage-company/:id',
        component: CompanyDetailsComponent
    }
];
