import { Component, OnInit, AfterViewInit, Renderer, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JhiLanguageService } from 'ng-jhipster';
import { FormsModule } from '@angular/forms';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService } from 'app/core';
import { Register } from './register.service';
import { FetchData } from '../../entities/common/service/fetch-data';
import { NgSelectConfig } from '@ng-select/ng-select';

import { TCModalService } from '../../entities/common/components/terms-conditions/terms-conditions.modal.service';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyModalComponent } from '../../entities/common/modals/privacy-policy-modal/privacy-policy-modal.component';
import { CookiePolicyModalComponent } from '../../entities/common/modals/cookie-policy-modal/cookie-policy-modal.component';

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html',
    styleUrls: ['../login/login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, AfterViewInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    loginType: string = 'proc';
    fullurl: string;
    payload: any = {};
    countries: any = [];
    showPass = false;
    showPassc = false;
    message = '';
    firstName: any;
    isPrivacyOpen = false;
    isCookieOpen = false;
    termsAccepted = false;

    constructor(
        private languageService: JhiLanguageService,
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private TCModalService: TCModalService,
        private fetchData: FetchData,
        private modalService: NgbModal,
        private config: NgSelectConfig
    ) {
        this.config.notFoundText = 'Not Found';
    }

    ngOnInit() {
        this.message = '';
        this.success = false;
        this.registerAccount = {};
        this.fullurl = window.location.hostname;
        if (this.fullurl.indexOf('compliance.live') !== -1) {
            this.loginType = 'proc';
        }
        if (this.fullurl.indexOf('supplier.live') !== -1) {
            this.loginType = 'sup';
        }

        this.fetchData.getSignUpCountries().subscribe(res => {
            this.countries = res;
        });
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        if (this.payload.password !== this.payload.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.languageService.getCurrent().then(key => {
                this.registerAccount.langKey = key;
                this.registerService.save(this.registerAccount).subscribe(
                    () => {
                        this.success = true;
                    },
                    response => this.processError(response)
                );
            });
        }
    }

    signup() {
        let value = this.loginType == 'sup' ? 'supplier' : 'procurement';
        value = 'procurement';
        this.fetchData.registerUser(this.payload, value).subscribe(
            res => {
                this.success = true;
                this.message = '';
            },
            res => {
                if (res != undefined && res.error != undefined && res.error.signUpError !== undefined) {
                    this.message = res.error.signUpError;
                } else if (res != undefined && res.signUpError !== undefined) {
                    this.message = res.signUpError;
                } else {
                    this.message = 'Error occured while user registration';
                }
            }
        );
    }

    checkPassword() {
        if (this.payload.password != undefined && this.payload.confirmPassword != undefined) {
            if (this.payload.password == this.payload.confirmPassword) {
                if (this.message == "Entered passwords don't match.") {
                    this.message = '';
                }
            } else {
                this.message = "Entered passwords don't match.";
            }
        }
    }

    selectCountry(country) {
        this.payload.country = country;
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = false;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.error = 'User already exists';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }

    showPwd() {
        if (this.showPass) {
            this.showPass = false;
        } else {
            this.showPass = true;
        }
    }

    showPwdc() {
        if (this.showPassc) {
            this.showPassc = false;
        } else {
            this.showPassc = true;
        }
    }
    openPrivacy() {
        if (this.isPrivacyOpen) {
            return;
        }
        this.isPrivacyOpen = true;
        const modalRef = this.modalService.open(PrivacyPolicyModalComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isPrivacyOpen = false;
            },
            reason => {
                this.isPrivacyOpen = false;
            }
        );
        return modalRef;
    }

    openCookie() {
        if (this.isCookieOpen) {
            return;
        }
        this.isCookieOpen = true;
        const modalRef = this.modalService.open(CookiePolicyModalComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isCookieOpen = false;
            },
            reason => {
                this.isCookieOpen = false;
            }
        );
        return modalRef;
    }

    openTerms() {
        this.modalRef = this.TCModalService.open();
    }
}
