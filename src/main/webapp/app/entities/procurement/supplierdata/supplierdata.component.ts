import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'anychart';

@Component({
    selector: 'jhi-supplierdata',
    templateUrl: './supplierdata.component.html',
    styleUrls: ['./supplierdata.component.css']
})
export class SupplierdataComponent implements OnInit {
    @ViewChild('target') container;
    @ViewChild('owner') second;
    @ViewChild('response') response;

    constructor() {
        document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
    }

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
            this.resfilter = false;
        }
    }
    activeTab = 'Countries';
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
    mapdropdown = 'Basic Map';
    mapdrop: boolean;
    ffilter = false;
    envfilter = false;
    ethicalfilter = false;
    laborfilter = false;
    ownershipfilter = false;
    resfilter = false;
    financialdb: boolean = false;
    clickfinance = 'D&B Rating';
    clickEnvironmental = 'Overall Rating';
    lidata = ['Groups', 'Flags', 'Response', 'Advanced', 'Saved filters'];
    showFinancialdropdown = false;
    showEnvdropdown = false;
    showEthicaldropdown = false;
    showlabordropdown = false;
    showEnvGraph = false;
    showEthicGraph = false;
    showLabourGraph = false;
    responseFunnelData = [];
    splineData = [
        { x: '1', value: 0 },
        { x: '2', value: 9 },
        { x: '3', value: 8 },
        { x: '4', value: 11 },
        { x: '5', value: 9 },
        { x: '6', value: 5 },
        { x: '7', value: 7 },
        { x: '8', value: 2 },
        { x: '9', value: 0 }
    ];
    @ViewChild('myDiv') myDivRef: ElementRef;
    // host: {
    //     '(document:click)': 'onClick($event)',
    // };

    showdropdown(type: string) {
        if (type == 'financial') {
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
        } else if (type == 'response') {
            alert(this.resfilter);
            this.resfilter = !this.resfilter;
            alert(this.resfilter);
            this.laborfilter = false;
            this.ffilter = false;
            this.envfilter = false;
            this.ethicalfilter = false;
            this.ownershipfilter = false;
        }
    } // openFilterDetails

    ngOnInit() {
        this.clickfinance = 'D&B Rating';
        this.clickEnvironmental = 'Overall Rating';
        this.chartData = [
            { label: 'Shared', value: 86, fill: '#31d490' },
            { label: 'Pending', value: 12, fill: '#FFCB70' },
            { label: 'Declined', value: 2, fill: '#FF7272' }
        ];
        this.columnData = [['1', 30], ['2', 40], ['3', 50], ['4', 50], ['5', 45], ['6', 40], ['7', 50], ['8', 30], ['9', 20]];
        this.columnDatas = [['0-29', 3], ['30-49', 4], ['50-69', 9], ['70-89', 9], ['90-100', 7]];
        this.columnDatass = [3, 4, 9, 8, 7];
        this.datas = [['Limited', 3], ['Fair', 4], ['Good', 9], ['High', 9]];
        this.ethicaldata = [['0', 6], ['1-10', 3], ['11-20', 2.8], ['21-30', 2], ['30+', 1.8]];
        this.labourData = [
            { label: '0-10', value: 5, fill: '#E7E7E7', stroke: '#E7E7E7' },
            { label: '2', value: 4, fill: '#E7E7E7', stroke: '#E7E7E7' },
            { label: '3', value: 3, fill: '#E7E7E7', stroke: '#E7E7E7' },
            { label: '4', value: 3, fill: '#E7E7E7', stroke: '#E7E7E7' },
            { label: '5', value: 2, fill: '#E7E7E7', stroke: '#E7E7E7' }
        ];
        this.treeData = [['LIMITED', 0, 5], ['FAIR', 0, 10], ['GOOD', 5, 10], ['HIGH', 2, 13]];
        this.responseFunnelData = [['Request', 0, 5], ['Response', 0, 10], ['Response Health', 5, 10]];
    }
    clickFinancial(data) {
        if (data === 'D&B Rating') {
            this.clickfinance = 'D&B Rating';
            this.columnData = [['1', 30], ['2', 40], ['3', 50], ['4', 50], ['5', 45], ['6', 40], ['7', 50], ['8', 30], ['9', 20]];
        } else if (data === 'D&B SER Rating') {
            this.clickfinance = 'D&B SER Rating';
            this.columnData = [['1', 10], ['2', 60], ['3', 50], ['4', 50], ['5', 45], ['6', 40], ['7', 20], ['8', 25], ['9', 10]];
        } else if (data === 'D&B Paydex') {
            this.clickfinance = 'D&B Paydex';
            this.columnData = this.splineData;
        }

        this.showFinancialdropdown = false;
    }
    environmental(data) {
        if (data === 'Overall Rating') {
            this.clickEnvironmental = 'Overall Rating';
            this.columnDatas = [['0-29', 13], ['30-49', 10], ['50-69', 19], ['70-89', 14], ['90-100', 17]];
        } else if (data === 'Ethics') {
            this.clickEnvironmental = 'Ethics';
            this.columnDatas = [['0-29', 6], ['30-49', 14], ['50-69', 19], ['70-89', 19], ['90-100', 12]];
        } else if (data === 'Environment') {
            this.clickEnvironmental = 'Environment';
            this.columnDatas = [['0-29', 10], ['30-49', 4], ['50-69', 9], ['70-89', 9], ['90-100', 7]];
        } else if (data === 'Labour& Human rights') {
            this.clickEnvironmental = 'Labour& Human rights';
            this.columnDatas = [['0-29', 13], ['30-49', 9], ['50-69', 13], ['70-89', 15], ['90-100', 17]];
        } else if (data === 'Sustainable procurem..') {
            this.clickEnvironmental = 'Sustainable procurem..';
            this.columnDatas = [['0-29', 13], ['30-49', 14], ['50-69', 19], ['70-89', 19], ['90-100', 17]];
        }

        this.showEnvdropdown = false;
    }

    showEthicalGraphs(type: string) {
        this.showEthicaldropdown = false;
    }
    showLaborGraphs(type: string) {
        this.showlabordropdown = false;
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

    selectMap(maptype: string) {
        this.mapdropdown = maptype;
        this.mapdrop = !this.mapdrop;
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
    maintabClicked(tab: string) {
        this.activeTab = tab;
    }
}
