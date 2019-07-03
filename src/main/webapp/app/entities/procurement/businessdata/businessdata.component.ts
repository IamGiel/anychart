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
    annualdata = [];
    constructor() {}
    ngOnInit() {
        this.ownershipData = [
            { label: 'Limited Partnership', value: 84, fill: '#F76693' },
            { label: 'Limited Liability com', value: 15, fill: '#7888F1' },
            { label: 'Private Corporation', value: 8, fill: '#54ACE8' },
            { label: 'Sole Proprietorship', value: 7, fill: '#FF9943' },
            { label: 'Public Corporation', value: 6, fill: '#79CB70' }
        ];
        this.businessData = [
            { label: 'Service Business', value: 25, fill: '#7888F1' },
            { label: 'Merchandising', value: 42, fill: '#F76693' },
            { label: 'Manufacturing', value: 33, fill: '#54ACE8' },
            { label: 'Hybrid Business', value: 12, fill: '#FF9943' },
            { label: 'Others', value: 8, fill: '#79CB70' }
        ];
        this.financialData = [
            { x: 'Limited Partenship', value: 84 },
            { x: 'Limited Liability com', value: 8 },
            { x: 'Private Corporation', value: 6 },
            { x: 'Sole Proprietorship', value: 1 },
            { x: 'Public Corporation', value: 1 }
        ];
        this.categoryData = [
            { x: 'PCB', value: 18, label: { enabled: true }, fill: '#7888F1' },
            { x: 'Battery', value: 18, label: { enabled: true }, fill: '#F76693' },
            { x: 'Camera', value: 17, label: { enabled: true }, fill: '#54ACE8' },
            { x: 'Display', value: 16, label: { enabled: true }, fill: '#FF9943' },
            { x: 'Processor', value: 15, label: { enabled: true }, fill: '#79CB70' },
            { x: 'Memory unit', value: 14, label: { enabled: true }, fill: '#F67E5D' },
            { x: 'Workstation', value: 12, label: { enabled: true }, fill: '#A578F1' },
            { x: 'Office supplies', value: 6, label: { enabled: true }, fill: '#B4E374' },
            { x: 'Others', value: 4, label: { enabled: true }, fill: '#E7E7E7' }
        ];
        this.industriesData = [
            { x: 'Pharmaceutical', value: 21, label: { enabled: true }, fill: '#7888F1' },
            { x: 'Energy Exploration & ..', value: 19, label: { enabled: true }, fill: '#F76693' },
            { x: 'Oil Field Services', value: 17, label: { enabled: true }, fill: '#54ACE8' },
            { x: 'Media and Entertainment', value: 16, label: { enabled: true }, fill: '#FF9943' },
            { x: 'Personal Prdouct', value: 14, label: { enabled: true }, fill: '#79CB70' },
            { x: 'Chemical', value: 13, label: { enabled: true }, fill: '#F67E5D' },
            { x: 'Industry Manufacature', value: 12, label: { enabled: true }, fill: '#A578F1' },
            { x: 'Telcom', value: 4, label: { enabled: true }, fill: '#B4E374' },
            { x: 'Others', value: 4, label: { enabled: true }, fill: '#E7E7E7' }
        ];
        this.supplierdata = [
            { x: '$ 1B+', value: 25, label: { enabled: true }, fill: '#7888F1' },
            { x: '$ 500M - 1B', value: 19, label: { enabled: true }, fill: '#F76693' },
            { x: '$ 250M - 500M', value: 17, label: { enabled: true }, fill: '#54ACE8' },
            { x: '$ 1M - 250M', value: 14, label: { enabled: true }, fill: '#FF9943' },
            { x: '$ 500K - 1M', value: 10, label: { enabled: true }, fill: '#79CB70' },
            { x: '$ 100K - 500K', value: 12, label: { enabled: true }, fill: '#F67E5D' },
            { x: '0 - 100K', value: 23, label: { enabled: true }, fill: '#A578F1' }
        ];
        this.annualdata = [
            { x: '$ 1B+', value: 23, label: { enabled: true }, fill: '#7888F1' },
            { x: '$ 500M - 1B', value: 24, label: { enabled: true }, fill: '#F76693' },
            { x: '$ 250M - 500M', value: 16, label: { enabled: true }, fill: '#54ACE8' },
            { x: '$ 1M - 250M', value: 21, label: { enabled: true }, fill: '#FF9943' },
            { x: '$ 500K - 1M', value: 14, label: { enabled: true }, fill: '#79CB70' },
            { x: '$ 100K - 500K', value: 9, label: { enabled: true }, fill: '#F67E5D' },
            { x: '0 - 100K', value: 13, label: { enabled: true }, fill: '#A578F1' }
        ];
    }

    getDataPercent(value) {
        return Math.round(value / 120 * 100);
    }
}
