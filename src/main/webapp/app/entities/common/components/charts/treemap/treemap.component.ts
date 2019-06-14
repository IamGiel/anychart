import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'jhi-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.css']
})
export class TreemapComponent implements OnInit {
    @ViewChild('treeChartContainer') container;
    chart: any;
    @Input() chartData: any;
    constructor() {}

    ngOnInit() {
        const chart = anychart.treeMap(this.chartData, 'as-tree');
        const customColorScale = anychart.scales.linearColor();
        customColorScale.colors(['#00ccff', '#ffcc00']);

        // set the color scale as the color scale of the chart
        chart.colorScale(customColorScale);

        // add a color range
        chart.colorRange().enabled(true);
        chart.colorRange().length('100%');

        // set the chart title
        chart.title().useHtml(true);

        // set the container id
        chart.container('treeMap');

        // initiate drawing the chart
        chart.draw();
    }
}
