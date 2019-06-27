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
    }
    ngAfterViewInit() {
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

        chart.tooltip().format('{%value}');
        // create a bar series and set the data
        const series = chart.bar(this.chartData);
        series.fill('rgb(231, 231, 231)');
        series.stroke('rgb(231, 231, 231)');
        series.hovered().fill('#6b4cd9');
        // set the container id
        chart.container(this.id);

        chart.tooltip().useHtml(true);
        chart.tooltip().background('#FFF');
        chart.tooltip().separator(false);
        chart
            .tooltip()
            .format(
                '<span style="font-size:14px;color:#FFF;">{%chart}</span>' + ': <span style="font-size:14px;color:#FFF;">{%value}</span>'
            );

        // initiate drawing the chart
        chart.draw();
        // });
    }
}
