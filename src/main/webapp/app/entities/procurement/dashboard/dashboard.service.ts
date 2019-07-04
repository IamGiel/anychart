import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    supplierDataFilteredApplied: boolean = false;
    supplierListFilteredApplied: boolean = false;
    businessDataFilteredApplied: boolean = false;
    businessListFilteredApplied: boolean = false;
    constructor() {}

    getFiltersAppliedOrNot() {
        return this.supplierDataFilteredApplied;
    }

    setFiltersApplied() {
        this.supplierDataFilteredApplied = true;
    }

    clearFilterApplied() {
        this.supplierDataFilteredApplied = false;
    }
    getBusinessFiltersAppliedOrNot() {
        return this.businessDataFilteredApplied;
    }

    setBusinessFiltersApplied() {
        this.businessDataFilteredApplied = true;
    }

    clearBusinessFilterApplied() {
        this.businessDataFilteredApplied = false;
    }
}
