import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class LocalStoreService {
    constructor(private $localStorage: LocalStorageService) {}
    storeLocalInfo(info, data) {
        return this.$localStorage.store(info, data);
    }
    getLocalInfo(info) {
        return this.$localStorage.retrieve(info);
    }
    clear() {
        return this.$localStorage.clear();
    }
}
