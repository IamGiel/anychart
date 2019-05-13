import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class RequestDataService {
    constructor(private http: HttpClient) {}

    fileUpload(formData: any): Observable<HttpResponse<any>> {
        console.log('callsed' + formData);
        return this.http.post(SERVER_API_URL + 'api/file/upload', formData, { observe: 'response' });
    }
    getActiveRequest(): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/active-compliance-packages', { observe: 'response' });
    }
    sendRequest(reqData: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'compliance/api/request-compliance-packages', reqData, { observe: 'response' });
    }
    sendtestRequest(reqData: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'usermanagement/api/user?type=supplier', reqData, { observe: 'response' });
    }
    /*sendRequest(reqData: any, reqDataId): Observable<HttpResponse<Request>> {
        console.log('callsed' + reqData);
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/addSelectedPackages/' + reqData + '/' + reqDataId, {
            observe: 'response'
        });
    }*/
}
