import { Route } from '@angular/router';

import { IntroComponent } from './intro.component';

export const introRoute: Route = {
    path: 'intro/:id',
    data: {
        pageTitle: 'pageTitle.supplier.intro'
    },
    component: IntroComponent
};
