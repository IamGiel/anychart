import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'anychart';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-supplierdata',
    templateUrl: './supplierdata.component.html',
    styleUrls: ['./supplierdata.component.css']
})
export class SupplierdataComponent implements OnInit {
    @ViewChild('target') container;
    @ViewChild('owner') second;
    @ViewChild('responsefunnel') responsefunnel;
    @ViewChild('dbrating') dbrating;
    @ViewChild('dbserrating') dbserrating;
    @ViewChild('fdbpayindex') fdbpayindex;
    @ViewChild('eoverallrating') eoverallrating;
    @ViewChild('elaborhuman') elaborhuman;
    @ViewChild('eethics') eethics;
    @ViewChild('eappearances') eappearances;
    @ViewChild('efraud') efraud;
    @ViewChild('ecorruption') ecorruption;

    @ViewChild('overallapperances') overallapperances;
    @ViewChild('ldiscrimination') ldiscrimination;
    @ViewChild('lhumanrights') lhumanrights;

    @ViewChild('basicmap') basicmap;

    @ViewChild('eenvironmnt') eenvironmnt;
    @ViewChild('esustanable') esustanable;
    @ViewChild('lhealthspace') lhealthspace;
    @ViewChild('maptest') maptest;
    // @ViewChild('basicmap') basicmap;

    constructor(private modalService: NgbModal) {
        document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
    }
    closeResult: string;

    images = [1, 2, 3, 4, 5, 6].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
    responseFunnelData = [];
    chartData = [];
    financialdetails = 'More details';
    environmentdetails = 'More details';
    ethicaldetails = 'More details';
    labordetails = 'More details';
    showSubCards: boolean;
    data: any = null;
    columnData = [];
    columnDatas = [];
    columnDatass = [];
    ethicaldata = [];
    labourData = [];
    treeData = [];
    datas = [];
    showMore = '';
    showEnv = '';
    showEthical = '';
    showLabor = '';
    mapdropdown = 'Environmental PI';
    mapdrop = false;
    ffilter = false;
    envfilter = false;
    ethicalfilter = false;
    laborfilter = false;
    ownershipfilter = false;
    resfilter = false;
    financialdb: boolean = false;
    clickfinance = 'D&B Rating';
    clickEnvironmental = 'Overall Rating';
    clickEthical = 'Overall Appearance';
    clickLabour = 'Overall Appearance';
    lidata = ['Groups', 'Flags', 'Response', 'Advanced', 'Saved filters'];
    showFinancialdropdown = false;
    showEnvdropdown = false;
    showEthicaldropdown = false;
    showlabordropdown = false;
    showEnvGraph = false;
    showEthicGraph = false;
    showLabourGraph = false;
    activeTab = 'Countries';
    subtab = 'HQ location';
    financialrating = false;
    financialserrating = false;
    dbpayindex = false;
    overallrating = false;
    laborhuman = false;
    ethics = false;
    appearances = false;
    item1 = 'Financial Data';
    item2 = 'D&B Rating';
    item3 = 'Higher than';
    item4 = '1';
    filter1 = [
        { id: '1', value: 'Financial Data' },
        { id: '2', value: 'Environmental Data' },
        { id: '3', value: 'Ethical & Regulatory Data' },
        { id: '4', value: 'Labour,Health & Saftey' }
    ];
    filter2 = [{ id: '1', value: 'D&B Rating' }, { id: '2', value: 'D&B SER Rating' }, { id: '3', value: 'D&B Paydex' }];
    filter3 = [{ id: '1', value: 'Higher than' }, { id: '2', value: 'Lower than' }, { id: '3', value: 'Between' }];
    filter4 = [
        { id: '1', value: '1' },
        { id: '2', value: '2' },
        { id: '3', value: '3' },
        { id: '4', value: '4' },
        { id: '5', value: '5' },
        { id: '6', value: '6' },
        { id: '7', value: '7' },
        { id: '8', value: '8' },
        { id: '9', value: '9' }
    ];
    totalSelectFilterList = [];
    sletectedFilter = '';

    splineData = [
        { x: 'January', value: 0 },
        { x: 'February', value: 9 },
        { x: 'March', value: 8 },
        { x: 'April', value: 11 },
        { x: 'May', value: 9 },
        { x: 'june', value: 5 },
        { x: 'july', value: 7 },
        { x: 'august', value: 2 },
        { x: 'sept', value: 0 }
    ];

