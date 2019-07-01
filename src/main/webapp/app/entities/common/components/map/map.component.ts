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

    mapdata: any[] = [];

    locations: any[] = [];

    countryData: any[] = [];

    earthquakeData: any[] = [];

    constructor(private mapService: MapService) {}

    ngOnChanges() {
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
        this.ngAfterViewInit();
    }

    ngOnInit() {
        // this.basicMap();
    }

    ngAfterViewInit() {
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
        let colorRange = this.map.colorRange();
        colorRange.enabled(true);
        series2.colorScale(anychart.scales.linearColor('#32D490', '#FFCB70', '#FF7273'));
        series2.stroke('#999 .1');

        this.map.container(this.id);
        this.map.draw();

        var zoomController = anychart.ui.zoom();
        zoomController.target(this.map);
        zoomController.render();
    }
}
