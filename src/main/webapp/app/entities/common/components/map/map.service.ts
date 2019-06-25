import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    constructor(private http: HttpClient) {}

    getCountrydata() {
        return this.http.get('src/main/webapp/app/mock-data/mapdata.json');
    }
}
