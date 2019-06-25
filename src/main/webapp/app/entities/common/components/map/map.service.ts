import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    mapData: any;
    locationData: any;
    constructor(private http: HttpClient) {
        this.mapData = require('../../../../mock-data/mapEnvironmentPI.json');
        this.locationData = require('../../../../mock-data/mapLocationsData.json');
    }

    getCountrydata() {
        return this.http.get('src/main/webapp/app/mock-data/mapdata.json');
    }
}
