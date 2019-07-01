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
    num;
    arr = [];

    ngOnInit() {
        // for (let i = 1; i < 122; i++) {
        //     this.num = i;
        //     this.getRandomInRange(8.7832, 55.4915, 3);
        console.log('hers random lat and long', this.arr);
        // }

        // this.basicMap();
    }
    // getRandomInRange(from, to, fixed) {
    //     let randomLatLong1 = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    //     let randomLatLong2 = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    //     let result;
    //     this.arr = [];
    //     let level = ['Low', 'Medium', 'High'];
    //     let score = [1, 5, 10];

    //     // console.log(this.num)
    //     let rand = level[Math.floor(Math.random() * level.length)];
    //     // result = `{${randomLatLong1}, "long": ${randomLatLong2}, "name": "Supplier #${this.num}",  "city":"Some City", "value": ${this.num}}`;
    //     // this.arr.push(result);
    //     this.arr.push(rand);
    //     // this.arr.push(score);
    //     return this.arr;
    //     // .toFixed() returns string, so ' * 1' is a trick to convert to number
    // }

    basicMap() {
        this.map.geoData('anychart.maps.world');
        // let series2 = this.map.choropleth(this.countryData);
        let dotMarkers = this.map.marker(this.mapService.suppliersOnMap.data[0].suppliers);
        let mapCountryColors = this.map.choropleth(this.countryData);
        dotMarkers.labels(false);
        // set the colors of the CITRUS series
        dotMarkers.stroke('gold');
        dotMarkers.fill('#7B4DD9');

        // set the size of CITRUS markers
        dotMarkers.normal().size(2);
        dotMarkers.hovered().size(4);
        dotMarkers.selected().size(10);
        console.log('this is series 3 ', this.mapService.suppliersOnMap.data[0].suppliers);

        mapCountryColors.labels().format('{%name}');

        this.countryData.forEach(ele => {
            mapCountryColors.tooltip().format(
                `Risk: {%RISK} 
                    \nSuppliers: {%numSuppliers}`
            );
            dotMarkers.tooltip().format('Location: {%city} \nRating: {%Value}');
        });

        mapCountryColors.tooltip().titleFormat('{%name}');

        let colorRange = this.map.colorRange();
        colorRange.enabled(true);
        mapCountryColors.colorScale(anychart.scales.linearColor('#2EEEF0', '#FEA500', '#F63B01'));
        mapCountryColors.stroke('#999 .1');

        this.map.container('worldmap');
        this.map.title('Suppliers Around The World');
        this.map.draw();

        var zoomController = anychart.ui.zoom();
        zoomController.target(this.map);
        zoomController.render();
    }
}
