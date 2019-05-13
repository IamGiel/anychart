import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class AccountInfoService {
    constructor(private http: HttpClient) {}
    createUserRequest(reqData: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'usermanagement/api/user?type=supplier', reqData, { observe: 'response' });
    }
}
