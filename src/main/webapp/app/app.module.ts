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

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';

import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './fake-backend.service';

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

        SupplierModule,
        ProcurementModule,

        FormsModule,
        ReactiveFormsModule,
        AngularFileUploaderModule,
        MatomoModule,
        NgxContentLoadingModule,
        GatewayAppRoutingModule,
        TagInputModule,
        InMemoryWebApiModule.forRoot(FakeBackendService)
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
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
        //this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
