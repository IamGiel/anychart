import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
@Injectable({
    providedIn: 'root'
})
export class CategoryDashboardService {
    constructor(private http: HttpClient) {}

    getAllRequest(param): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/search/compliance-requests?mode=compliance&action=latest' + param, {
            observe: 'response'
        });
    }
    getSharedData(param): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/search/compliance-requests?mode=compliance&action=latest' + param, {
            observe: 'response'
        });
    }
    sendReminder(reqId: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'compliance/api/compliance-requests/' + reqId + '/reminder', null, {
            observe: 'response'
        });
    }
}
