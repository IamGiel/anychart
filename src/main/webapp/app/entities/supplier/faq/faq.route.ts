import { Route } from '@angular/router';

import { FAQComponent } from './faq.component';
import { UserRouteAccessService } from 'app/core';
export const faqRoute: Route = {
    path: 'faq',
    //canActivate: [UserRouteAccessService],
    data: {
        pageTitle: 'pageTitle.supplier.faq'
    },
    component: FAQComponent
};
