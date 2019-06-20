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
            { label: 'Limited Partenship', value: 84, fill: '#7888F1' },
            { label: 'Liimited Liability com', value: 8, fill: '#F76693' },
            { label: 'Private Corporation', value: 6, fill: '#54ACE8' },
            { label: 'Sole Proprietorship', value: 1, fill: '#FF9943' },
            { label: 'Public Corporation', value: 1, fill: '#79CB70' }
        ];
        this.financialData = [
            { x: 'Limited Partenship', value: 84 },
            { x: 'Limited Liability com', value: 8 },
            { x: 'Private Corporation', value: 6 },
            { x: 'Sole Proprietorship', value: 1 },
            { x: 'Public Corporation', value: 1 }
        ];
        this.categoryData = [
            { x: 'PCB', value: 23, label: { enabled: true } },
            { x: 'Battery', value: 20, label: { enabled: true } },
            { x: 'Camera', value: 16, label: { enabled: true } },
            { x: 'Display', value: 12, label: { enabled: true } },
            { x: 'Processor', value: 9, label: { enabled: true } },
            { x: 'Memory unit', value: 8, label: { enabled: true } },
            { x: 'Workstation', value: 6, label: { enabled: true } },
            { x: 'Office supplies', value: 7, label: { enabled: true } },
            { x: 'Others', value: 8, label: { enabled: true } }
        ];
        this.industriesData = [
            { x: 'Pharmaceutical', value: 23, label: { enabled: true } },
            { x: 'Energy Exploration & ..', value: 20, label: { enabled: true } },
            { x: 'Oil Field Services', value: 16, label: { enabled: true } },
            { x: 'Media and Entertainment', value: 12, label: { enabled: true } },
            { x: 'Personal Prdouct', value: 9, label: { enabled: true } },
            { x: 'Chemical', value: 8, label: { enabled: true } },
            { x: 'Industry Manufacature', value: 6, label: { enabled: true } },
            { x: 'Telcom', value: 5, label: { enabled: true } },
            { x: 'Others', value: 8, label: { enabled: true } }
        ];
        this.supplierdata = [
            { x: '$ 1B+', value: 23, label: { enabled: true } },
            { x: '$ 500M - 1B', value: 18, label: { enabled: true } },
            { x: '$ 250M - 500M', value: 20, label: { enabled: true } },
            { x: '$ 1M - 250M', value: 12, label: { enabled: true } },
            { x: '$ 500K - 1M', value: 10, label: { enabled: true } },
            { x: '$ 100K - 500K', value: 6, label: { enabled: true } },
            { x: '0 - 100K', value: 11, label: { enabled: true } }
        ];
    }
}
