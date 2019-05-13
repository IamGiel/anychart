import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';
import { GatewayCommonModule } from '../common/common.module';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from '../../icons/icons.module';
// import { UppyModule } from '../uppy/uppy.module';
import { ToastrModule } from 'ngx-toastr';

import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from '../../core';

//import { AngularFireModule } from '@angular/fire';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { PagerService } from './dashboard/pager.service';
import { ProcurementModule } from '../procurement/procurement.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {
    supplierState,
    IntroComponent,
    ClaimProfileComponent,
    AccountInfoComponent,
    PendingRequestsComponent,
    PaymentInfoComponent,
    DashboardComponent,
    FAQComponent,
    DashboardModal
} from './';

@NgModule({
    imports: [
        NgSelectModule,
        FormsModule,
        GatewayCommonModule,
        GatewaySharedModule,
        RouterModule.forChild(supplierState),
        IconsModule,
        // UppyModule,
        ToastrModule,
        HttpClientModule,
        // AngularFireStorageModule,
        ProcurementModule
        //  AngularFireModule.initializeApp(environment.firebase)
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        IntroComponent,
        ClaimProfileComponent,
        AccountInfoComponent,
        PendingRequestsComponent,
        PaymentInfoComponent,
        DashboardComponent,
        DashboardModal,
        FAQComponent
    ],
    providers: [PagerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [DashboardModal]
})
export class SupplierModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
