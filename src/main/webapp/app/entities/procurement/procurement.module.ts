import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';
import { GatewayCommonModule } from '../../entities/common/common.module';

import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from '../../icons/icons.module';
// import { UppyModule } from '../uppy/uppy.module';
import { ToastrModule } from 'ngx-toastr';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxPaginationModule } from 'ngx-pagination';

import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from '../../core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { TabComponent } from '../procurement/dashboard/tabs';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

//import { AngularFireModule } from '@angular/fire';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { FileSizePipe } from '../../file-size.pipe';
import { DropZoneDirective } from '../../drop-zone.directive';
import { FormsModule } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {
    procurementState,
    IntroComponent,
    LoginComponent,
    AccountInfoComponent,
    UploadSupplierComponent,
    DashboardComponent,
    RequestDataComponent,
    SupplierdetailsComponent,
    CategoryDashboardComponent,
    CDFComponent,
    DowJonesComponent,
    ResponseModal,
    SupplierdataComponent,
    BusinessdataComponent,
    SupplierlistComponent
} from './';

// new ng2-file-uploader
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

//import { PagerService } from './dashboard/pager.service';

import { CategoryDashbordDropdownComponent } from './category-dashboard-filter/category-dashboard-dropdown';
import { CompanyInfoComponent } from './supplierdetails/company-info/company-info.component';
import { AdminComponent } from './supplierdetails/company-info/admin/admin.component';

library.add(faFacebookSquare, faLinkedin);

@NgModule({
    imports: [
        NgCircleProgressModule.forRoot(),
        GatewayCommonModule,
        GatewaySharedModule,
        RouterModule.forChild(procurementState),
        IconsModule,
        // UppyModule,
        ToastrModule,
        HttpClientModule,
        //AngularFireStorageModule,
        FileUploadModule,
        NgxPaginationModule,
        Ng5SliderModule,
        FormsModule,
        FontAwesomeModule,
        NgSelectModule

        // AngularFireModule.initializeApp(environment.firebase)
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        IntroComponent,
        LoginComponent,
        AccountInfoComponent,
        UploadSupplierComponent,
        DashboardComponent,
        RequestDataComponent,
        FileSizePipe,
        DropZoneDirective,

        SupplierdetailsComponent,
        CategoryDashboardComponent,
        CDFComponent,
        DowJonesComponent,
        ResponseModal,
        CategoryDashbordDropdownComponent,
        CompanyInfoComponent,
        AdminComponent,
        SupplierdataComponent,
        BusinessdataComponent,
        SupplierlistComponent

        // TabComponent
    ],
    providers: [NgbTabsetConfig, NgbCarouselConfig],
    entryComponents: [CDFComponent, ResponseModal],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProcurementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
