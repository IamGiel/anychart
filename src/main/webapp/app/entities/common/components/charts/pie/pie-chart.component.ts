import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import 'anychart';

@Component({
    selector: 'jhi-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.css']
})
export class PieChartComponent implements OnInit, AfterViewInit {
    @ViewChild('chartContainer') container;
    chart: anychart.charts.Pie = null;
    @Input() chartData: string;
    @Input() chartTitle: string;
    @Input() hideTooltipPerct: string;
    @Input() heightValue: string;
    @Input() showValue: string;

    constructor() {}

    ngOnInit() {
        this.chart = anychart.pie(this.chartData);
    }
    ngAfterViewInit() {
        this.chart.container(this.container.nativeElement);
        this.chart.innerRadius('50%');

        // set the position of labels
        //this.chart.labels().position("outside");
        var label = anychart.standalones.label();
        label.text('100');
        label.width('100%');
        label.height('100%');
        label.adjustFontSize(true);
        // label.fontSize(14);
        // label.fontColor('#60727b');
        // label.fontFamily('Inter UI');
        label.hAlign('center');
        label.vAlign('middle');

        this.chart.center().content(label);
        this.chart.title(this.chartTitle);
        //this.chart.title().letterSpacing('1px');
        // set font family
        this.chart.title().fontFamily('Inter UI');
        // configure connectors
        this.chart.connectorStroke({ color: '#595959', thickness: 2, dash: '2 2' });

        // get chart tooltip
        this.chart.tooltip().useHtml(true);
        var tooltip = this.chart.tooltip();
        tooltip.title(false);
        tooltip.separator(false);
        tooltip.fontFamily('Inter UI');
        tooltip.format('<b>{%label}</b>: <b>{%value}</b>');

        //this.chart.labels().position('outside');
        // disable the legend
        //this.chart.legend(false);
        if (this.hideTooltipPerct != 'true') {
            this.chart.labels().position('outside');
        }
        if (this.hideTooltipPerct == 'true') {
            // set the position of the legend
            // this.chart.legend().itemsLayout('vertical');
            //this.chart.legend().position('right');
            // set the alignment of the legend
            this.chart.legend(false);
        }
        if (this.showValue == 'true') {
            this.chart.labels().format('{%value}');
        }
        this.chart.legend().fontSize(12);
        //this.chart.legend().maxHeight("30%");
        // this.chart.legend().maxWidth("100%");

        // set the layout of the legend
        // this.chart.legend().itemsLayout("horizontal-expandable")
        this.chart.legend().fontFamily('Inter UI');
        this.chart.draw();
    }
}
