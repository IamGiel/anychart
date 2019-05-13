import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
@Injectable({
    providedIn: 'root'
})
export class CompanyListsService {
    constructor(private http: HttpClient) {}
    getAllRequest(param): Observable<HttpResponse<Request>> {
        return this.http.get<Request>(SERVER_API_URL + 'compliance/api/search/compliance-requests?mode=supplier&action=latest' + param, {
            observe: 'response'
        });
    }
    declineRequest(reqData: any): Observable<HttpResponse<any>> {
        return this.http.put(SERVER_API_URL + 'compliance/api/compliance-requests/declined-status', reqData, {
            observe: 'response'
        });
    }
    AddCartRequest(reqData: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'compliance/api/carts', reqData, { observe: 'response' });
    }

    removeFromCart(id: number): Observable<any> {
        return this.http.delete(SERVER_API_URL + 'compliance/api/cart-items/' + id);
    }
    getCheckoutUrl(payload: any): Observable<HttpResponse<Request>> {
        return this.http.post<Request>(SERVER_API_URL + 'compliance/api/checkout', payload, {
            observe: 'response'
        });
    }
}
