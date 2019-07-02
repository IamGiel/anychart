import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { BaseColorService } from '../../entities/common/service/base-color-service';
import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { CartService } from '../../shared/service/cart-service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.css']
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    loggedUser: string = 'Hi John';
    cartCount: number;
    cartTotal: number;
    showCart: boolean;
    baseModule: string = '';
    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        public router: Router,
        private stateStorage: StateStorageService,
        private lc: LocalStoreService,
        private cartService: CartService,
        private bcs: BaseColorService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        //console.log('navbar-cart-const');
    }

    addStyleSheet() {
        const headID = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.id = 'widget_styles';
        headID.appendChild(link);
        // link.href = '../navbar/navbar-supplier.css';
    }

    ngOnInit() {
        this.baseModule = this.bcs.isProc();
        console.log(this.baseModule);
        if (this.isAuthenticated()) {
            this.cartService.cart.subscribe(res => {
                if (null != res) {
                    this.cartCount = res.requestCount;
                    this.cartTotal = res.totalPrice;
                }
            });
            this.cartService.loadCart();
        }

        //console.log('navbar-cart-init');
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.addStyleSheet();

        /*  this.principal.identity(true).then(account => {
            if(account.authorities.indexOf("ROLE_USER")>=0){
                this.showCart=true;
            }else{
                this.showCart=false;
            }
        });*/
    }
    /*ngAfterViewInit() {
        console.log('navbar-cart')
        if (this.lc.getLocalInfo('account') !== null && this.lc.getLocalInfo('account').authorities.indexOf('ROLE_USER') >= 0) {
            this.showCart = true;
            this.cartService.cart.subscribe(res => {
                if (null != res) {
                    this.cartCount = res.requestCount;
                    this.cartTotal = res.totalPrice;
                }
            });
            this.cartService.loadCart();
        } else {
            this.showCart = false;
        }
    }*/
    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
        this.router.navigateByUrl('/login').then(
            nav => {
                console.log('navigated to intro screen ', nav); // true if navigation is successful
            },
            err => {
                console.log('errored out on logo link to intro screen ', err); // when there's an error
            }
        );
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        console.log('logout');
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['/login']);
    }
    resetPassword() {
        this.router.navigate(['/password']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
    gotoState(url) {
        this.router.navigate(['/' + url]);
    }
    getUserName() {
        //console.log('called');
        if (this.lc.getLocalInfo('fname') != '' && this.lc.getLocalInfo('fname') != null) {
            // console.log('called' + this.lc.getLocalInfo('fname'));
            this.loggedUser = this.lc.getLocalInfo('fname');
        } else {
            this.loggedUser = 'Hi John';
        }
        return this.loggedUser;
    }
}
