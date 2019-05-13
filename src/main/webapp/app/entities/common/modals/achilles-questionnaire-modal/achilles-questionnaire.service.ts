import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as util from 'util';
import { MockResponse } from '../../../../achilles/achilles-questions/achilles-mock-response';
import { FetchData } from '../../service/fetch-data';
import { SERVER_API_URL } from '../../../../app.constants';
import { CookieBackendService } from 'ngx-cookie';

@Injectable({ providedIn: 'root' })
export class AchillesQuestionnaireService {
    constructor(private http: HttpClient, private fetchdata: FetchData) {}

    backendData: any;
    requestId: any;

    postResponse(key: any): Observable<HttpResponse<any>> {
        console.log('calling from service ' + key);
        console.log(util.inspect(key));
        // '/api/question-response/{requestId}';
        return this.http.post(SERVER_API_URL + '/api/question-response/', key, { observe: 'response' });
    }
    getQuestion(): Observable<HttpResponse<Request>> {
        // '/api/question-response/{requestId}';
        return this.http.get<Request>(SERVER_API_URL + '/api/question-response/{requestId}', { observe: 'response' });
    }

    callBackend(id: any) {
        return this.fetchdata.getQuestionnaire(id);
    }
    saveData(r: any) {
        this.backendData = r;
    }

    getSavedData() {
        return this.backendData;
    }

    getRequestId() {
        return this.requestId;
    }

    setRequestId(r: any) {
        this.requestId = r;
    }
}
