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
    constructor() {}

    ngOnInit() {
        this.chart = anychart.column();
    }
    ngAfterViewInit() {
        console.log(this.chartData);
        // create a data set
        const series = this.chart.column(this.chartData);
        var data = anychart.data.set(this.chartData);
        series.fill('rgb(231, 231, 231)');
        series.stroke('rgb(231, 231, 231)');
        this.chart.yAxis().stroke('#ffff');
        this.chart.yAxis().labels(false);
        this.chart
            .yAxis()
            .ticks()
            .stroke('#ffff');
        this.chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        // map the data
        var seriesData_1 = data.mapAs({ x: 0, value: 1 });
        var seriesData_2 = data.mapAs({ x: 0, value: 2 });
        var seriesData_3 = data.mapAs({ x: 0, value: 3 });

        // create a chart
        var chart = anychart.column();

        /* enable the value stacking mode
      on the default primary value scale*/
        chart.yScale().stackMode('value');

        // create column series
        chart.column(seriesData_1);
        chart.column(seriesData_2);
        chart.column(seriesData_3);

        // set the container id
        chart.container('bargraph');

        // initiate drawing the chart
        chart.draw();
    }
}
