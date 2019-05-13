import { Component, AfterViewInit, Renderer, ElementRef, OnInit, AfterContentInit } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { Principal } from 'app/core/auth/principal.service';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { FetchData } from '../../entities/common/service/fetch-data';

import { Location } from '@angular/common';
//import { StringFormat } from '@angular/fire/storage/interfaces';
@Component({
    selector: 'jhi-login',
    templateUrl: './login.component.html',
    styleUrls: ['../login/login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, AfterContentInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    susername: string;
    spassword: string;
    fullname: string;
    public href: string = '';
    public showLoading: boolean = false;
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    loginType: string = 'proc';
    fullurl: string;
    currentUrl: string;
    checkRemeber: boolean = false;
    activeTab: string = 'Login';
    pwdToggle: boolean = false;
    baseClass: any;
    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private principal: Principal,
        private userRouteAccessService: UserRouteAccessService,
        private localStorage: LocalStoreService,
        private fetchData: FetchData,
        private http: HttpClient,
        private location: Location
    ) {
        this.credentials = {};
        this.showLoading = false;
        setTimeout(() => {
            /*this.principal.identity().then(account => {
                console.log(account);
                if (account) {
                    return principal.hasAnyAuthority(['ROLE_USER']).then(response => {
                        if (response) {
                            this.showLoading = true;
                            this.router.navigate(['procurement/dashboard']);
                            return true;
                        }
                    });
                }
            });*/
            if (this.stateStorageService.getInfo('account') != null || this.stateStorageService.getInfo('account') != undefined) {
                this.showLoading = true;
                if (this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_SUPPLIER_USER') >= 0) {
                    this.router.navigate(['supplier/dashboard']);
                } else if (
                    this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_CM_USER') >= 0 ||
                    this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_PRODUCTS_TEAM_USER') >= 0
                ) {
                    this.router.navigate(['procurement/category-dashboard']);
                } else if (
                    this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_PROCUREMENT_USER') >= 0 &&
                    (this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_PRODUCTS_TEAM_USER') == -1 ||
                        this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_CM_USER') == -1)
                ) {
                    this.router.navigate(['procurement/dashboard']);
                } else {
                    this.router.navigate(['/']);
                }
            }
        }, 200);
    }
    ngOnInit() {
        this.showLoading = true;
        this.href = this.router.url;
        this.fullurl = window.location.hostname;
        this.currentUrl = this.location.path();
        if (this.principal.isAuthenticated()) {
            location.reload();
        }

        if (this.fullurl.indexOf('compliance.live') !== -1) {
            this.loginType = 'proc';
        }
        if (this.fullurl.indexOf('supplier.live') !== -1) {
            this.loginType = 'sup';
        }

        if (this.href.indexOf('signup') != -1) {
            this.activeTab = 'SignUp';
        }
        this.loginType = 'proc';
        this.baseClass = {};
        this.baseClass.loginCBG = true;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.showLoading = false;
            //this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
        }, 200);
        //setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 200);
    }
    ngAfterContentInit() {}

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        /* this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;

                this.principal.identity().then(account => {
                    if (account == null) {
                        this.authenticationError = true;
                    }
                    if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                        this.router.navigate(['']);
                    }

                    this.eventManager.broadcast({
                        name: 'authenticationSuccess',
                        content: 'Sending Authentication Success'
                    });

                    // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                    // since login is succesful, go to stored previousState and clear previousState
                    const redirect = this.stateStorageService.getUrl();
                    if (redirect) {
                        this.stateStorageService.storeUrl(null);
                        this.router.navigate([redirect]);
                    } else {
                        if (
                            this.stateStorageService.getInfo('account') != null ||
                            this.stateStorageService.getInfo('account') != undefined
                        ) {
                            this.showLoading = true;
                            if (this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_SUPPLIER_USER') >= 0) {
                                this.router.navigate(['supplier/dashboard']);
                            } else if (
                                this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_CM_USER') >= 0 ||
                                this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_PRODUCTS_TEAM_USER') >= 0
                            ) {
                                this.router.navigate(['procurement/category-dashboard']);
                            } else if (
                                this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_PROCUREMENT_USER') >= 0 &&
                                (this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_PRODUCTS_TEAM_USER') == -1 ||
                                    this.stateStorageService.getInfo('account').authorities.indexOf('ROLE_CM_USER') == -1)
                            ) {
                                this.router.navigate(['procurement/dashboard']);
                            } else {
                                this.router.navigate(['/']);
                            }
                        }
                    }
                });
            })
            .catch(() => {
                event.preventDefault();
                this.authenticationError = true;
            });*/
        this.router.navigate(['procurement/dashboard']);
    }
    rememberMeCheck() {
        if (this.checkRemeber) {
            this.checkRemeber = false;
        } else {
            this.checkRemeber = true;
        }
    }
    tabChange(type) {
        this.activeTab = type;
        this.authenticationError = false;
    }
    showPwd() {
        if (this.pwdToggle) {
            this.pwdToggle = false;
        } else {
            this.pwdToggle = true;
        }
    }

    /* register() {
        this.router.navigate(['/register']);
    }*/
    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }
}
