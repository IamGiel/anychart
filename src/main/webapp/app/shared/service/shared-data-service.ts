import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    private dataSource = new BehaviorSubject([]);
    currentData = this.dataSource.asObservable();

    constructor() {}

    shareData(data: any) {
        console.log(data);
        this.dataSource.next(data);
    }
}
