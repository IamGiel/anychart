import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';

import { GatewaySharedModule } from 'app/shared';
import { GatewayCoreModule } from 'app/core';
import { GatewayAppRoutingModule } from './app-routing.module';
import { GatewayHomeModule } from './home/home.module';
import { GatewayAccountModule } from './account/account.module';
import { GatewayCommonModule } from './entities/common/common.module';
import { GatewayEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import { MatomoModule } from 'ngx-matomo';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { IconsModule } from './icons/icons.module';

import { SupplierModule } from './entities/supplier/supplier.module';
import { ProcurementModule } from './entities/procurement/procurement.module';
//import { OnboardingModule } from './onboarding-screens/onboarding.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';

// // procurement stuff
// import { WelcomeComponent, PincodeComponent, UploadCsvComponent } from './onboarding-screens/procurement-onboarding-screens';

// // supplier stuff
// import {
//     WelcomeSupplierComponent,
//     ClaimProfileComponent,
//     EnterAccountSupplierComponent,
//     PendingDataSupplierComponent,
//     PaymentInfoSupplierComponent
// } from './onboarding-screens/supplier-onboarding-screens';

// import { UppyModule } from './uppy/uppy.module';
import { ToastrModule } from 'ngx-toastr';
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireStorageModule } from '@angular/fire/storage';
//import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { FileSizePipe } from 'app/file-size.pipe';
// import { DropZoneDirective } from 'app/drop-zone.directive';

@NgModule({
    imports: [
        NgSelectModule,
        InfiniteScrollModule,

        BrowserAnimationsModule,
        GatewayHomeModule,
        GatewayCommonModule,
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        GatewaySharedModule,
        GatewayCoreModule,
        GatewayAccountModule,
        GatewayEntityModule,
        IconsModule,
        ToastrModule.forRoot(),
        // DndModule.forRoot(),
        // UppyModule,
        //OnboardingModule,
        SupplierModule,
        ProcurementModule,
        //  AngularFireStorageModule,
        // AngularFirestoreModule,
        // AngularFireAuthModule,
        //  AngularFireModule.initializeApp(environment.firebase),
        FormsModule,
        ReactiveFormsModule,
        AngularFileUploaderModule,
        MatomoModule,
        NgxContentLoadingModule,
        GatewayAppRoutingModule,
        TagInputModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
        // FileSelectDirective,
        // FileUploader
        // FileSizePipe,
        // DropZoneDirective

        // WelcomeComponent,
        // PincodeComponent,
        // WelcomeSupplierComponent,
        // ClaimProfileComponent,
        // EnterAccountSupplierComponent,
        // PendingDataSupplierComponent,
        // PaymentInfoSupplierComponent,
        // UploadCsvComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class GatewayAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
