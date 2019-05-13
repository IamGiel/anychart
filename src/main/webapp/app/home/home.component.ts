import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';

import { LoginModalService, Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    constructor(
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
    
        console.log(this.principal.isAuthenticated());
        this.principal.identity().then(account => {
            this.account = account;
        });
        console.log(this.account);
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    welcome() {
        // alert('testing');
        console.log('welcome route');
        // this.router.navigateByUrl('/welcome');
    }
    getStarted() {
        console.log('welcome-supplier route');
    }

    welcomeProc() {
        // this.isNavbarCollapsed = true;
        this.router.navigateByUrl('/procurement/intro').then(
            nav => {
                console.log('navigated success ', nav); // true if navigation is successful
            },
            err => {
                console.log('errored from home page ', err); // when there's an error
            }
        );
    }
    welcomeSup() {
        // this.isNavbarCollapsed = true;
        this.router.navigateByUrl('/procurement/intro').then(
            nav => {
                console.log('navigated success ', nav); // true if navigation is successful
            },
            err => {
                console.log('errored from home page ', err); // when there's an error
            }
        );
    }

    welcomeComp() {
        // this.isNavbarCollapsed = true;
        this.router.navigateByUrl('/supplier/intro').then(
            nav => {
                console.log('navigated success ', nav); // true if navigation is successful
            },
            err => {
                console.log('errored from home page ', err); // when there's an error
            }
        );
    }
}
