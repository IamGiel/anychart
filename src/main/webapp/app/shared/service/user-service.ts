import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    fileUpload(formData: any): Observable<HttpResponse<any>> {
        console.log('callsed' + formData);
        return this.http.post(SERVER_API_URL + 'api/fileupload', formData, { observe: 'response' });
    }
    downloadSample(): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/get-gui-configs', { observe: 'response' });
    }
    getState(): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'usermanagement/api/getUserStates', { observe: 'response' });
    }
}
