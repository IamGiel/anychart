import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RestEndpointConstants } from '../../common/constants/rest-endpoints';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable({
    providedIn: 'root'
})
export class ServiceEndpoints {
    endpoints = {};
    serviceEndpointsList = RestEndpointConstants.RestEndpoints.endpoints;
    
    constructor(private http: HttpClient) {
    }
   
    defineEndpoint( name?, url?, method?, requestHeader?:HttpHeaders) {
            const httpRequest =this.http;
            let finalUrl: any;
            this.endpoints[ name ] = {
                name: name,
                url: url,
                method: method,
                makeRequest: function( payload?, parameter?, formData?, requestHeader?, transform? ) {
                    if (parameter !== undefined && parameter !== null) {
                         finalUrl = SERVER_API_URL + url.replace('{parameter}',parameter);
                    }else {
                        finalUrl = SERVER_API_URL + url;
                    }
                    payload = payload || {};
                    let options: any = {};
        
                    if(transform) {
                        options.responseType = 'text'; 
                    }

                    if(requestHeader!=undefined && requestHeader!=null) {
                        options.headers = requestHeader;
                    }
                   
                    if (method === 'get') { 
                        return httpRequest.get(finalUrl,options);
                    }

                    if (method === 'post') { 
                        return httpRequest.post(finalUrl,payload,options);
                    }

                    if (method === 'put') { 
                        return httpRequest.put(finalUrl,payload,options);
                    }

                    if (method === 'delete') { 
                        return httpRequest.delete(finalUrl,options);
                    }
                }
            };
    }

    init(headers?: HttpHeaders): any{

        if (Object.keys(this.endpoints).length>0) {
            return this.endpoints;
        } 
        this.serviceEndpointsList = RestEndpointConstants.RestEndpoints.endpoints;
        for ( let i = this.serviceEndpointsList.length - 1; i >= 0; i-- ) {
            this.defineEndpoint( this.serviceEndpointsList[ i ].name, this.serviceEndpointsList[ i ].url,
                this.serviceEndpointsList[ i ].method, headers);
        }
        return this.endpoints;
    }
}