import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import 'anychart';
@Component({
    selector: 'jhi-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, AfterViewInit {
    // @ViewChild('barchartContainer') container;
    chart: any = null;
    @Input() chartData: any;
    @Input() id: string;
    constructor() {}

    ngOnInit() {
        this.chart = anychart.column();
        console.log(this.id);
    }
    ngAfterViewInit() {
        console.log(this.id);
        const chart = anychart.bar();
        chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        chart
            .yAxis()
            .ticks()
            .stroke('#ffff');
        chart.yAxis().labels(false);
        chart.yAxis().stroke('#ffff');
        chart.xAxis().stroke('#ffff');
        // create a bar series and set the data
        const series = chart.bar(this.chartData);
        series.fill('rgb(231, 231, 231)');
        series.stroke('rgb(231, 231, 231)');
        series.hovered().fill('#6b4cd9');
        // set the container id
        chart.container(this.id);

        // initiate drawing the chart
        chart.draw();
        // });
    }
}