    offClickHandler(event: any) {
        if (!this.container.nativeElement.contains(event.target)) {
            // check click origin
            this.ffilter = false;
            this.envfilter = false;
            this.ethicalfilter = false;
            this.laborfilter = false;

            this.showFinancialdropdown = false;
            this.showEthicaldropdown = false;
            this.showEnvdropdown = false;
            this.showlabordropdown = false;
        }
        if (!this.second.nativeElement.contains(event.target)) {
            // check click origin
            this.ownershipfilter = false;
            // this.resfilter = false;
        }
        if (!this.responsefunnel.nativeElement.contains(event.target)) {
            this.resfilter = false;
        }

        if (!this.dbrating.nativeElement.contains(event.target)) {
            this.financialrating = false;
        }
        if (!this.dbserrating.nativeElement.contains(event.target)) {
            this.financialserrating = false;
        }
        if (!this.fdbpayindex.nativeElement.contains(event.target)) {
            this.dbpayindex = false;
        }
        if (!this.eoverallrating.nativeElement.contains(event.target)) {
            this.overallrating = false;
        }
        if (!this.elaborhuman.nativeElement.contains(event.target)) {
            this.laborhuman = false;
        }
        if (!this.eethics.nativeElement.contains(event.target)) {
            this.ethics = false;
        }
        if (!this.eappearances.nativeElement.contains(event.target)) {
            this.appearances = false;
        }
        if (!this.ecorruption.nativeElement.contains(event.target)) {
            this.corruption = false;
        }
        if (!this.efraud.nativeElement.contains(event.target)) {
            this.fraud = false;
        }

        if (!this.overallapperances.nativeElement.contains(event.target)) {
            this.laborapperances = false;
        }
        if (!this.ldiscrimination.nativeElement.contains(event.target)) {
            this.discrimination = false;
        }
        if (!this.lhumanrights.nativeElement.contains(event.target)) {
            this.humanrights = false;
        }
        if (!this.maptest.nativeElement.contains(event.target)) {
            this.mapfilter = false;
        }
        if (!this.basicmap.nativeElement.contains(event.target)) {
            this.mapdrop = false;
        }
        if (!this.eenvironmnt.nativeElement.contains(event.target)) {
            this.eenv = false;
        }
        if (!this.esustanable.nativeElement.contains(event.target)) {
            this.sustainable = false;
        }
        if (!this.edowjones.nativeElement.contains(event.target)) {
            this.dowjones = false;
        }
        if (!this.eregulatory.nativeElement.contains(event.target)) {
            this.regulatory = false;
        }
        if (!this.esanctions.nativeElement.contains(event.target)) {
            this.sanctions = false;
        }
        if (!this.lhealthspace.nativeElement.contains(event.target)) {
            this.healthsafety = false;
        }
        if (!this.eworkspace.nativeElement.contains(event.target)) {
            this.workspace = false;
        }
    }

    @ViewChild('edowjones') edowjones;
    @ViewChild('eregulatory') eregulatory;
    @ViewChild('esanctions') esanctions;
    @ViewChild('eworkspace') eworkspace;

    maintabClicked(tab: string) {
        this.activeTab = tab;
    }
    subtabClicked(tab: string) {
        this.subtab = tab;
    }

    showMapDropDown() {
        this.mapdrop = !this.mapdrop;
    }

    showdropdown(type: string) {
        if (type == 'default') {
            this.showlabordropdown = false;
            this.showFinancialdropdown = false;
            this.showEnvdropdown = false;
            this.showEthicaldropdown = false;
        } else if (type == 'financial') {
            this.showFinancialdropdown = !this.showFinancialdropdown;
            this.showEnvdropdown = false;
            this.showEthicaldropdown = false;
            this.showlabordropdown = false;
        } else if (type == 'env') {
            this.showEnvdropdown = !this.showEnvdropdown;
            this.showFinancialdropdown = false;
            this.showEthicaldropdown = false;
            this.showlabordropdown = false;
        } else if (type == 'ethical') {
            this.showEthicaldropdown = !this.showEthicaldropdown;
            this.showFinancialdropdown = false;
            this.showEnvdropdown = false;
            this.showlabordropdown = false;
        } else if (type == 'labor') {
            this.showlabordropdown = !this.showlabordropdown;
            this.showFinancialdropdown = false;
            this.showEnvdropdown = false;
            this.showEthicaldropdown = false;
        }
    }

