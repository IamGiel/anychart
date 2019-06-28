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
    text;

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

            case 'Environmental Compliance':
                this.countryData = this.mapService.environmentData.data;
                break;

            case 'Social Compliance':
                this.countryData = this.mapService.socialData.data;
                break;

            case 'Financial Integrity':
                this.countryData = this.mapService.financialData.data;
                break;
            case 'Business Integrity':
                this.countryData = this.mapService.mapBusinessIntegrity.data;
                break;

            default:
            case 'Country Risk':
                this.countryData = this.mapService.mapCountryRisk.data;
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
        this.map.geoData('anychart.maps.world');
        // var series1 = this.map.bubble(this.locations);
        var series2 = this.map.choropleth(this.countryData);

        // series1.labels().format('{%id}');
        // series1.tooltip().format('{%size}');
        // series1.tooltip().titleFormat('{%id}');

        series2.labels().format('{%name}');

        // this.countryData.forEach(ele => {
        //     series2.tooltip().format(function(e) {
        //         // let text;

        //         for (let i = 0; i < e.getData('indicator').length; i++) {
        //             this.text += e.getData('indicator')[i].label + ' : ' + e.getData('indicator')[i].value + '\n';
        //         }
        //         return this.text;
        //     });
        //     console.log(ele);
        // });

        this.countryData.forEach(ele => {
            series2.tooltip().format('Risk: {%RISK} \nValue: {%value}');
            console.log('whats in ele ', ele);
        });

        series2.tooltip().titleFormat('{%name}');

        series2.tooltip().titleFormat('{%name}');

        this.map.maxBubbleSize(8);
        this.map.minBubbleSize(2);
        let colorRange = this.map.colorRange();
        colorRange.enabled(true);
        series2.colorScale(anychart.scales.linearColor('#32D490', '#FFCB70', '#FF7273'));
        series2.stroke('#999 .1');

        this.map.container('worldmap');
        this.map.draw();

        var zoomController = anychart.ui.zoom();
        zoomController.target(this.map);
        zoomController.render();
    }
}
