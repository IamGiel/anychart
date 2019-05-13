import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
//import { MatomoInjector } from 'ngx-matomo';
import { JhiLanguageHelper, Principal } from 'app/core';
import { Location } from '@angular/common';
import { BaseColorService } from '../../entities/common/service/base-color-service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit, OnDestroy {
    currentUrl: string;
    fullurl: string;
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    baseModule: string = '';
    baseClass: any = {};
    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        public router: Router,
        private location: Location,
        // private matomoInjector: MatomoInjector,
        private bcs: BaseColorService,
        private principal: Principal
    ) {
        // this.matomoInjector.init('http://52.214.108.202/piwik/', 1);
        console.log('main comp');
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'gatewayApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            console.log(this.bcs.isProc());
            this.baseModule = this.bcs.isProc();
            this.fullurl = window.location.hostname;
            if (window.location.href.indexOf(':8080') == -1) {
                this.currentUrl = this.location.path();
                if (this.fullurl.indexOf('compliance.live') !== -1) {
                    this.bcs.setProc('procurement');
                } else if (this.fullurl.indexOf('supplier.live') !== -1) {
                    this.bcs.setProc('supplier');
                } else {
                    this.bcs.setProc('default');
                }
            } else {
                if (this.location.path() !== '') {
                    this.currentUrl = this.location.path();
                    if (this.currentUrl.indexOf('/supplier') !== -1) {
                        this.bcs.setProc('supplier');
                    } else if (this.currentUrl.indexOf('/procurement') !== -1 || this.currentUrl.indexOf('/admin') !== -1) {
                        this.bcs.setProc('procurement');
                    } else {
                        this.bcs.setProc('default');
                    }
                } else {
                    this.bcs.setProc('default');
                }
            }
            this.bcs.setProc('procurement');

            if (event instanceof NavigationEnd) {
                this.baseClass = {};
                if (
                    window.location.href.indexOf(':8080') !== -1 &&
                    (event instanceof NavigationEnd && (event.url == '/login' || event.url == '/'))
                ) {
                    this.baseClass.loginCBG = true;
                } else {
                    this.baseClass.loginPBG =
                        this.fullurl.indexOf('supplier.live') !== -1 &&
                        (event instanceof NavigationEnd && (event.url == '/login' || event.url == '/'));
                    this.baseClass.loginCBG =
                        this.fullurl.indexOf('compliance.live') !== -1 &&
                        (event instanceof NavigationEnd && (event.url == '/login' || event.url == '/'));
                }
                this.baseClass[this.baseModule] = true;
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
                (<any>window).ga('set', 'page', event.urlAfterRedirects);
                (<any>window).ga('send', 'pageview');
            }
        });
    }
    ngOnDestroy() {}
}
