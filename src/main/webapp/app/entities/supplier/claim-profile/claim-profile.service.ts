import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class ClaimProfileService {
    constructor(private http: HttpClient) {}
    getProfileRequest(reqId): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/search/compliance-requests/' + reqId + '/supplier', {
            observe: 'response'
        });
    }
}
