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
    data2: any[];
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
        this.data2 = [
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
        const svg2 = d3.select('#graphContainer2');

        const margin = { top: 20, right: 20, bottom: 100, left: 100 };
        const graphWidth = 600 - margin.left - margin.right;
        const graphHeight = 600 - margin.top - margin.bottom;

        const graph = svg
            .append('g')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate( ${margin.left}, ${margin.right})`);

        const graph2 = svg2
            .append('g')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate( ${margin.left}, ${margin.right})`);

        const xAxisGroup = graph.append('g').attr('transform', `translate(0, ${graphHeight})`);
        const yAxisGroup = graph.append('g');
        const xAxisGroup2 = graph2.append('g').attr('transform', `translate(0, ${graphHeight})`);
        const yAxisGroup2 = graph2.append('g');

        // scale the y axis
        const y = d3.scaleLinear().range([graphHeight, 0]);

        // scale the x axis
        const x = d3
            .scaleBand()
            .range([0, 500])
            .paddingInner(0.2)
            .paddingOuter(0.4);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3
            .axisLeft(y)
            .ticks(10)
            .tickFormat(d => d + ' orders');
        console.log(xAxis, yAxis);

        // define transition
        const t = d3.transition().duration(500);

        // =========== update data ===========
        const update1stGraph = data => {
            data = this.data;
            // update scales
            y.domain([0, d3.max(this.data, d => d.value)]);
            x.domain(this.data.map(item => item.name));

            // join data
            const rect = graph.selectAll('rect').data(this.data);
            // remove entries when data is updated
            rect.exit().remove();

            rect
                .attr('width', x.bandwidth)
                .attr('fill', 'orange')
                .attr('x', d => x(d.name));

            rect
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                .attr('height', 0)
                .attr('y', graphHeight)
                .attr('fill', 'orange')
                .attr('x', d => x(d.name))
                .merge(rect)
                .transition(t)
                .attr('height', d => graphHeight - y(d.value))
                .attr('y', d => y(d.value));

            // call axes
            xAxisGroup.call(xAxis);
            yAxisGroup.call(yAxis);

            xAxisGroup
                .selectAll('text')
                .attr('transform', 'rotate(-35)')
                .attr('text-anchor', 'end');
        };

        const update2ndGraph = data => {
            data = this.data2;
            // update scales
            y.domain([0, d3.max(this.data2, d => d.value)]);
            x.domain(this.data2.map(item => item.name));

            // join data
            const rect = graph2.selectAll('rect').data(this.data2);
            // remove entries when data is updated
            rect.exit().remove();

            rect
                .attr('width', x.bandwidth)
                .attr('fill', 'lightblue')
                .attr('x', d => x(d.name));

            rect
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                .attr('height', 0)
                .attr('y', graphHeight)
                .attr('fill', 'lightblue')
                .attr('x', d => x(d.name))
                .merge(rect)
                .transition(t)
                .attr('height', d => graphHeight - y(d.value))
                .attr('y', d => y(d.value));

            // call axes
            xAxisGroup2.call(xAxis);
            yAxisGroup2.call(yAxis);

            xAxisGroup2
                .selectAll('text')
                .attr('transform', 'rotate(-35)')
                .attr('text-anchor', 'end');
        };

        // change data every interval
        d3.interval(() => {
            console.log((this.data[0].value += 50));
            this.data[0].value += 50;
            this.data2.pop();
            update1stGraph(this.data);
            update2ndGraph(this.data2);
        }, 3000);

        update1stGraph(this.data);
        update2ndGraph(this.data2);
    }
}
