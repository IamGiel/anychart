import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from '../../common/service/previous-route.service';
import { LocalStoreService } from '../../../core/auth/local-storage.service';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    activeTab = 'dashboard';
    activeSubTab = 'Suppliers data';
    constructor(private prs: PreviousRouteService, private lc: LocalStoreService) {}

    ngOnInit() {
        this.checkPrevoiusPage();
    }

    tabClicked(tab: string) {
        this.activeSubTab = tab;
    }

    maintabClicked(tab: string) {
        this.activeTab = tab;
        this.lc.storeLocalInfo('prevousPageNo', 1);
    }
    checkPrevoiusPage() {
        if (
            this.prs.getPreviousUrl() != undefined &&
            this.prs.getPreviousUrl() != null &&
            this.prs.getPreviousUrl().indexOf('/procurement/supdetails/') >= 0
        ) {
            this.activeTab = 'Suppliers list';
        }
    }
}
