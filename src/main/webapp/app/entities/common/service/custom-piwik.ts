import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServiceEndpoints } from './service-endpoints';
import { MatomoTracker } from 'ngx-matomo';

@Injectable({
    providedIn: 'root'
})
export class CustomPiwik {
    constructor(private matomoTracker: MatomoTracker) {}
    // constructor() {}

    setCustomData(userId, customUrl, ref) {
        // this.matomoTracker.setTrackerUrl('piwik_url');
        //   this.matomoTracker.setSiteId(1);
        //seting userUIID
        if (
            null == localStorage.getItem('userUUID') ||
            'null' == localStorage.getItem('userUUID') ||
            undefined == localStorage.getItem('userUUID') ||
            'undefined' == localStorage.getItem('userUUID')
        ) {
            userId = userId;
        } else {
            userId = localStorage.getItem('userUUID');
        }
        //console.log(window.location.href)
        /* this.matomoTracker.setReferrerUrl(ref);
        this.matomoTracker.setUserId(userId);
        this.matomoTracker.setCustomUrl(customUrl);
        this.matomoTracker.trackPageView();
        this.matomoTracker.enableLinkTracking(true);*/
        // this.matomoTracker.setCustomUrl(customUrl);
    }
}
