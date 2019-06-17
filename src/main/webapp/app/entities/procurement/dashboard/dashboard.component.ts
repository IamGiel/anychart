import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    activeTab = 'dashboard';
    activeSubTab = 'Suppliers data';
    constructor() {}

    ngOnInit() {}

    tabClicked(tab: string) {
        this.activeSubTab = tab;
    }

    maintabClicked(tab: string) {
        this.activeTab = tab;
    }
}
