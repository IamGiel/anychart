import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-businessdata',
    templateUrl: './businessdata.component.html',
    styleUrls: ['./businessdata.component.css']
})
export class BusinessdataComponent implements OnInit {
    ownershipData = [];
    chart: any;
    businessData = [];
    financialData = [];
    categoryData = [];
    industriesData = [];
    supplierdata = [];
    constructor() {}
    ngOnInit() {
        this.ownershipData = [
            { label: 'Limited Partenship', value: 84, fill: '#F76693' },
            { label: 'Liimited Liability com', value: 8, fill: '#7888F1' },
            { label: 'Private Corporation', value: 6, fill: '#54ACE8' },
            { label: 'Sole Proprietorship', value: 1, fill: '#FF9943' },
            { label: 'Public Corporation', value: 1, fill: '#79CB70' }
        ];
        this.businessData = [
            { label: 'Classification 1', value: 84 },
            { label: 'Classification 1', value: 8 },
            { label: 'Classification 1', value: 6 },
            { label: 'Classification 1', value: 1 },
            { label: 'Classification 1', value: 1 }
        ];
        this.financialData = [
            { x: 'Limited Partenship', value: 84 },
            { x: 'Limited Liability com', value: 8 },
            { x: 'Private Corporation', value: 6 },
            { x: 'Sole Proprietorship', value: 1 },
            { x: 'Public Corporation', value: 1 }
        ];
        this.categoryData = [
            { label: 'PCB', value: 23 },
            { label: 'Battery', value: 20 },
            { label: 'Camera', value: 16 },
            { label: 'Display', value: 12 },
            { label: 'Processor', value: 9 },
            { label: 'Memory unit', value: 8 },
            { label: 'Workstation', value: 6 },
            { label: 'Office supplies', value: 7 },
            { label: 'Others', value: 8 }
        ];
        this.industriesData = [
            { label: 'Pharmaceutical', value: 23 },
            { label: 'Energy Exploration & ..', value: 20 },
            { label: 'Oil Field Services', value: 16 },
            { label: 'Media and Entertainment', value: 12 },
            { label: 'Personal Prdouct', value: 9 },
            { label: 'Chemical', value: 8 },
            { label: 'Industry Manufacature', value: 6 },
            { label: 'Telcom', value: 5 },
            { label: 'Others', value: 8 }
        ];
        this.supplierdata = [
            { label: '$ 1B+', value: 23 },
            { label: '$ 500M - 1B', value: 18 },
            { label: '$ 250M - 500M', value: 20 },
            { label: '$ 1M - 250M', value: 12 },
            { label: '$ 500K - 1M', value: 10 },
            { label: '$ 100K - 500K', value: 6 },
            { label: '0 - 100K', value: 11 }
        ];
    }
}
