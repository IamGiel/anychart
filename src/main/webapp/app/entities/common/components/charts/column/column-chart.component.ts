import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import 'anychart';

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

    constructor() {}

    ngOnInit() {
        this.chart = anychart.column();
        var series = this.chart.column(this.chartData);
    }
    ngAfterViewInit() {
        this.chart.container(this.container.nativeElement);

        this.chart.title(this.chartTitle);
        //this.chart.title().letterSpacing('1px');
        // set font family
        this.chart.title().fontFamily('Inter UI');

        // get chart tooltip
        this.chart.tooltip().useHtml(true);
        var tooltip = this.chart.tooltip();
        tooltip.title(false);
        tooltip.separator(false);
        tooltip.fontFamily('Inter UI');
        tooltip.format('<b>{%x}</b>: <b>{%value}</b>');
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
        this.chart.normal().stroke(null);
        // set the layout of the legend
        // this.chart.legend().itemsLayout("horizontal-expandable")
        this.chart.legend().fontFamily('Inter UI');
        this.chart.yAxis().title('No. of suppliers');
        this.chart.draw();
    }
}
