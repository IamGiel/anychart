import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { AccountInfoService } from './account-info.service';
import { LoginService } from 'app/core/login/login.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { FetchData } from '../../common/service/fetch-data';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ClaimProfileService } from '../claim-profile/claim-profile.service';

@Component({
    selector: 'jhi-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['../account-info/account-info.css']
})
export class AccountInfoComponent implements OnInit, OnDestroy {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    companyName: any;
    completedForm: boolean = true;
    err: boolean = false;
    errMsg: string;
    acountInfoForm: FormGroup;
    submitted = false;
    userExist: boolean = false;
    publicDomain: boolean = false;
    countries: any[];
    country: string;
    cityName: String = '';
    dunsNumber: String = '';
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private localStorage: LocalStoreService,
        private request: AccountInfoService,
        private loginService: LoginService,
        private customPiwik: CustomPiwik,
        private fetchData: FetchData,
        private config: NgSelectConfig,
        private req: ClaimProfileService
    ) {
        this.config.notFoundText = 'Not Found';
    }

    ngOnInit() {
        this.bodyTag.classList.add('supplier-body');
        this.bodyTag.classList.remove('procurement-body');
        this.acountInfoForm = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            country: ['', Validators.required]
        });
        this.fetchData.getSignUpCountries().subscribe(res => {
            this.countries = res;
        });
        /*  this.fetchData.getAccountInfo(this.localStorage.getLocalInfo('uuid')).subscribe(response => {
            let patch: any = {};
            if (response != undefined) {
                if (response.contactName != undefined) {
                    patch.name = response.contactName != null ? response.contactName : '';
                }
                if (response.contactEmail != undefined) {
                    patch.email = response.contactEmail != null ? response.contactEmail : '';
                }
            }
            this.acountInfoForm.patchValue(patch);
        }); */
    }
    get f() {
        return this.acountInfoForm.controls;
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.remove('supplier-body');
    }
    selectCountry(c) {
        this.country = c;
    }
    createUser() {
        this.submitted = true;
        if (this.acountInfoForm.invalid) {
            return;
        } else {
            //let formData = this.acountInfoForm.value;
            let arr = this.acountInfoForm.value.name.split(' ');
            let fName = arr.shift();
            let LName = arr.join(' ');
            const formData = {
                email: this.acountInfoForm.value.email,
                firstName: fName,
                lastName: LName,
                companyName: this.localStorage.getLocalInfo('claimCompanyname'),
                password: this.acountInfoForm.value.password,
                title: this.acountInfoForm.value.title,
                country: this.country
                // roles: ['SUPPLIER']  //mandatory
            };
            return this.request
                .createUserRequest(formData)
                .toPromise()
                .then(response => {
                    console.log(response.body);
                    this.customPiwik.setCustomData(
                        'userId',
                        'supplier/accountInfo/createUser/email/' + encodeURIComponent(this.acountInfoForm.value.email) + '/success',
                        window.location.href
                    );
                    this.autoLogin(formData.email, formData.password);
                })
                .catch(res => {
                    console.log(res);
                    this.err = true;
                    //    / this.errMsg = err.error.value || err.value;

                    if (res != undefined && res.error != undefined && res.error.signUpError !== undefined) {
                        if (res.error.signUpError == 'Account with email already exists') {
                            this.userExist = true;
                            this.errMsg = 'Supplier User with login ' + "'" + formData.email + "'" + ' already exists';
                        } else if (res.error.signUpError == 'Public domian email not allowed') {
                            this.publicDomain = true;
                        } else {
                            this.errMsg = res.error.signUpError;
                        }
                    } else if (res != undefined && res.signUpError !== undefined) {
                        if (res.signUpError == 'Account with email already exists') {
                            this.userExist = true;
                            this.errMsg = 'Supplier User with login ' + "'" + formData.email + "'" + ' already exists';
                        } else if (res.signUpError == 'Public domian email not allowed') {
                            this.publicDomain = true;
                        } else {
                            this.errMsg = res.signUpError;
                        }
                    } else {
                        this.errMsg = 'Error occured while user registration';
                    }

                    this.customPiwik.setCustomData(
                        'userId',
                        'supplier/accountInfo/createUser/email/' + encodeURIComponent(this.acountInfoForm.value.email) + '/fail',
                        window.location.href
                    );
                    // this.autoLogin();
                });
        }
    }
    autoLogin(email, password) {
        //this.loginService.logout();
        this.loginService
            .login({
                username: this.acountInfoForm.value.email,
                password: this.acountInfoForm.value.password
                //username: email,
                //password: password
            })
            .then(() => {
                this.claimProfile();
            })
            .catch(() => {
                event.preventDefault();
            });
    }

    claimProfile() {
        /*  this.req
            .getProfileRequest(this.localStorage.getLocalInfo('uuid'))
            .toPromise()
            .then(response => {
                console.log(response.body);
                let data = response.body['data'][0];
                // this.router.navigate(['/supplier/pending-requests']);
                this.companyName = data.business_name;
                this.cityName = data.mailing_city_name + ',' + data.mailing_country_name;
                this.dunsNumber = data.duns_number;

               
            })
            .catch(err => {
                console.log(err);
            }); */

        this.fetchData.claimSupplier(this.localStorage.getLocalInfo('uuid')).subscribe(
            () => {
                // this.localStorage.storeLocalInfo('claimCompanyname', this.companyName);
                this.customPiwik.setCustomData('userId', 'supplier/claimProfile/claimProfile/click', window.location.href);
                this.router.navigate(['/supplier/pending-requests']);
            },
            res => {
                this.router.navigate(['/supplier/pending-requests']);
            }
        );
    }
    gotoLogin() {
        this.customPiwik.setCustomData('userId', 'supplier/accountInfo/login/click', window.location.href);
        this.router.navigate(['/login']);
    }
}
