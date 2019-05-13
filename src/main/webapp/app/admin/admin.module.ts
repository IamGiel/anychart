import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { GatewaySharedModule } from 'app/shared';
import { GatewayCommonModule } from '../entities/common/common.module';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule } from '@angular/forms';

/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiMetricsMonitoringModalComponent,
    JhiMetricsMonitoringComponent,
    JhiHealthModalComponent,
    JhiHealthCheckComponent,
    JhiConfigurationComponent,
    JhiDocsComponent,
    JhiGatewayComponent,
    JhiTrackerComponent,
    ManageComplianceComponent,
    CompanyUpdateComponent,
    ManageCompanyComponent,
    CompanyDetailsComponent,
    ManageUserComponent,
    ViewUserComponent,
    UpdateUserComponent,
    AchillesBadgeComponent,
    AchillesBadgeUpdateComponent
} from './';
import { ProcessFileComponent } from './process-file/process-file.component';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(adminState),
        GatewayCommonModule,
        ReactiveFormsModule,
        TagInputModule
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserMgmtDetailComponent,
        UserMgmtUpdateComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        JhiConfigurationComponent,
        JhiHealthCheckComponent,
        JhiHealthModalComponent,
        JhiDocsComponent,
        JhiGatewayComponent,
        JhiTrackerComponent,
        JhiMetricsMonitoringComponent,
        JhiMetricsMonitoringModalComponent,
        ManageComplianceComponent,
        CompanyUpdateComponent,
        ManageCompanyComponent,
        CompanyDetailsComponent,
        ManageUserComponent,
        ViewUserComponent,
        UpdateUserComponent,
        ProcessFileComponent,
        AchillesBadgeComponent,
        AchillesBadgeUpdateComponent
    ],
    entryComponents: [
        UserMgmtDeleteDialogComponent,
        JhiHealthModalComponent,
        JhiMetricsMonitoringModalComponent,
        UserMgmtUpdateComponent,
        CompanyUpdateComponent,
        CompanyDetailsComponent,
        UpdateUserComponent,
        ViewUserComponent,
        AchillesBadgeUpdateComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAdminModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
