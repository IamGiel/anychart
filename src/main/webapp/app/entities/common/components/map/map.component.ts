import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    countryData: any;
    constructor(private http: HttpClient, private service: MapService) {
        // this.service.getCountrydata()
        // .subscribe((data: any) => {
        //     this.countryData=data;
        //     console.log('hi hello');
        //     console.log(data);
        // })
    }

    ngOnInit() {
        this.basicMap();
        this.http
            .get(' ../../../mock-data/mapdata.json')
            .toPromise()
            .then((res: any) => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
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

        var locations = [
            { id: 'Bangalore', size: 6, lat: 12.9743882, long: 77.5882343 },
            { id: 'New Delhi', size: 3, lat: 28.6139391, long: 77.2090212 },
            { id: 'San Fransisco', size: 9, lat: 37.7712408, long: -122.5389803 },
            { id: 'New York', size: 12, lat: 40.6611314, long: -74.3096548 },
            { id: 'Hongkong', size: 12, lat: 22.1287591, long: 114.2396604 },
            { id: "Xi'an", size: 4, lat: 34.2590616, long: 108.6870282 },
            { id: 'Yokohama', size: 9, lat: 35.4526439, long: 139.456724 },
            { id: 'Frankfurt', size: 4, lat: 50.1211277, long: 8.4964825 },
            { id: 'Accra', size: 2, lat: 5.5912077, long: -0.2147489 },
            { id: 'Berlin', size: 2, lat: 52.5067614, long: 13.2846508 },
            { id: 'London', size: 9, lat: 51.5285582, long: -0.2416797 },
            { id: 'Liverpool', size: 4, lat: 53.4121569, long: -2.9860979 },
            { id: 'Milan', size: 2, lat: 45.4627124, long: 9.1076929 },
            { id: 'Casablanca', size: 2, lat: 33.5722678, long: -7.6570322 }
        ];
        var countryData = [
            {
                id: 'SA',
                name: 'Saudi Arabia',
                value: '5.5',
                indicator: 'Environmental performance index'
            },
            {
                id: 'VA',
                name: 'Vatican City',
                value: '8.6',
                indicator: 'Environmental performance index'
            },
            {
                id: 'IN',
                name: 'India',
                value: '6.5',
                indicator: 'Environmental performance index'
            },
            {
                id: 'US',
                name: 'United States of America',
                value: '9.6',
                indicator: 'Environmental performance index'
            },
            {
                id: 'UK',
                name: 'United Kingdom',
                value: '6.5',
                indicator: 'Environmental performance index'
            },
            {
                id: 'CN',
                name: 'China',
                value: '3.5',
                indicator: 'Environmental performance index'
            },
            {
                id: 'AU',
                name: 'Australia',
                value: '6.9',
                indicator: 'Environmental performance index'
            },
            {
                id: 'DE',
                name: 'Germany',
                value: '8.7',
                indicator: 'Environmental performance index'
            },
            {
                id: 'FR',
                name: 'France',
                value: '8.3',
                indicator: 'Environmental performance index'
            }
        ];
        var map = anychart.map();
        map.geoData('anychart.maps.world');
        var series1 = map.bubble(locations);
        var series2 = map.choropleth(countryData);

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
