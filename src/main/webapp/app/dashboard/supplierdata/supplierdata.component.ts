import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'anychart';

@Component({
    selector: 'jhi-supplierdata',
    templateUrl: './supplierdata.component.html',
    styleUrls: ['./supplierdata.component.css']
})
export class SupplierdataComponent implements OnInit {
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

    lidata = ['Groups', 'Flags', 'Response', 'Advanced', 'Saved filters'];
    @ViewChild('myDiv') myDivRef: ElementRef;
    ngOnInit() {
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
        this.treeData = [
            // {
            //     name: 'European Union', children: [
            //         { name: 'Belgium', value: 11443830 },
            //         { name: 'France', value: 64938716 },
            //         { name: 'Germany', value: 80636124 },
            //         { name: 'Greece', value: 10892931 },
            //         { name: 'Italy', value: 59797978 },
            //         { name: 'Netherlands', value: 17032845 },
            //         { name: 'Poland', value: 38563573 },
            //         { name: 'Romania', value: 19237513 },
            //         { name: 'Spain', value: 46070146 },
            //         { name: 'United Kingdom', value: 65511098 }
            //     ]
            // }
            ['6', 0, 0, 1.5],
            ['7', 0, 1, 1.5],
            ['8', 0, 1, 1]
        ];
    }

    showMapDropDown() {
        this.mapdrop = !this.mapdrop;
    }
    onClick() {
        this.drop = !this.drop;
    }
    onClick1() {
        this.drop1 = !this.drop1;
    }
    onClick2() {
        this.drop2 = !this.drop2;
    }
    onClick3() {
        this.drop3 = !this.drop3;
    }

    showHideFinancialData() {
        if (this.financialdetails == 'More details') {
            this.showSubCards = true;
            this.financialdetails = 'Hide details';
            this.environmentdetails = 'More details';
            this.showMore = 'show';
            this.showEnv = '';
            // this.ngAfterViewChecked();
            // const elmnt = document.getElementById('receipt');
            // elmnt.scrollIntoView();
        } else {
            this.showSubCards = false;
            this.financialdetails = 'More details';
            this.showMore = '';
        }
        this.myDivRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
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
            this.showMore = 'show';
        } else {
            this.showSubCards = false;
            this.ethicaldetails = 'More details';
        }
    }

    showHideLaborData() {
        if (this.labordetails == 'More details') {
            this.showSubCards = true;
            this.labordetails = 'Hide details';
            this.showMore = 'show';
        } else {
            this.showSubCards = false;
            this.labordetails = 'More details';
        }
    }

    constructor(private http: HttpClient) {}
}
