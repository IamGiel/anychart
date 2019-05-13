import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BaseColorService {
    baseModule = 'procurement'; // 'supplier' 'default' 'procurement'
    showNavbar = true;

    constructor() {}

    setProc(data: string) {
        this.baseModule = data;
    }
    isProc() {
        return this.baseModule;
    }
    setNavbar(data: boolean) {
        this.showNavbar = data;
    }
    getNavbar() {
        return this.showNavbar;
    }
}
