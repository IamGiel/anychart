import { Routes } from '@angular/router';

import { paymentProcessingRoute, privacyPolicyRoute, faqRoute } from './';

const COMMON_ROUTES = [...paymentProcessingRoute, privacyPolicyRoute, faqRoute];

export const commonState: Routes = [
    {
        path: '',
        children: COMMON_ROUTES
    }
];
