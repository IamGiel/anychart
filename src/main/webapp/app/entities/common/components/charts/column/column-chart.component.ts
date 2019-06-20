import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import 'anychart';
import { serializePaths } from '@angular/router/src/url_tree';

@Component({
    selector: 'jhi-column-chart',
    templateUrl: './column-chart.component.html'
})
export class ColumnChartComponent implements OnInit, AfterViewInit {
    @ViewChild('chartContainer') container;
    chart: any;
    @Input() chartData: string;
    @Input() chartTitle: string;
    @Input() hideTooltipPerct: string;
    @Input() heightValue: string;
    @Input() showValue: string;
    @Input() labels: boolean;

    constructor() {}

    ngOnInit() {
        this.chart = anychart.column();
    }
    ngAfterViewInit() {
        const series = this.chart.column(this.chartData);
        this.chart.container(this.container.nativeElement);
        series.fill('rgb(231, 231, 231)');
        series.stroke('rgb(231, 231, 231)');
        this.chart.yAxis().stroke('#ffff');
        this.chart.yAxis().labels(false);
        if (this.labels !== true) {
            this.chart.xAxis().labels(false);
        }
        this.chart
            .yAxis()
            .ticks()
            .stroke('#ffff');
        this.chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        this.chart.xAxis().stroke('#ffff');
        // this.chart.xAxis().labels(false);
        this.chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        this.chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        // const title = this.chart.xAxis().title();
        // title.text(this.chartTitle);
        // title.fontWeight(400);
        // title.enabled(true);
        //this.chart.title().letterSpacing('1px');
        // set font family

        this.chart.title().fontFamily('Inter UI');
        this.chart
            .tooltip()
            .background()
            .fill('#FFFFFF');
        this.chart
            .tooltip()
            .padding()
            .left(20);
        this.chart.tooltip().separator(false);
        this.chart.tooltip().fontColor('#000000');
        // this.chart.tooltip().useHtml(true);
        // this.chart.tooltip().padding().left(20);
        // this.chart.tooltip().format('Rating 8');

        //
        // this.chart.tooltip().format('<b>{%x}</b>: <b>{%value}</b>');
        // this.chart.tooltip().useHtml(true);
        // get chart tooltip
        // this.chart.tooltip().useHtml(true);
        // var tooltip = this.chart.tooltip();
        // tooltip.title(false);
        // tooltip.separator(false);
        // tooltip.fontFamily('Inter UI');
        //

        //this.chart.labels().position('outside');
        // disable the legend
        //this.chart.legend(false);
        if (this.hideTooltipPerct != 'true') {
            this.chart.labels().position('outside');
        }
        if (this.hideTooltipPerct == 'true') {
            // set the position of the legend
            this.chart.legend().itemsLayout('vertical');
            this.chart.legend().position('right');
            // set the alignment of the legend
            this.chart.legend().align('center');
        }
        if (this.showValue == 'true') {
            this.chart.labels().format('{%value}');
        }
        this.chart.legend().fontSize(9);
        //this.chart.legend().maxHeight("30%");
        // this.chart.legend().maxWidth("100%");
        this.chart.legend().maxWidth('100%');
        this.chart.normal().stroke(null);
        // set the layout of the legend
        // this.chart.legend().itemsLayout("horizontal-expandable")
        this.chart.legend().fontFamily('Inter UI');
        // this.chart.yAxis().title('No. of suppliers');
        this.chart.draw();
    }
}
