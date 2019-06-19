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
        // create a data set
        const series = this.chart.column();
        const data = anychart.data.set(this.chartData);
        //      series.fill('rgb(231, 231, 231)');
        //     series.stroke('rgb(231, 231, 231)');

        const seriesData_1 = data.mapAs({ x: 0, value: 1 });
        const seriesData_2 = data.mapAs({ x: 0, value: 2 });
        const seriesData_3 = data.mapAs({ x: 0, value: 3 });
        const seriesData_4 = data.mapAs({ x: 0, value: 4 });

        // create a chart
        const chart = anychart.column();

        // enable the value stacking mode
        chart.yScale().stackMode('value');

        // create area series, set the data
        const series1 = chart
            .column(seriesData_1)
            .fill('#FFD8AB')
            .stroke('rgb(231, 231, 231)');
        const series2 = chart
            .column(seriesData_2)
            .fill('rgb(231, 231, 231)')
            .stroke('rgb(231, 231, 231)');
        const series3 = chart.column(seriesData_3);
        // const series4 = chart.column(seriesData_3);

        chart.yAxis().labels(false);
        chart.yAxis().stroke('#ffff');
        chart.xAxis().stroke('#ffff');
        chart.yAxis().stroke('#ffff');
        chart
            .yAxis()
            .ticks()
            .stroke('#ffff');
        chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        // configure tooltips
        chart.tooltip().format('{%value} ({%yPercentOfCategory}{decimalsCount:2}%)');

        // configure labels on the y-axis
        chart
            .yAxis()
            .labels()
            .format('{%value}');

        // set the container id
        chart.container(this.id);

        // initiate drawing the chart
        chart.draw();
    }
}
