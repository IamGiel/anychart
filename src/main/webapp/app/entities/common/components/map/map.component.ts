import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { MapService } from './map.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit {
    //countryData: any;
    @Input('chartData') chartData;
    @Input('locationData') locationData;
    @Input() id: string;

    map = anychart.map();
    text;

    mapdata: any[] = [];

    locations: any[] = [];

    countryData: any[] = [];

    earthquakeData: any[] = [];

    constructor(private mapService: MapService) {}

    ngOnChanges() {
        console.log('whats in chartdata ', this.locationData);
        switch (this.locationData) {
            case 'Site Location':
                // this.locations = this.mapService.locationData.SiteLocations;
                this.locations = this.mapService.suppliersOnMap.SiteLocations;
                break;

            case 'HQ Location':
                // this.locations = this.mapService.locationData.HQLocations;
                this.locations = this.mapService.suppliersOnMap.HQLocations;
                console.log(this.locations);
                break;

            default:
                // this.locations = this.mapService.locationData.HQLocations;
                this.locations = this.mapService.suppliersOnMap.HQLocations;
                console.log(this.locations);
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
        this.ngAfterViewInit();
    }
    num;
    arr = [];

    ngOnInit() {
        console.log('hers random lat and long', this.arr);
    }

    ngAfterViewInit() {
        this.map.geoData('anychart.maps.world');

        // let series2 = this.map.choropleth(this.countryData);
        // let dotMarkers = this.map.marker(this.mapService.suppliersOnMap.data[0].suppliers);
        // let numberOfSuppliers = this.map.choropleth(this.mapService.numberOfSuppliers.data);
        let dotMarkers = this.map.marker(this.locations);
        let mapCountryColors = this.map.choropleth(this.countryData);
        dotMarkers.labels(false);
        // set the colors of the CITRUS series
        dotMarkers.stroke('#6B4CD9');
        dotMarkers.fill('#F0EDFB');

        // set the size of CITRUS markers
        dotMarkers.normal().size(2);
        dotMarkers.hovered().size(4);
        dotMarkers.selected().size(10);
        // console.log('this is series 3 ', this.mapService.suppliersOnMap.data[0].suppliers);

        mapCountryColors.labels().format('{%name}');

        this.countryData.forEach(ele => {
            mapCountryColors.tooltip().format(`Risk: {%RISK} \nSuppliers: {%numSuppliers} `);
            dotMarkers.tooltip().title(true);
            dotMarkers.tooltip().titleFormat('Supplier Name: {%Name} ');
            dotMarkers.tooltip().format('Location: {%city}');
        });

        // data
        // let levelsData = [
        //     ["High ", 10],
        //     ["Medium", 5],
        //     ["Low", 1]
        // ];
        // this.map.legend(true);

        mapCountryColors.tooltip().titleFormat('{%Name}');

        let colorRange = this.map.colorRange();
        colorRange.enabled(false);
        mapCountryColors.colorScale(anychart.scales.linearColor('#31D490', '#FFBE45', '#FF4F61'));
        mapCountryColors.stroke('#D2C9F3 .5');
        mapCountryColors.hovered().fill('#D2C9F3');
        mapCountryColors.selected().fill('#A694E8');

        this.map.container('worldmap');
        // this.map.title('Suppliers Around The World');
        this.map.draw();

        var zoomController = anychart.ui.zoom();
        zoomController.target(this.map);
        zoomController.render();

        // set zoom
        // let clicked = true;
        // this.map.listen("click", ($event:MouseEvent) => {
        //     if (clicked) {
        //         console.log(`test `)
        //         this.map.zoomTo(3, $event.clientX, $event.clientY);
        //     }
        //     else {
        //         this.map.zoomTo(0, $event.clientX, $event.clientY);
        //     }
        //     clicked = !clicked;
        // });
    }
}
