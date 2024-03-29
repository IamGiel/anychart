import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import 'anychart';
import { serializePaths } from '@angular/router/src/url_tree';

@Component({
    selector: 'jhi-column-chart',
    templateUrl: './column-chart.component.html',
    styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit, AfterViewInit {
    @ViewChild('chartContainer') container;
    chart: any;
    @Input() chartData: any;
    @Input() chartTitle: string;
    @Input() hideTooltipPerct: string;
    @Input() heightValue: string;
    @Input() showValue: string;
    @Input() labels: boolean;

    constructor() {}

    ngOnInit() {}
    ngAfterViewInit() {
        //var dataSet = anychart.data.set(this.chartData);

        // var originalData = dataSet.mapAs({ x: 0, value: 'perc' });
        // var benchmark = dataSet.mapAs({ x: 0, value: 'avgval' });
        // var color = dataSet.mapAs({ x: 0, value: 'color' });

        // var chart = anychart.column();

        // var series1 = chart.column(originalData);
        // series1.stroke(null);

        // series1.normal().fill('#FBCDC1', 1);
        // series1.normal().stroke('#FBCDC1', 1);

        // var series2 = chart.column(benchmark);
        // series2.normal().stroke('#FBCDC1', 1);
        // series2.stroke(null);

        // series2.normal().stroke('#E7E7E7', 1);

        // series1.xPointPosition(0.5);
        // series2.xPointPosition(0.5);

        // chart.tooltip().title(false);
        // chart.tooltip().useHtml(true);
        // chart.tooltip().background('#FFF');
        // chart.tooltip().zIndex(101);
        // chart
        //     .tooltip()
        //     .format(
        //         '<span style="font-size:14px;color:#FFF;">{%name}</span>' +
        //             '<span style="font-size:12px; color:#FFF; float:right; padding:6px 0px 0px 10px;">{%perc}%</span>' +
        //             '<span style="font-size:16px; color:#FFF; float:right;  padding:4px 0px 0px 10px;">{%num}  </span><br/>' +
        //             '<span style="font-size:12px; color:#FFF;">({%risk})</span><br/><br/>' +
        //             '<span style="font-size:12px; color:#FFF; ">Avg among buyers ' +
        //             "<span style='font-weight:600'>{%avgval}%</span></span>"
        //     );

        // chart.tooltip().background('#FFF');
        // chart.tooltip().zIndex(100);
        // chart.yAxis().labels(false);
        // chart.yAxis().stroke('#ffff');
        // // chart.xAxis().stroke(false);
        // chart
        //     .yAxis()
        //     .ticks()
        //     .stroke('#ffff');
        // chart
        //     .xAxis()
        //     .ticks()
        //     .stroke('#ffff');
        // if (this.labels !== true) {
        //     this.chart.xAxis().labels(false);
        // }
        // chart.container(this.container.nativeElement);
        // chart.draw();

        // var dataList = [{"x":"1","perc":2,"avgval":2,"name":"Rating1","risk":"Low Risk","num":2,"fill1":"#55D184","fill2":"#ddd"},
        // {"x":"2","perc":15,"avgval":15,"name":"Rating2","risk":"Low Risk","num":13,"fill1":"#8ECB6F","fill2":"#ddd",},
        // {"x":"3","perc":10,"avgval":15,"name":"Rating3","risk":"Low Risk","num":10,"fill1":"#ADC662","fill2":"#ddd"},
        // {"x":"4","perc":2,"avgval":1,"name":"Rating4","risk":"Low Risk","num":0,"fill1":"#FEA344","fill2":"#ddd"},
        // {"x":"5","perc":5,"avgval":3,"name":"Rating5","risk":"Medium Risk","num":0,"fill1":"#D6C355","fill2":"#ddd"},
        // {"x":"6","perc":6,"avgval":5,"name":"Rating6","risk":"Medium Risk","num":0,"fill1":"#FEA344","fill2":"#ddd"},
        // {"x":"7","perc":0,"avgval":0,"name":"Rating7","risk":"Medium Risk","num":0,"fill1":"#8ECB6F","fill2":"#ddd"}]

        for (var i = 0; i < this.chartData.length; i++) {
            if (this.chartData[i].avgval >= this.chartData[i].perc) {
                this.chartData[i].final = this.chartData[i].perc;
            } else {
                this.chartData[i].final = this.chartData[i].avgval;
            }
        }
        var dataSet = anychart.data.set(this.chartData);

        var originalData = dataSet.mapAs({ x: 0, value: 'perc', fill: 'fill2' });
        var benchmark = dataSet.mapAs({ x: 0, value: 'final', fill: 'fill1' });
        var chart = anychart.column();

        var series;

        series = chart.column(originalData);
        series.xPointPosition(0.5);
        // series.normal().fill("#5cd65c");
        series.stroke(null);

        series = chart.column(benchmark);
        series.xPointPosition(0.5);
        // series.normal().fill("#ddd");
        series.stroke(null);

        chart.tooltip().title(false);
        chart.tooltip().useHtml(true);
        chart.tooltip().background('#FFF');
        chart.tooltip().zIndex(101);
        chart
            .tooltip()
            .format(
                '<span style="font-size:14px;color:#FFF;">{%name}</span>' +
                    '<span style="font-size:12px; color:#FFF; float:right; padding:6px 0px 0px 10px;">{%perc}%</span>' +
                    '<span style="font-size:16px; color:#FFF; float:right;  padding:4px 0px 0px 10px;">{%num}  </span><br/>' +
                    '<span style="font-size:12px; color:#FFF;">({%risk})</span><br/><br/>' +
                    '<span style="font-size:12px; color:#FFF; ">Avg among buyers ' +
                    "<span style='font-weight:600'>{%avgval}%</span></span>"
            );

        chart.tooltip().background('#FFF');
        chart.tooltip().zIndex(100);
        chart.yAxis().labels(false);
        chart.yAxis().stroke('#ffff');
        chart
            .xAxis()
            .labels()
            .fontSize(10);
        // chart.xAxis().stroke(false);
        chart
            .yAxis()
            .ticks()
            .stroke('#ffff');
        chart
            .xAxis()
            .ticks()
            .stroke('#ffff');
        chart.container(this.container.nativeElement);
        chart.draw();

        // ------------

        //     const series = this.chart.column(this.chartData);
        //     this.chart.container(this.container.nativeElement);
        //     series.fill('rgb(231, 231, 231)');
        //     series.stroke('rgb(231, 231, 231)');
        //     this.chart.yAxis().stroke('#ffff');
        //     this.chart.yAxis().labels(false);
        //     if (this.labels !== true) {
        //         this.chart.xAxis().labels(false);
        //     }
        //     this.chart
        //         .yAxis()
        //         .ticks()
        //         .stroke('#ffff');
        //     this.chart
        //         .xAxis()
        //         .ticks()
        //         .stroke('#ffff');
        //     this.chart.xAxis().stroke('#ffff');
        //     // this.chart.xAxis().labels(false);
        //     this.chart
        //         .xAxis()
        //         .ticks()
        //         .stroke('#ffff');
        //     this.chart
        //         .xAxis()
        //         .ticks()
        //         .stroke('#ffff');
        //     // const title = this.chart.xAxis().title();
        //     // title.text(this.chartTitle);
        //     // title.fontWeight(400);
        //     // title.enabled(true);
        //     //this.chart.title().letterSpacing('1px');
        //     // set font family

        //     this.chart.title().fontFamily('Inter UI');
        //     this.chart
        //         .tooltip()
        //         .background()
        //         .fill('#FFFFFF');
        //     this.chart
        //         .tooltip()
        //         .padding()
        //         .left(20);
        //     this.chart.tooltip().separator(false);
        //     this.chart.tooltip().fontColor('#000000');
        //     // this.chart.tooltip().useHtml(true);
        //     // this.chart.tooltip().padding().left(20);
        //     // this.chart.tooltip().format('Rating 8');

        //     //
        //     // this.chart.tooltip().format('<b>{%x}</b>: <b>{%value}</b>');
        //     // this.chart.tooltip().useHtml(true);
        //     // get chart tooltip
        //     // this.chart.tooltip().useHtml(true);
        //     // var tooltip = this.chart.tooltip();
        //     // tooltip.title(false);
        //     // tooltip.separator(false);
        //     // tooltip.fontFamily('Inter UI');
        //     //

        //     //this.chart.labels().position('outside');
        //     // disable the legend
        //     //this.chart.legend(false);
        //     if (this.hideTooltipPerct != 'true') {
        //         this.chart.labels().position('outside');
        //     }
        //     if (this.hideTooltipPerct == 'true') {
        //         // set the position of the legend
        //         this.chart.legend().itemsLayout('vertical');
        //         this.chart.legend().position('right');
        //         // set the alignment of the legend
        //         this.chart.legend().align('center');
        //     }
        //     if (this.showValue == 'true') {
        //         this.chart.labels().format('{%value}');
        //     }
        //     this.chart.legend().fontSize(9);
        //     //this.chart.legend().maxHeight("30%");
        //     // this.chart.legend().maxWidth("100%");
        //     this.chart.legend().maxWidth('100%');
        //     this.chart.normal().stroke(null);
        //     // set the layout of the legend
        //     // this.chart.legend().itemsLayout("horizontal-expandable")
        //     this.chart.legend().fontFamily('Inter UI');
        //     // this.chart.yAxis().title('No. of suppliers');
        //     this.chart.draw();
        // }
    }
}
