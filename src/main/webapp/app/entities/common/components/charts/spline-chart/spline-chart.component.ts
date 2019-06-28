import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-spline-chart',
    templateUrl: './spline-chart.component.html',
    styleUrls: ['./spline-chart.component.css']
})
export class SplineChartComponent implements OnInit, AfterViewInit {
    chart: any;
    @Input() chartData: string;
    @Input() id: string;
    @Input() chartTitle: string;
    @Input() hideTooltipPerct: string;
    @Input() heightValue: string;
    @Input() showValue: string;
    @Input() labels: boolean;
    constructor() {}

    ngOnInit() {}
    ngAfterViewInit() {
        // create a chart
        const chart = anychart.area();

        // create a spline area series and set the data
        const series = chart.splineArea(this.chartData);
        const tooltip = chart.tooltip().enabled(true);

        // set the titles of the axes
        const xAxis = chart.xAxis();
        const yAxis = chart.yAxis();
        // series.fill('rgb(231, 231, 231)');
        series.stroke('rgb(231, 231, 231)');
        chart.yAxis().stroke('#ffff');
        chart.yAxis().labels(false);
        if (this.labels !== true) {
            chart.xAxis().labels(false);
        }
        chart
            .yAxis()
            .ticks()
            .stroke('#ffff');
        chart
            .xAxis()
            .ticks()
            .stroke('#ffff');

        // chart.xAxis().stroke('#ffff');
        // this.chart.xAxis().labels(false);
        chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        chart
            .xAxis()
            .ticks()
            .stroke('#ffff');

        chart.tooltip().useHtml(true);
        chart.tooltip().zIndex(100);
        chart.tooltip().separator(false);
        chart.tooltip().format('<span style="font-size:14px;color:#FFF;">{%value}</span>');

        // set the container id
        chart.container(this.id);

        chart.tooltip().format('{%value}');

        // initiate drawing the chart
        chart.draw();
    }
}
