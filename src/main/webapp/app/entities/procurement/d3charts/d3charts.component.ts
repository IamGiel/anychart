import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import * as dataJson from '../../../mock-data/sample-data.json';
import { MapService } from 'app/entities/common/components/map/map.service';

@Component({
    selector: 'jhi-d3charts',
    templateUrl: './d3charts.component.html',
    styleUrls: ['./d3charts.component.css']
})
export class D3chartsComponent implements OnInit {
    someDataHere;
    importJSON = dataJson;
    // data = `../d3charts/sample-data.json`;
    data: any[];
    // data:any = 'https://unpkg.com/us-atlas@1.0.2/us/10m.json';
    @ViewChild('graphContainer') graphContainer: ElementRef;

    constructor(private mapService: MapService) {}

    ngOnInit() {
        // this.someDataHere = this.mapService.getAdvantageData();
        // console.log("test somedata here",this.someDataHere)
        // console.log("test d3 ",d3)
        this.data = [
            {
                name: 'Young',
                order: 'Veggie Soup',
                value: 700
            },
            {
                name: 'James',
                order: 'Baconator with Fries',
                value: 100
            },
            {
                name: 'Greg',
                order: 'Chicken Parmesean',
                value: 120
            },
            {
                name: 'Bryan',
                order: 'Steak and egg',
                value: 180
            },
            {
                name: 'Meg',
                order: 'Milkshake',
                value: 1800
            }
        ];
    }
    ngAfterContentInit() {
        console.log(this.data.map(a => a.value));
        const min = d3.min(this.data, d => d.value);
        const max = d3.max(this.data, d => d.value);
        const extent = d3.extent(this.data, d => d.value);

        console.log(min, max, extent);

        // select svg container
        const svg = d3.select('#graphContainer');

        const margin = { top: 20, right: 20, bottom: 100, left: 100 };
        const graphWidth = 600 - margin.left - margin.right;
        const graphHeight = 600 - margin.top - margin.bottom;

        const graph = svg
            .append('g')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate( ${margin.left}, ${margin.right})`);

        const xAxisGroup = graph.append('g').attr('transform', `translate(0, ${graphHeight})`);
        const yAxisGroup = graph.append('g');

        // scale the y axis
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, d => d.value)])
            .range([0, graphHeight]);

        // scale the x axis
        const x = d3
            .scaleBand()
            .domain(this.data.map(item => item.name))
            .range([0, 500])
            .paddingInner(0.2)
            .paddingOuter(0.4);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisRight(y);
        console.log(xAxis, yAxis);

        // =========== join data ===========
        const rect = graph.selectAll('rect').data(this.data);

        rect
            .attr('width', x.bandwidth)
            .attr('height', d => y(d.value))
            .attr('fill', 'orange')
            .attr('x', d => x(d.name));

        rect
            .enter()
            .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => y(d.value))
            .attr('fill', 'orange')
            .attr('x', d => x(d.name));

        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);
    }
}
