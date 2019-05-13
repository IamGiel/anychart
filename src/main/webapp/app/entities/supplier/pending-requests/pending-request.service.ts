import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class PendingRequestService {
    constructor(private http: HttpClient) {}
    AddCartRequest(reqData: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'compliance/api/carts', reqData, { observe: 'response' });
    }
    getPendingRequest(reqId: any): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/compliance-requests/packages?id=' + reqId, {
            observe: 'response'
        });
    }
}
