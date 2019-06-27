import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MapService } from './map.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
    //countryData: any;
    @Input('chartData') chartData;
    @Input('locationData') locationData;
    map = anychart.map();

    mapdata: any[] = [];

    locations: any[] = [];

    countryData: any[] = [];

    earthquakeData: any[] = [];

    constructor(private mapService: MapService) {}

    ngOnChanges() {
        console.log('whats in chartdata ', this.chartData);
        switch (this.locationData) {
            case 'Site Location':
                this.locations = this.mapService.locationData.SiteLocations;
                break;

            case 'HQ Location':
                this.locations = this.mapService.locationData.HQLocations;
                break;

            default:
                this.locations = this.mapService.locationData.HQLocations;
                break;
        }
        switch (this.chartData) {
            case 'Basic Map':
                this.countryData = [];
                break;

            case 'Environmental Risk':
                this.countryData = this.mapService.mapData.data;
                break;

            case 'Country Risk':
                this.countryData = this.mapService.earthquakeData.data;
                break;

            case 'Social Compliance':
                this.countryData = this.mapService.socialData.data;
                break;

            default:
                this.countryData = [];
                this.locations = this.mapService.locationData.HQLocations;
                break;
        }
        this.map.dispose();
        this.map = null;

        this.map = anychart.map();
        this.basicMap();
    }

    ngOnInit() {
        // this.basicMap();
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

        this.map.geoData('anychart.maps.world');
        var series1 = this.map.bubble(this.locations);
        var series2 = this.map.choropleth(this.countryData);

        series1.labels().format('{%id}');
        series1.tooltip().format('{%size}');
        series1.tooltip().titleFormat('{%id}');

        series2.labels().format('{%name}');

        this.countryData.forEach(ele => {
            series2.tooltip().format(function(e) {
                var text = '';
                for (var i = 0; i < e.getData('indicator').length; i++) {
                    text += e.getData('indicator')[i].label + ' : ' + e.getData('indicator')[i].value + '\n';
                }
                return text;
            });
        });

        series2.tooltip().titleFormat('{%name}');

        series2.tooltip().titleFormat('{%name}');

        this.map.maxBubbleSize(8);
        this.map.minBubbleSize(2);
        var colorRange = this.map.colorRange();
        colorRange.enabled(true);
        series2.colorScale(anychart.scales.linearColor('black', 'red', 'green'));
        series2.stroke('#000 .1');

        var zoomController = anychart.ui.zoom();
        zoomController.render(this.map);
        this.map.container('worldmap');
        this.map.draw();
    }
}
