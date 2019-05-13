import { Injectable } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { Router } from '@angular/router';
import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { JhiTrackerService } from '../tracker/tracker.service';
import { StateStorageService } from '../auth/state-storage.service';
import { LocalStoreService } from '../auth/local-storage.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        private languageService: JhiLanguageService,
        private principal: Principal,
        private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider,
        private router: Router,
        private stateStorageService: StateStorageService,
        private lc: LocalStoreService
    ) {}

    clearUserInfo() {
        const excludes = ['loglevel:webpack-dev-server'];
        for (let k in Object.keys) {
            if (!excludes.includes(k)) {
                localStorage.removeItem(k);
            }
        }
    }

    login(credentials, callback?) {
        this.clearUserInfo();

        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        // After the login the language will be changed to
                        // the language selected by the user during his registration
                        if (account !== null) {
                            this.languageService.changeLanguage(account.langKey);
                        }
                        this.stateStorageService.storeInfo('account', account);
                        this.lc.storeLocalInfo('email', account.email);
                        this.lc.storeLocalInfo('userId', account.id);
                        this.lc.storeLocalInfo('fname', account.firstName);
                        this.lc.storeLocalInfo('account', account);
                        // this.trackerService.sendActivity();
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    logout() {
        if (this.principal.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => this.principal.authenticate(null));
        } else {
            this.principal.authenticate(null);
        }
        this.stateStorageService.storeInfo('account', null);
        this.lc.storeLocalInfo('email', null);
        this.lc.storeLocalInfo('userId', null);
        this.lc.storeLocalInfo('fname', null);
        this.lc.clear();
        //location.reload();
        this.router.navigate(['login']);
    }
}
