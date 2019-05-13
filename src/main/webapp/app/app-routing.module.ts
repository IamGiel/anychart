import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
// import { pincodeRoute, welcomeRoute, uploadCSVRoute } from './onboarding-screens/procurement-onboarding-screens/index';
//import { onboardState } from './onboarding-screens//onboarding.route';

// import {
//     welcomeSupplierRoute,
//     claimProfileRoute,
//     enterAccountSupplier,
//     pendingDataSupplierRoute,
//     paymentInfoSupplierRoute
// } from './onboarding-screens/supplier-onboarding-screens/index';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

// import { WelcomeComponent } from 'app/procurement-onboarding-screens/welcome/welcome.component';
// import { PincodeComponent } from 'app/procurement-onboarding-screens/pincode/pincode.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
// const PROCUREMENT_ROUTES = [pincodeRoute, welcomeRoute, uploadCSVRoute];
// const SUPPLIER_SCREENS = [
//     welcomeSupplierRoute,
//     claimProfileRoute,
//     enterAccountSupplier,
//     pendingDataSupplierRoute,
//     paymentInfoSupplierRoute
// ];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                // ...PROCUREMENT_ROUTES,
                // ...SUPPLIER_SCREENS,

                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#GatewayAdminModule'
                },

                {
                    path: 'supplier',
                    loadChildren: './entities/supplier/supplier.module#SupplierModule'
                },
                {
                    path: 'procurement',
                    loadChildren: './entities/procurement/procurement.module#ProcurementModule'
                },
                { path: '**', redirectTo: '/login' }
            ],
            { enableTracing: true, useHash: true }
        )
    ],
    exports: [RouterModule]
})
export class GatewayAppRoutingModule {}
