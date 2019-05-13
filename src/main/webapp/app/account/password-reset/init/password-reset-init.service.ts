import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseColorService } from '../../../entities/common/service/base-color-service';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class PasswordResetInitService {
    constructor(private http: HttpClient, private bcs: BaseColorService) {}

    save(mail: string): Observable<any> {
        return this.http.post(
            SERVER_API_URL + 'uaa/api/account/reset-password/init/' + mail,
            {},
            {
                responseType: 'text'
            }
        );
    }
}
