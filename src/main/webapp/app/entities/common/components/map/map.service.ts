import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    mapData: any;
    locationData: any;
    earthquakeData: any;
    socialData: any;
    constructor() {
        this.mapData = require('../../../../mock-data/mapEnvironmentPI.json');
        this.locationData = require('../../../../mock-data/mapLocationsData.json');
        this.earthquakeData = require('../../../../mock-data/mapEarthQuake.json');
        this.socialData = require('../../../../mock-data/mapSocialCompliance.json');
    }
}
