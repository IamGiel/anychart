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
            { x: 'PCB', value: 23, label: { enabled: true }, fill: '#7888F1' },
            { x: 'Battery', value: 20, label: { enabled: true }, fill: '#F76693' },
            { x: 'Camera', value: 16, label: { enabled: true }, fill: '#54ACE8' },
            { x: 'Display', value: 12, label: { enabled: true }, fill: '#FF9943' },
            { x: 'Processor', value: 9, label: { enabled: true }, fill: '#79CB70' },
            { x: 'Memory unit', value: 8, label: { enabled: true }, fill: '#F67E5D' },
            { x: 'Workstation', value: 6, label: { enabled: true }, fill: '#A578F1' },
            { x: 'Office supplies', value: 7, label: { enabled: true }, fill: '#B4E374' },
            { x: 'Others', value: 8, label: { enabled: true }, fill: '#E7E7E7' }
        ];
        this.industriesData = [
            { x: 'Pharmaceutical', value: 23, label: { enabled: true }, fill: '#7888F1' },
            { x: 'Energy Exploration & ..', value: 20, label: { enabled: true }, fill: '#F76693' },
            { x: 'Oil Field Services', value: 16, label: { enabled: true }, fill: '#54ACE8' },
            { x: 'Media and Entertainment', value: 12, label: { enabled: true }, fill: '#FF9943' },
            { x: 'Personal Prdouct', value: 9, label: { enabled: true }, fill: '#79CB70' },
            { x: 'Chemical', value: 8, label: { enabled: true }, fill: '#F67E5D' },
            { x: 'Industry Manufacature', value: 6, label: { enabled: true }, fill: '#A578F1' },
            { x: 'Telcom', value: 5, label: { enabled: true }, fill: '#B4E374' },
            { x: 'Others', value: 8, label: { enabled: true }, fill: '#E7E7E7' }
        ];
        this.supplierdata = [
            { x: '$ 1B+', value: 23, label: { enabled: true }, fill: '#7888F1' },
            { x: '$ 500M - 1B', value: 18, label: { enabled: true }, fill: '#F76693' },
            { x: '$ 250M - 500M', value: 20, label: { enabled: true }, fill: '#54ACE8' },
            { x: '$ 1M - 250M', value: 12, label: { enabled: true }, fill: '#FF9943' },
            { x: '$ 500K - 1M', value: 10, label: { enabled: true }, fill: '#79CB70' },
            { x: '$ 100K - 500K', value: 6, label: { enabled: true }, fill: '#F67E5D' },
            { x: '0 - 100K', value: 11, label: { enabled: true }, fill: '#A578F1' }
        ];
    }
}
