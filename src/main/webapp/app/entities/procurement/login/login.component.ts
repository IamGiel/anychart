import { Component, OnInit, ElementRef, Renderer, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { Principal } from 'app/core/auth/principal.service';
import { CustomPiwik } from '../../common/service/custom-piwik';

@Component({
    selector: 'jhi-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    public href: string = '';
    public showLoading: boolean = true;
    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private principal: Principal,
        private userRouteAccessService: UserRouteAccessService,
        private customPiwik: CustomPiwik
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        this.bodyTag.classList.add('default-body');
        this.bodyTag.classList.remove('supplier-body');
        this.bodyTag.classList.remove('procurement-body');
        this.showLoading = true;
        this.href = this.router.url;
        console.log(this.router.url);
        console.log(this.principal.isAuthenticated());
        const principal = this.principal;

        setTimeout(() => {
            principal.identity().then(account => {
                console.log(account);
                if (account) {
                    return principal.hasAnyAuthority(['ROLE_USER']).then(response => {
                        if (response) {
                            this.showLoading = false;
                            this.router.navigate(['procurement/dashboard']);
                            return true;
                        }
                    });
                }
            });
        }, 200);
    }
    ngAfterViewInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;

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
                    this.router.navigate(['procurement/intro']);
                }
                this.customPiwik.setCustomData('userId', '/login/success', window.location.href);
            })
            .catch(() => {
                event.preventDefault();
                this.authenticationError = true;
                this.customPiwik.setCustomData('userId', '/login/fail', window.location.href);
            });
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.remove('default-body');
    }
}
