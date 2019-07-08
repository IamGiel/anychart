import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from 'app/shared';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CarouselComponent } from './components/carousel.component';
import { PieChartComponent } from './components/charts/pie/pie-chart.component';
import { ColumnChartComponent } from './components/charts/column/column-chart.component';
import { niceDateFormatPipe } from './pipes/date.pipe';
import { searchPipe } from './pipes/search.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RatingBoxComponent } from './components/rating-box/rating-box.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { PaymentProcessingComponent, PrivacyPolicyComponent, commonState, FAQComponent } from './';
import { SelectComponent } from './components/select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SortableColumnComponent } from '../common/components/sort/sort.component';
import { SortableTableDirective } from '../common/components/sort/sort.directive';
import { SortService } from '../common/components/sort/sort.service';
import { CookiePolicyModalComponent } from './modals/cookie-policy-modal/cookie-policy-modal.component';
import { PrivacyPolicyModalComponent } from './modals/privacy-policy-modal/privacy-policy-modal.component';
import { TermsOfServiceModalComponent } from './modals/terms-of-service-modal/terms-of-service-modal.component';
import { ProcurementFaqModalComponent } from './modals/procurement-faq-modal/procurement-faq-modal.component';
import { SupplierFaqModalComponent } from './modals/supplier-faq-modal/supplier-faq-modal.component';
import { AchillesQuestionnaireModalComponent } from './modals/achilles-questionnaire-modal/achilles-questionnaire-modal.component';
import { AchillesQuestionsComponent } from '../../achilles/achilles-questions/achilles-questions.component';
import { AchillesFormComponent } from '../../achilles/achilles-form/achilles-form.component';
import { FileNamePipe } from '../common/modals/achilles-questionnaire-modal/achilles-questionnaire-modal.component';
import { BarComponent } from './components/charts/bar/bar.component';
import { TreemapComponent } from './components/charts/treemap/treemap.component';
import { MapComponent } from './components/map/map.component';
import { SplineChartComponent } from './components/charts/spline-chart/spline-chart.component';
import { StackBarComponent } from './components/charts/stack-bar/stack-bar.component';
@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(commonState), NgSelectModule, FormsModule, NgCircleProgressModule.forRoot()],
    declarations: [
        FileNamePipe,
        PaymentProcessingComponent,
        PrivacyPolicyComponent,
        CarouselComponent,
        niceDateFormatPipe,
        searchPipe,
        PaginationComponent,
        TermsConditionsComponent,
        FAQComponent,
        SortableTableDirective,
        SortableColumnComponent,
        SelectComponent,
        CookiePolicyModalComponent,
        PrivacyPolicyModalComponent,
        TermsOfServiceModalComponent,
        ProcurementFaqModalComponent,
        SupplierFaqModalComponent,
        AchillesQuestionnaireModalComponent,
        AchillesQuestionsComponent,
        AchillesFormComponent,
        RatingBoxComponent,
        PieChartComponent,
        ColumnChartComponent,
        BarComponent,
        TreemapComponent,
        MapComponent,
        SplineChartComponent,
        StackBarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        SupplierFaqModalComponent,
        ProcurementFaqModalComponent,
        TermsConditionsComponent,
        CookiePolicyModalComponent,
        PrivacyPolicyModalComponent,
        TermsOfServiceModalComponent,
        AchillesQuestionnaireModalComponent
    ],
    providers: [SortService],
    exports: [
        CarouselComponent,
        niceDateFormatPipe,
        searchPipe,
        PaginationComponent,
        TermsConditionsComponent,
        SortableTableDirective,
        SortableColumnComponent,
        SelectComponent,
        CookiePolicyModalComponent,
        PrivacyPolicyModalComponent,
        TermsOfServiceModalComponent,
        ProcurementFaqModalComponent,
        SupplierFaqModalComponent,
        AchillesQuestionnaireModalComponent,
        AchillesQuestionsComponent,
        AchillesFormComponent,
        RatingBoxComponent,
        PieChartComponent,
        ColumnChartComponent,
        BarComponent,
        MapComponent,
        SplineChartComponent,
        TreemapComponent,
        StackBarComponent
    ]
})
export class GatewayCommonModule {}