    openFilterDetails(type: string) {
        this.showdropdown('default');
        if (type == 'financial') {
            this.ffilter = !this.ffilter;
            this.envfilter = false;
            this.ethicalfilter = false;
            this.laborfilter = false;
            this.ownershipfilter = false;
            this.resfilter = false;
        } else if (type == 'environment') {
            this.envfilter = !this.envfilter;
            this.ffilter = false;
            this.ethicalfilter = false;
            this.laborfilter = false;
            this.ownershipfilter = false;
            this.resfilter = false;
        } else if (type == 'ethical') {
            this.ethicalfilter = !this.ethicalfilter;
            this.ffilter = false;
            this.envfilter = false;
            this.laborfilter = false;
            this.ownershipfilter = false;
            this.resfilter = false;
        } else if (type == 'labor') {
            this.laborfilter = !this.laborfilter;
            this.ffilter = false;
            this.envfilter = false;
            this.ethicalfilter = false;
            this.ownershipfilter = false;
            this.resfilter = false;
        } else if (type == 'ownership') {
            this.laborfilter = false;
            this.ffilter = false;
            this.envfilter = false;
            this.ethicalfilter = false;
            this.ownershipfilter = !this.ownershipfilter;
            this.resfilter = false;
        } else if (type == 'responsefunnel') {
            this.resfilter = !this.resfilter;
            console.log(this.resfilter, type, 'khk');
            this.laborfilter = false;
            this.ffilter = false;
            this.envfilter = false;
            this.ethicalfilter = false;
            this.ownershipfilter = false;
        } else if (type == 'financialrating') {
            this.financialrating = !this.financialrating;
        } else if (type == 'financialserrating') {
            this.financialserrating = !this.financialserrating;
        } else if (type == 'dbpayindex') {
            this.dbpayindex = !this.dbpayindex;
        } else if (type == 'overallrating') {
            this.overallrating = !this.overallrating;
        } else if (type == 'laborhuman') {
            this.laborhuman = !this.laborhuman;
        } else if (type == 'ethics') {
            this.ethics = !this.ethics;
        } else if (type == 'appearances') {
            this.appearances = !this.appearances;
        } else if (type == 'corruption') {
            this.corruption = !this.corruption;
        } else if (type == 'fraud') {
            this.fraud = !this.fraud;
        } else if (type == 'laborapperances') {
            this.laborapperances = !this.laborapperances;
        } else if (type == 'discrimination') {
            this.discrimination = !this.discrimination;
        } else if (type == 'humanrights') {
            this.humanrights = !this.humanrights;
        } else if (type == 'mapfilter') {
            this.mapfilter = !this.mapfilter;
        } else if (type == 'eenv') {
            this.eenv = !this.eenv;
        } else if (type == 'sustainable') {
            this.sustainable = !this.sustainable;
        } else if (type == 'dowjones') {
            this.dowjones = !this.dowjones;
        } else if (type == 'sanctions') {
            this.sanctions = !this.sanctions;
        } else if (type == 'regulatory') {
            this.regulatory = !this.regulatory;
        } else if (type == 'workspace') {
            this.workspace = !this.workspace;
        } else if (type == 'healthsafety') {
            this.healthsafety = !this.healthsafety;
        }
    } // openFilterDetails

