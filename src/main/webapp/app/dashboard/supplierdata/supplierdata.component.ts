import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'anychart';

@Component({
    host: {
        '(document:click)': 'onClick($event)'
    },
    selector: 'jhi-supplierdata',
    templateUrl: './supplierdata.component.html',
    styleUrls: ['./supplierdata.component.css']
})
export class SupplierdataComponent implements OnInit {
    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.drop = false;
        }
    }

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
    drop = false;
    drop1 = false;
    drop2 = false;
    drop3 = false;
    clickfinance = 'D&B Rating';
    clickEnvironmental = 'Overall Rating';
    lidata = ['Groups', 'Flags', 'Response', 'Advanced', 'Saved filters'];
    @ViewChild('myDiv') myDivRef: ElementRef;
    // host: {
    //     '(document:click)': 'onClick($event)',
    // };
    constructor(private http: HttpClient, private _eref: ElementRef) {}
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
        this.treeData = [['LIMITED', 0, 5], ['FAIR', 0, 10], ['GOOD', 20, 10], ['HIGH', 17, 13]];
    }
    clickFinancial(data) {
        console.log(data);
        if (data === 'D&B Rating') {
            this.clickfinance = 'D&B Rating';
            this.columnData = [['1', 30], ['2', 40], ['3', 50], ['4', 50], ['5', 45], ['6', 40], ['7', 50], ['8', 30], ['9', 20]];
        } else if (data === 'D&B SER Rating') {
            this.clickfinance = 'D&B SER Rating';
            this.columnData = [['1', 10], ['2', 60], ['3', 50], ['4', 50], ['5', 45], ['6', 40], ['7', 20], ['8', 25], ['9', 10]];
        } else if (data === 'D&B Paydex') {
            this.clickfinance = 'D&B Paydex';
            this.columnData = this.treeData;
        }
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
    }

    showMapDropDown() {
        this.mapdrop = !this.mapdrop;
    }
    onClickdrop() {
        this.drop = !this.drop;
        this.drop1 = false;
        this.drop2 = false;
        this.drop3 = false;
    }
    onClick1() {
        this.drop1 = !this.drop1;
        this.drop = false;
        this.drop2 = false;
        this.drop3 = false;
    }
    onClick2() {
        this.drop2 = !this.drop2;
        this.drop = false;
        this.drop1 = false;
        this.drop3 = false;
    }
    onClick3() {
        this.drop3 = !this.drop3;
        this.drop = false;
        this.drop1 = false;
        this.drop2 = false;
    }

    showHideFinancialData() {
        if (this.financialdetails == 'More details') {
            this.showSubCards = true;
            this.financialdetails = 'Hide details';
            this.ethicaldetails = 'More details';
            this.labordetails = 'More details';
            this.environmentdetails = 'More details';
            this.showMore = 'show';
            this.showEnv = '';
            this.showEthical = '';
            this.showLabor = '';

            // this.ngAfterViewChecked();
            // const elmnt = document.getElementById('receipt');
            // elmnt.scrollIntoView();
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
        if (this.environmentdetails == 'More details') {
            this.showSubCards = true;
            this.environmentdetails = 'Hide details';
            this.financialdetails = 'More details';
            this.showEnv = 'show';
            this.showMore = '';
            this.showEthical = '';
            this.showLabor = '';
        } else {
            this.showSubCards = false;
            this.environmentdetails = 'More details';
            this.showEnv = '';
        }
    }

    showHideEthicalData() {
        if (this.ethicaldetails == 'More details') {
            this.showSubCards = true;
            this.ethicaldetails = 'Hide details';

            this.financialdetails = 'More details';
            this.labordetails = 'More details';
            this.environmentdetails = 'More details';

            this.showEthical = 'show';
            this.showMore = '';
            this.showEnv = '';
            this.showLabor = '';
        } else {
            this.showSubCards = false;
            this.ethicaldetails = 'More details';
            this.showEthical = '';
        }
    }

    showHideLaborData() {
        if (this.labordetails == 'More details') {
            this.showSubCards = true;

            this.labordetails = 'Hide details';
            this.financialdetails = 'More details';
            this.ethicaldetails = 'More details';
            this.environmentdetails = 'More details';

            this.showMore = '';
            this.showLabor = 'show';
            this.showEnv = '';
            this.showEthical = '';
        } else {
            this.showSubCards = false;
            this.labordetails = 'More details';
            this.showLabor = '';
        }
    }
}
