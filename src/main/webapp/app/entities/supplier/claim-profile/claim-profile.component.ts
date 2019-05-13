import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimProfileService } from './claim-profile.service';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { FetchData } from '../../common/service/fetch-data';

@Component({
    selector: 'jhi-claim-profile',
    templateUrl: './claim-profile.component.html',
    styleUrls: ['../claim-profile/claim-pofile.css']
})
export class ClaimProfileComponent implements OnInit, OnDestroy {
    companyName: String = '';
    cityName: String = '';
    dunsNumber: String = '';
    checked: boolean = false;
    uuid: string;
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    claimed = true;
    constructor(
        private customPiwik: CustomPiwik,
        private router: Router,
        private request: ClaimProfileService,
        private localStorage: LocalStoreService,
        private fetchData: FetchData
    ) {}

    ngOnInit() {
        this.uuid = this.localStorage.getLocalInfo('uuid');
        this.fetchData.checkSupplierClaim(this.uuid).subscribe(
            res => {
                this.router.navigate(['/supplier/pending-requests']);
            },
            () => {
                this.claimed = false;
            }
        );
        this.bodyTag.classList.add('supplier-body');
        this.bodyTag.classList.remove('procurement-body');
        const reqid = this.localStorage.getLocalInfo('uuid');
        return this.request
            .getProfileRequest(reqid)
            .toPromise()
            .then(response => {
                console.log(response.body);
                let data = response.body['data'][0];
                console.log(data);
                // this.router.navigate(['/supplier/pending-requests']);
                this.companyName = data.business_name;
                this.cityName = data.mailing_city_name + ',' + data.mailing_country_name;
                this.dunsNumber = data.duns_number;
            })
            .catch(err => {
                console.log(err);
            });
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.remove('supplier-body');
    }
    claimProfile() {
        this.fetchData.claimSupplier(this.uuid).subscribe(() => {
            this.localStorage.storeLocalInfo('claimCompanyname', this.companyName);
            this.customPiwik.setCustomData('userId', 'supplier/claimProfile/claimProfile/click', window.location.href);
            this.router.navigate(['/supplier/pending-requests']);
        });
    }
    checkboxChecked(event) {
        this.checked = event.target.checked;
    }
}
