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

        // scale the y axis
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, d => d.value)])
            .range([0, 500]);

        // scale the x axis
        const x = d3
            .scaleBand()
            .domain(this.data.map(item => item.name))
            .range([0, 500])
            .paddingInner(0.2)
            .paddingOuter(0.4);

        // =========== join data ===========
        const rect = svg.selectAll('rect').data(this.data);

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
    }
}
