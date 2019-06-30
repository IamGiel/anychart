import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    mapData: any;
    locationData: any;
    earthquakeData: any;
    socialData: any;
    environmentData: any;
    financialData: any;
    mapCountryRisk: any;
    mapBusinessIntegrity: any;
    suppliersOnMap: any;
    numberOfSuppliers: any;

    constructor() {
        this.mapData = require('../../../../mock-data/mapEnvironmentPI.json');
        this.locationData = require('../../../../mock-data/mapLocationsData.json');
        this.earthquakeData = require('../../../../mock-data/mapEarthQuake.json');
        this.socialData = require('../../../../mock-data/mapSocialCompliance.json');
        this.environmentData = require('../../../../mock-data/mapEnviormentalCompliance.json');
        this.financialData = require('../../../../mock-data/mapFinancialIntegrity.json');
        this.mapCountryRisk = require('../../../../mock-data/mapCountryRisk.json');
        this.mapBusinessIntegrity = require('../../../../mock-data/mapBusinessIntegrity.json');
        this.suppliersOnMap = require('../../../../mock-data/suppliersOnMap.json');
        this.numberOfSuppliers = require('../../../../mock-data/numberOfSuppliers.json');
    }
}
