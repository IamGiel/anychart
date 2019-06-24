import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-stack-bar',
    templateUrl: './stack-bar.component.html',
    styleUrls: ['./stack-bar.component.css']
})
export class StackBarComponent implements OnInit {
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
        // // create a data set
        // const series = this.chart.column();
        // const data = anychart.data.set(this.chartData);
        // //      series.fill('rgb(231, 231, 231)');
        // //     series.stroke('rgb(231, 231, 231)');

        // const seriesData_1 = data.mapAs({ x: 0, value: 1 });
        // const seriesData_2 = data.mapAs({ x: 0, value: 2 });
        // const seriesData_3 = data.mapAs({ x: 0, value: 3 });
        // const seriesData_4 = data.mapAs({ x: 0, value: 4 });

        // // create a chart
        // const chart = anychart.column();

        // // enable the value stacking mode
        // chart.yScale().stackMode('value');

        // // create area series, set the data
        // const series1 = chart
        //     .column(seriesData_1)
        //     .fill('#FFD8AB')
        //     .stroke('rgb(231, 231, 231)');
        // const series2 = chart
        //     .column(seriesData_2)
        //     .fill('rgb(231, 231, 231)')
        //     .stroke('rgb(231, 231, 231)');
        // const series3 = chart.column(seriesData_3);
        // // const series4 = chart.column(seriesData_3);

        // chart.yAxis().labels(false);
        // chart.yAxis().stroke('#ffff');
        // chart.xAxis().stroke('#ffff');
        // chart.yAxis().stroke('#ffff');
        // chart
        //     .yAxis()
        //     .ticks()
        //     .stroke('#ffff');
        // chart
        //     .xAxis()
        //     .ticks()
        //     .stroke('#ffff');
        // // configure tooltips
        // chart.tooltip().format('{%value} ({%yPercentOfCategory}{decimalsCount:2}%)');

        // // configure labels on the y-axis
        // chart
        //     .yAxis()
        //     .labels()
        //     .format('{%value}');

        // create a data set

        // var data = anychart.data.set([
        //     ['Request', 50, 15, 10, 5],
        //     ['Response', 17, 23, 10, 20],
        //     ['Response Health', 17, 25, 16, 27]
        // ]);

        var data = anychart.data.set(this.chartData);

        var seriesData_1 = data.mapAs({ x: 0, value: 1 });
        var seriesData_2 = data.mapAs({ x: 0, value: 2 });
        var seriesData_3 = data.mapAs({ x: 0, value: 3 });
        var seriesData_4 = data.mapAs({ x: 0, value: 4 });

        var chart = anychart.mekko();

        var series1 = chart.mekko(seriesData_1);
        var series2 = chart.mekko(seriesData_2);
        var series3 = chart.mekko(seriesData_3);
        var series4 = chart.mekko(seriesData_4);

        series1.normal().fill('#31D490');
        series2.normal().fill('#FFCB70');
        series3.normal().fill('#FF7272');
        series4.normal().fill('#dddddd');

        series1.normal().stroke('#FFF');
        series2.normal().stroke('#FFf');
        series3.normal().stroke('#FFF');
        series4.normal().stroke('#FFF');

        // set the container id
        chart.container(this.id);

        // initiate drawing the chart
        chart.draw();
    }
}
