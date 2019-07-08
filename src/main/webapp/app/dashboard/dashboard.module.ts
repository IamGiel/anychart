import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierdataComponent } from './supplierdata/supplierdata.component';
import { BusinessdataComponent } from './businessdata/businessdata.component';
import { GatewayCommonModule } from 'app/entities/common/common.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, DashboardRoutingModule, GatewayCommonModule, NgbProgressbarModule],
    declarations: [DashboardComponent, SupplierdataComponent, BusinessdataComponent]
    //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
