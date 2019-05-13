import { Route } from '@angular/router';

import { FAQComponent } from './faq.component';

export const faqRoute: Route = {
    path: 'faq',
    component: FAQComponent,
    data: {
        authorities: [],
        pageTitle: 'pageTitle.supplier.faq'
    }
};
