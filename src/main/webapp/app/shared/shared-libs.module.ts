import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
@NgModule({
    imports: [
        NgbModule.forRoot(),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        FontAwesomeModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        FontAwesomeModule,
        IconsModule
    ]
})
export class GatewaySharedLibsModule {}
