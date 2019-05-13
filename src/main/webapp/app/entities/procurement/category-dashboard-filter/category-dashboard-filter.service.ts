import { Injectable } from '@angular/core';
import { FetchData } from '../../common/service/fetch-data';
import { Observable, BehaviorSubject } from 'rxjs';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { LocalStoreService } from '../../../core/auth/local-storage.service';
@Injectable({ providedIn: 'root' })

//clear this service on user login
export class CDFService {
    filterConstants=['supplierSpends','supplierDuns','supplierEmails','suppliers','categoryManagers','companies','supplierCountries','supplierContacts','supplierAddresses','supplierCategories','supplierPhones'];
    private filters: any = {empty: null,end: { },size: 10,from: {},search: {},isEmpty:{}};
    private backup: any = {
        suppliers: [],
        categoryManagers: [],
        supplierEmails: [],
        companies:[],
        supplierCountries:[],
        supplierContacts:[],
        supplierAddresses:[],
        supplierCategories:[],
        supplierPhones:[],
        supplierDuns:[],
        supplierSpends:[],
        end: {},
        from: {},
        search: {}
    };
    mode: string;
    dataSource = new BehaviorSubject(this.filters);
    data = this.dataSource.asObservable();

    constructor(private fetchData: FetchData, private lc: LocalStoreService) {
        for(var x in this.filterConstants){
            let type = this.filterConstants[x];
            this.filters[type]=[];
            this.filters.end[type]=false;
            this.filters.from[type]='';
            this.filters.search[type]='';
            if(type!='companies'&&type!='suppliers'){
                this.filters.isEmpty[type]=false;
            }
        }
    }

    getFilters() {
        return this.filters;
    }

    init(type) {
        if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_PRODUCTS_TEAM_USER') >= 0) {
            this.mode = 'ProdTeam';
        }
        if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_CM_USER') >= 0) {
            this.mode = 'catMgr';
        }
        if (type == 'suppliers') {
            return this.fetchData.categoryManagerSupplierFilter(this.filters.size, null, null, this.mode);
        }
        if (type == 'categoryManagers') {
            return this.fetchData.categoryManagerFilter(this.filters.size, null, null, this.mode);
        }
        if (type == 'supplierEmails') {
            return this.fetchData.categoryManagerSupplierEmailFilter(this.filters.size, null, null, this.mode);
        }
        if (type == 'companies') {
            return this.fetchData.categoryManagerCompanyFilter(this.filters.size, null, null, this.mode);
        }
        if(type=='supplierCountries'){
            return this.fetchData.categoryManagerSupplierCountryFilter(this.filters.size, null, null, this.mode); 
        }
        if(type=='supplierContacts'){
            return this.fetchData.categoryManagerContactFilter(this.filters.size, null, null, this.mode); 
        }
        if(type=='supplierAddresses'){
            return this.fetchData.categoryManagerSupplierAddressFilter(this.filters.size, null, null, this.mode); 
        }
        if(type=='supplierCategories'){
            return this.fetchData.categoryManagerSupplierCategoryFilter(this.filters.size, null, null, this.mode); 
        }
        if(type=='supplierPhones'){
            return this.fetchData.categoryManagerSupplierPhoneFilter(this.filters.size, null, null, this.mode); 
        }
        if(type=='supplierDuns'){
            return this.fetchData.categoryManagerDunsNumberFilter(this.filters.size, null, null, this.mode); 
        }
        if(type=='supplierSpends'){
            return this.fetchData.categoryManagerSpendFilter(this.filters.size, null, null, this.mode); 
        }

    }

    setEnd(type, value) {
        if (this.filters.end[type] == undefined) {
            return;
        }
        this.filters.end[type] = value;
    }

    getBackup() {
        return this.backup;
    }

    clearBackup(type) {
        this.backup[type] = '';
        this.backup.end[type] = '';
        this.backup.search[type] = '';
    }

    clearFilters() {
        for (var x in this.filterConstants){
            let type = this.filterConstants[x];
            this.filters[type] = this.filters[type].map(m => {
                if (m.checked) {
                    m.checked = false;
                }
                return m;
            });
            if(this.filters.isEmpty[type]!=undefined){
                this.filters.isEmpty[type]=false;
            }
        }
        //old single empty filter
        this.filters.empty = null;
        //
        this.updateFilters(this.filters);
    }

    setFilters(filters) {
        this.filters = filters;
    }

    setBackup(type, filters) {
        this.backup[type] = filters[type];
        this.backup.end[type] = filters.end[type];
        this.backup.search[type] = filters.search[type];
    }

    setFrom(type, value) {
        if (this.filters.from[type] == undefined) {
            return;
        }
        this.filters.from[type] = value;
    }

    nextPage(type, from, search) {
        if (this.filters[type] == undefined) {
            return;
        }
        this.setFrom(type, from);
        if (this.filters.from[type] == undefined || from == undefined) {
            return;
        }
        if (type == 'suppliers') {
            return this.fetchData.categoryManagerSupplierFilter(this.filters.size, this.filters.from[type], search, this.mode);
        }
        if (type == 'categoryManagers') {
            return this.fetchData.categoryManagerFilter(this.filters.size, this.filters.from[type], search, this.mode);
        }

        if(type=='supplierEmails'){
            return this.fetchData.categoryManagerSupplierEmailFilter(this.filters.size, this.filters.from[type], search, this.mode);
            
        }
        if(type=='companies'){
            return this.fetchData.categoryManagerCompanyFilter(this.filters.size, this.filters.from[type], search, this.mode);
            
        }
        if(type=='supplierCountries'){
            return this.fetchData.categoryManagerSupplierCountryFilter(this.filters.size, this.filters.from[type], search, this.mode);
        }
        if(type=='supplierContacts'){
            return this.fetchData.categoryManagerContactFilter(this.filters.size, this.filters.from[type], search, this.mode);
        }
        if(type=='supplierAddresses'){
            return this.fetchData.categoryManagerSupplierAddressFilter(this.filters.size, this.filters.from[type], search, this.mode);
        }
        if(type=='supplierCategories'){
            return this.fetchData.categoryManagerSupplierCategoryFilter(this.filters.size, this.filters.from[type], search, this.mode);
        }
        if(type=='supplierPhones'){
            return this.fetchData.categoryManagerSupplierPhoneFilter(this.filters.size,this.filters.from[type], search, this.mode); 
        }
        if(type=='supplierDuns'){
            return this.fetchData.categoryManagerDunsNumberFilter(this.filters.size,this.filters.from[type], search, this.mode); 
        }
        if(type=='supplierSpends'){
            return this.fetchData.categoryManagerSpendFilter(this.filters.size,this.filters.from[type], search, this.mode); 
        }
    }

    getLastFilter(type, filters) {
        if (this.filters[type].length == 0 || this.filters[type] == undefined) {
            return '';
        }
        return filters[type].slice(-1)[0];
    }

    updateFilters(filters) {
        this.filters = filters;
        this.dataSource.next(this.filters);
    }

    initFilters(filters) {
        this.filters = filters;
    }
    
    append(type, arr) {
        if (this.filters[type] == undefined) {
            return;
        }
        this.filters[type] = this.filters[type].concat(arr);
    }
}