    fraud = false;
    corruption = false;
    laborapperances = false;
    discrimination = false;
    humanrights = false;
    mapfilter = false;
    eenv = false;
    sustainable = false;
    dowjones = false;
    regulatory = false;
    sanctions = false;
    workspace = false;
    healthsafety = false;
    spliceData: any;
    ngOnInit() {
        this.clickfinance = 'D&B Rating';
        this.clickEnvironmental = 'Overall Rating';
        this.chartData = [
            { label: 'Shared', value: 172, fill: '#31d490' },
            { label: 'Pending', value: 24, fill: '#FFCB70' },
            { label: 'Declined', value: 4, fill: '#FF7272' }
        ];
        // this.columnData = [['1', 30], ['2', 40], ['3', 50], ['4', 50], ['5', 45], ['6', 40], ['7', 50], ['8', 30], ['9', 20]];
        this.columnData = [
            { x: '1', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
            { x: '2', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
            { x: '3', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
            { x: '4', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
            { x: '5', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 },
            { x: '6', perc: 8, avgval: 8, name: 'Rating 6', risk: 'Medium Risk', num: 8 },
            { x: '7', perc: 12, avgval: 12, name: 'Rating 7', risk: 'Medium Risk', num: 12 },
            { x: '8', perc: 9, avgval: 4, name: 'Rating 8', risk: 'High Risk', num: 9 },
            { x: '9', perc: 6, avgval: 3, name: 'Rating 9', risk: 'High Risk', num: 6 }
        ];

        this.spliceData = [['1', 30], , ['2', 40], ['3', 50], ['4', 50], ['5', 45], ['6', 40], ['7', 50], ['8', 30], ['9', 20]];

        // this.columnDatas = [['0-29', 3], ['30-49', 4], ['50-69', 9], ['70-89', 9], ['90-100', 7]];

        this.columnDatas = [
            { x: '0-29', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
            { x: '30-49', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
            { x: '50-69', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
            { x: '70-89', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
            { x: '90-100', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
        ];

        this.ethicaldata = [
            { x: '0', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
            { x: '1-10', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
            { x: '11-20', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
            { x: '21-30', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
            { x: '30+', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
        ];

        this.labourData = [
            { x: '0-10', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
            { x: '2', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
            { x: '3', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
            { x: '4', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
            { x: '5', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
        ];

        // this.columnDatass = [3, 4, 9, 8, 7];
        this.datas = [['Limited', 3], ['Fair', 4], ['Good', 9], ['High', 9]];

        // this.ethicaldata = [['0', 6], ['1-10', 3], ['11-20', 2.8], ['21-30', 2], ['30+', 1.8]];

        // this.labourData = [
        //     { label: '0-10', value: 5, fill: '#E7E7E7', stroke: '#E7E7E7' },
        //     { label: '2', value: 4, fill: '#E7E7E7', stroke: '#E7E7E7' },
        //     { label: '3', value: 3, fill: '#E7E7E7', stroke: '#E7E7E7' },
        //     { label: '4', value: 3, fill: '#E7E7E7', stroke: '#E7E7E7' },
        //     { label: '5', value: 2, fill: '#E7E7E7', stroke: '#E7E7E7' }
        // ];

        this.treeData = [['LIMITED', 0, 5], ['FAIR', 0, 10], ['GOOD', 5, 10], ['HIGH', 2, 13]];

        this.responseFunnelData = [['Request', 0, 5, 10, 8], ['Response', 0, 10, 5, 7], ['Response Health', 5, 10, 10, 5]];
    }

    selectMap(maptype: string) {
        this.mapdropdown = maptype;
        this.mapdrop = false;
    }

    clickFinancial(data) {
        if (data === 'D&B Rating') {
            this.clickfinance = 'D&B Rating';
            this.columnData = [
                { x: '1', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '2', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '3', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '4', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '5', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 },
                { x: '6', perc: 8, avgval: 8, name: 'Rating 6', risk: 'Medium Risk', num: 8 },
                { x: '7', perc: 12, avgval: 12, name: 'Rating 7', risk: 'Medium Risk', num: 12 },
                { x: '8', perc: 9, avgval: 4, name: 'Rating 8', risk: 'High Risk', num: 9 },
                { x: '9', perc: 6, avgval: 3, name: 'Rating 9', risk: 'High Risk', num: 6 }
            ];
        } else if (data === 'D&B SER Rating') {
            this.clickfinance = 'D&B SER Rating';
            this.columnData = [
                { x: '1', perc: 10, avgval: 10, name: 'Rating 1', risk: 'Low Risk', num: 5 },
                { x: '2', perc: 5, avgval: 5, name: 'Rating 2', risk: 'Low Risk', num: 6 },
                { x: '3', perc: 15, avgval: 15, name: 'Rating 3', risk: 'Low Risk', num: 7 },
                { x: '4', perc: 8, avgval: 8, name: 'Rating 4', risk: 'Medium Risk', num: 8 }
            ];
        } else if (data === 'D&B Paydex') {
            this.clickfinance = 'D&B Paydex';
        }

        this.showFinancialdropdown = false;
    }

    showEthicalGraphs(data) {
        if (data === 'Overall appearance') {
            this.clickEthical = 'Overall Appearance';
            this.ethicaldata = [
                { x: '0', perc: 1, avgval: 1, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '1-10', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '11-20', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '21-30', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '30+', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
            alert(3);
        } else if (data === 'Corruption issue') {
            this.clickEthical = 'Corruption issue';
            this.ethicaldata = [
                { x: '0', perc: 10, avgval: 10, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '1-10', perc: 16, avgval: 16, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '11-20', perc: 12, avgval: 13, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '21-30', perc: 5, avgval: 5, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '30+', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        } else if (data === 'Fraud issue') {
            this.clickEthical = 'Fraud issues';
            this.ethicaldata = [
                { x: '0', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '1-10', perc: 18, avgval: 18, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '11-20', perc: 6, avgval: 6, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '21-30', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '30+', perc: 10, avgval: 10, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        } else if (data === 'Regulatory issue') {
            this.clickEthical = 'Regulatory issues';
            this.ethicaldata = [
                { x: '0', perc: 5, avgval: 5, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '1-10', perc: 10, avgval: 10, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '11-20', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '21-30', perc: 1, avgval: 1, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '30+', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        } else if (data === 'Sanctions') {
            this.ethicaldata = [
                { x: '0', perc: 5, avgval: 5, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '1-10', perc: 16, avgval: 16, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '11-20', perc: 17, avgval: 17, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '21-30', perc: 5, avgval: 5, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '30+', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        }
        this.showEthicaldropdown = false;
    }

    showLaborGraphs(data) {
        if (data === 'Overall Appearance') {
            this.clickLabour = 'Overall Appearance';
            this.labourData = [
                { x: '0-10', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '2', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '3', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '4', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '5', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        } else if (data === 'Discrimanation/workforce..') {
            this.clickLabour = 'Discrimanation/workforce..';
            this.labourData = [
                { x: '0-10', perc: 16, avgval: 16, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '2', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '3', perc: 6, avgval: 6, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '4', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '5', perc: 10, avgval: 10, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        } else if (data === 'Human Right Issue') {
            this.clickLabour = 'Human Right Issue';
            this.labourData = [
                { x: '0-10', perc: 10, avgval: 10, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '2', perc: 2, avgval: 2, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '3', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '4', perc: 12, avgval: 12, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '5', perc: 8, avgval: 8, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        } else if (data === 'Workforce Disputes') {
            this.clickLabour = 'Workforce Disputes';
            this.labourData = [
                { x: '0-10', perc: 18, avgval: 18, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '2', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '3', perc: 15, avgval: 15, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '4', perc: 6, avgval: 6, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '5', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        } else if (data === 'Workforcehealthy/Saftey Is') {
            this.clickLabour = 'Workforcehealthy/Saftey Is';
            this.labourData = [
                { x: '0-10', perc: 10, avgval: 10, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '2', perc: 2, avgval: 2, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '3', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '4', perc: 10, avgval: 10, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '5', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
        }
        this.showlabordropdown = false;
    }

    environmental(type: string) {
        if (type === 'Overall Rating') {
            this.clickEnvironmental = 'Overall Rating';
            this.columnDatas = [
                { x: '0-29', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 8 },
                { x: '30-49', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 12 },
                { x: '50-69', perc: 16, avgval: 16, name: 'Rating 3', risk: 'Low Risk', num: 16 },
                { x: '70-89', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '90-100', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 13 }
            ];
            // this.columnDatas = [['0-29', 13], ['30-49', 10], ['50-69', 19], ['70-89', 14], ['90-100', 17]];
        } else if (type === 'Ethics') {
            this.clickEnvironmental = 'Ethics';
            this.columnDatas = [
                { x: '0-29', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 6 },
                { x: '30-49', perc: 1, avgval: 1, name: 'Rating 2', risk: 'Low Risk', num: 14 },
                { x: '50-69', perc: 10, avgval: 10, name: 'Rating 3', risk: 'Low Risk', num: 19 },
                { x: '70-89', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 19 },
                { x: '90-100', perc: 9, avgval: 9, name: 'Rating 5', risk: 'Medium Risk', num: 21 }
            ];
            // this.columnDatas = [['0-29', 6], ['30-49', 14], ['50-69', 19], ['70-89', 19], ['90-100', 12]];
        } else if (type === 'Environment') {
            this.clickEnvironmental = 'Environment';
            this.columnDatas = [
                { x: '0-29', perc: 12, avgval: 12, name: 'Rating 1', risk: 'Low Risk', num: 10 },
                { x: '30-49', perc: 8, avgval: 8, name: 'Rating 2', risk: 'Low Risk', num: 4 },
                { x: '50-69', perc: 1, avgval: 1, name: 'Rating 3', risk: 'Low Risk', num: 9 },
                { x: '70-89', perc: 10, avgval: 10, name: 'Rating 4', risk: 'Medium Risk', num: 9 },
                { x: '90-100', perc: 15, avgval: 15, name: 'Rating 5', risk: 'Medium Risk', num: 7 }
            ];
            // this.columnDatas = [['0-29', 10], ['30-49', 4], ['50-69', 9], ['70-89', 9], ['90-100', 7]];
        } else if (type === 'Labour& Human rights') {
            this.clickEnvironmental = 'Labour& Human rights';
            this.columnDatas = [
                { x: '0-29', perc: 8, avgval: 8, name: 'Rating 1', risk: 'Low Risk', num: 13 },
                { x: '30-49', perc: 16, avgval: 16, name: 'Rating 2', risk: 'Low Risk', num: 9 },
                { x: '50-69', perc: 5, avgval: 5, name: 'Rating 3', risk: 'Low Risk', num: 13 },
                { x: '70-89', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 15 },
                { x: '90-100', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 17 }
            ];
            // this.columnDatas = [['0-29', 13], ['30-49', 9], ['50-69', 13], ['70-89', 15], ['90-100', 17]];
        } else if (type === 'Sustainable procurem..') {
            this.clickEnvironmental = 'Sustainable procurem..';
            this.columnDatas = [
                { x: '0-29', perc: 10, avgval: 10, name: 'Rating 1', risk: 'Low Risk', num: 13 },
                { x: '30-49', perc: 12, avgval: 12, name: 'Rating 2', risk: 'Low Risk', num: 14 },
                { x: '50-69', perc: 8, avgval: 8, name: 'Rating 3', risk: 'Low Risk', num: 19 },
                { x: '70-89', perc: 15, avgval: 15, name: 'Rating 4', risk: 'Medium Risk', num: 19 },
                { x: '90-100', perc: 13, avgval: 13, name: 'Rating 5', risk: 'Medium Risk', num: 17 }
            ];
            // this.columnDatas = [['0-29', 13], ['30-49', 14], ['50-69', 19], ['70-89', 19], ['90-100', 17]];
        }
        this.showEnvdropdown = false;
    }

    showHideFinancialData() {
        if (this.financialdetails === 'More details') {
            this.showSubCards = true;
            this.financialdetails = 'Hide details';
            this.ethicaldetails = 'More details';
            this.labordetails = 'More details';
            this.environmentdetails = 'More details';
            this.showMore = 'show';
            this.showEnv = '';
            this.showEthical = '';
            this.showLabor = '';
            this.showEnvGraph = false;
            this.showEthicGraph = false;
            this.showLabourGraph = false;
        } else {
            this.showSubCards = false;
            this.financialdetails = 'More details';
            this.showMore = '';
        }
    }

    showHideEnivornData() {
        if (this.environmentdetails === 'More details') {
            this.showSubCards = false;
            this.environmentdetails = 'Hide details';
            this.financialdetails = 'More details';
            this.showEnv = 'show';
            this.showMore = '';
            this.showEthical = '';
            this.showLabor = '';
            this.showEnvGraph = true;
            this.showEthicGraph = false;
            this.showLabourGraph = false;
        } else {
            this.showEnvGraph = false;
            this.environmentdetails = 'More details';
            this.showEnv = '';
        }
    }

    showHideEthicalData() {
        if (this.ethicaldetails === 'More details') {
            this.showSubCards = false;
            this.ethicaldetails = 'Hide details';

            this.financialdetails = 'More details';
            this.labordetails = 'More details';
            this.environmentdetails = 'More details';

            this.showEthical = 'show';
            this.showMore = '';
            this.showEnv = '';
            this.showLabor = '';
            this.showEnvGraph = false;
            this.showEthicGraph = true;
            this.showLabourGraph = false;
        } else {
            this.showEthicGraph = false;
            this.ethicaldetails = 'More details';
            this.showEthical = '';
        }
    }

    showHideLaborData() {
        if (this.labordetails === 'More details') {
            this.showSubCards = false;

            this.labordetails = 'Hide details';
            this.financialdetails = 'More details';
            this.ethicaldetails = 'More details';
            this.environmentdetails = 'More details';

            this.showMore = '';
            this.showLabor = 'show';
            this.showEnv = '';
            this.showEthical = '';
            this.showEnvGraph = false;
            this.showEthicGraph = false;
            this.showLabourGraph = true;
        } else {
            this.showLabourGraph = false;
            this.labordetails = 'More details';
            this.showLabor = '';
        }
    }
    open(content) {
        this.totalSelectFilterList = [];
        console.log(content);
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    addFilterList() {
        this.totalSelectFilterList.push(this.item2 + ' ' + this.item3 + ' ' + this.item4);
        this.sletectedFilter = this.totalSelectFilterList[0];
    }

    removeSelectedFilter(index) {
        this.totalSelectFilterList.splice(index, 1);
    }
}
