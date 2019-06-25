import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    //countryData: any;
    @Input('chartData') chartData;

    locations: any[] = [];

    countryData: any[] = [];

    constructor(private http: HttpClient, private mapService: MapService) {}

    ngOnInit() {
        this.countryData = this.mapService.mapData.data;
        this.locations = this.mapService.locationData.data;
        this.basicMap();
    }

    basicMap() {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/maps-general-features/world-bubble-map/data.json
        // anychart.data.loadJsonFile('https://cdn.anychart.com/samples/maps-general-features/wo`rld-bubble-map/data.json', function(data) {
        //     const map = anychart.map();
        //     map
        //         .credits()
        //         .enabled(true)
        //         .url('https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density')
        //         .logoSrc('https://en.wikipedia.org/static/favicon/wikipedia.ico')
        //         .text(
        //             'Data source: https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
        //         );
        //     map
        //         .title()
        //         .enabled(true)
        //         .useHtml(true)
        //         .padding([10, 0, 10, 0])
        //         .text('');

        //     map.geoData('anychart.maps.world');

        //     map.interactivity().selectionMode('none');
        //     map.padding(0);

        //     const dataSet = anychart.data.set(data);
        //     const density_data = dataSet.mapAs({ size: 'population' });

        //     const series = map.bubble(density_data);
        //     // set chart bubble settings
        //     map.maxBubbleSize('2%').minBubbleSize('0.5%');

        //     series.labels(false).selectionMode('none');
        //     const series_choropleth = map.choropleth(density_data);
        //     series_choropleth
        //         .selectionMode('none')
        //         .fill('#eaeaea')
        //         .stroke('#D2D2D2')
        //         .labels(false);

        //     series_choropleth
        //         .hovered()
        //         .stroke('#eaeaea')
        //         .fill('#D2D2D2');
        //     map
        //         .tooltip()
        //         .useHtml(true)
        //         .format(function() {
        //             return (
        //                 '<span style="color: #d9d9d9">Density</span>: ' +
        //                 parseFloat(this.getData('density')).toLocaleString() +
        //                 ' pop./km&#178 <br/>' +
        //                 '<span style="color: #d9d9d9">Population</span>: ' +
        //                 parseInt(this.getData('population')).toLocaleString() +
        //                 '<br/>' +
        //                 '<span style="color: #d9d9d9">Area</span>: ' +
        //                 parseInt(this.getData('area')).toLocaleString() +
        //                 ' km&#178'
        //             );
        //         });

        //     // create zoom controls
        //     const zoomController = anychart.ui.zoom();
        //     zoomController.render(map);
        //     // set container id for the chart
        //     map.container('worldmap');
        //     // initiate chart drawing
        //     map.draw();
        // });

        var map = anychart.map();
        map.geoData('anychart.maps.world');
        var series1 = map.bubble(this.locations);
        var series2 = map.choropleth(this.countryData);

        series1.labels().format('{%id}');
        series1.tooltip().format('{%size}');
        series1.tooltip().titleFormat('{%id}');

        series2.labels().format('{%name}');
        series2.tooltip().format('{%indicator}: {%value}');
        series2.tooltip().titleFormat('{%name}');

        map.maxBubbleSize(8);
        map.minBubbleSize(2);
        var colorRange = map.colorRange();
        colorRange.enabled(true);
        series2.colorScale(anychart.scales.linearColor('#B4E8C8', '#FDEC84', '#FFA7A5'));
        series2.stroke('#000 .1');

        var zoomController = anychart.ui.zoom();
        zoomController.render(map);
        map.container('worldmap');
        map.draw();
    }
}
