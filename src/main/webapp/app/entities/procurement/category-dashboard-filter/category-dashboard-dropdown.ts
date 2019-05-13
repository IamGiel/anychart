// pagination.component.ts
import { Component, OnInit, EventEmitter, ChangeDetectorRef, Input, ViewEncapsulation} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { FetchData } from '../../common/service/fetch-data';
import { CDFService } from '../../procurement/category-dashboard-filter/category-dashboard-filter.service';
@Component({
    selector: 'jhi-category-dashboard-dropdown',
    templateUrl: './category-dashboard-dropdown.html',
    styleUrls: ['./category-dashboard-filter.css'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryDashbordDropdownComponent implements OnInit {
    @Input('filters') filters: any;
    @Input('name') filterConstants: string[];
    @Input('selector') selector: string;
    @Input('title') title: string;
    //filters: any = { empty: null,  companies:[], supplierEmails:[],suppliers: [], categoryManagers: [], end: {}, size: null, from: {}, search: {} };
    typing = false;
    j = JSON;
    onCall = false;
    /* supplierSearch = '';
    categoryManagersSearch = '';
    supplierEmailsSearch = ''; */
    selectOptions: any = {};
    ngSelected: any = {};
    searching = false;
    //filterConstants=['supplierEmails','suppliers','categoryManagers','companies']
    
    constructor(public cdfs: CDFService, public activeModal: NgbActiveModal, private fetchData: FetchData, private cd: ChangeDetectorRef) {
        this.selectOptions = [
            {
                name: 'Select',
                value: null
            },
            {
                name: 'Yes',
                value: true
            },
            {
                name: 'No',
                value: false
            }
        ];
        
        for (var x in this.filterConstants){
            let type = this.filterConstants[x];
            this.ngSelected[type] = []
        }
    /*     this.ngSelected.categoryManagers = [];
        this.ngSelected.suppliers = [];
        this.ngSelected.supplierEmails=[]; */
    }

    onClear(type) {
        this.filters[type].forEach(e => {
            e.checked = false;
        });
        this.ngSelected[type] = [];
    }

    setNgSelect(type) {
        if (this.filters[type] != undefined) {
            this.ngSelected[type] = this.filters[type].filter(f => f.checked).map(m => {
                return type == 'categoryManagers' ? m.categoryManagers : m.name;
            });
        }
    }

    onAdd(e, t, s) {
        console.log(e);
        this.filters[t].forEach(o => {
            if (o[s] == e[s]) {
                o.checked = true;
            }
        });
    }
    onRemove(e, t, s) {
        console.log(e);
        this.filters[t].forEach(o => {
            if (o[s] == e.label) {
                o.checked = false;
            }
        });
    }
    ngOnInit() {

        for (var x in this.filterConstants){
            let type = this.filterConstants[x];
            this.cdfs.clearBackup(type);
        }
        
        /*
        this.cdfs.clearBackup('suppliers');
        this.cdfs.clearBackup('categoryManagers');
        this.cdfs.clearBackup('supplierEmails');
        */
        

        this.filters.size = this.copy(this.cdfs.getFilters()).size;
        this.filters.empty = this.copy(this.cdfs.getFilters()).empty;

        for (var x in this.filterConstants){
            let type = this.filterConstants[x];
            this.filters.end[type] = this.copy(this.cdfs.getFilters()).end[type];
            this.filters[type] = this.copy(this.cdfs.getFilters())[type];
            this.filters.from[type] = this.copy(this.cdfs.getFilters()).from[type];
            this.filters.search[type] = this.copy(this.cdfs.getFilters()).search[type];
            this.setNgSelect(type);
            if (this.filters[type].length == 0) {
                this.filters.end[type] = '';
                this.filters.from[type] = '';
                this.filters.search[type] = '';
                this.init(type);
            }
        }
/* 
        this.filters.end.suppliers = this.copy(this.cdfs.getFilters()).end.suppliers;
        this.filters.suppliers = this.copy(this.cdfs.getFilters()).suppliers;
        this.filters.from.suppliers = this.copy(this.cdfs.getFilters()).from.suppliers;
        this.filters.search.suppliers = this.copy(this.cdfs.getFilters()).search.suppliers;
        this.setNgSelect('suppliers');
        if (this.filters.suppliers.length == 0) {
            this.filters.end.suppliers = '';
            this.filters.from.suppliers = '';
            this.filters.search.suppliers = '';
            this.init('suppliers');
        }

        this.filters.end.categoryManagers = this.copy(this.cdfs.getFilters()).end.categoryManagers;
        this.filters.categoryManagers = this.copy(this.cdfs.getFilters()).categoryManagers;
        this.filters.from.categoryManagers = this.copy(this.cdfs.getFilters()).from.categoryManagers;
        this.filters.search.categoryManagers = this.copy(this.cdfs.getFilters()).search.categoryManagers;
        this.setNgSelect('categoryManagers');
        if (this.filters.categoryManagers.length == 0) {
            this.filters.end.categoryManagers = '';
            this.filters.from.categoryManagers = '';
            this.filters.search.categoryManagers = '';
            this.init('categoryManagers');
        }

        this.filters.end.supplierEmails = this.copy(this.cdfs.getFilters()).end.supplierEmails;
        this.filters.supplierEmails = this.copy(this.cdfs.getFilters()).supplierEmails;
        this.filters.from.supplierEmails = this.copy(this.cdfs.getFilters()).from.supplierEmails;
        this.filters.search.supplierEmails = this.copy(this.cdfs.getFilters()).search.supplierEmails;
        this.setNgSelect('supplierEmails');
        if (this.filters.supplierEmails.length == 0) {
            this.filters.end.supplierEmails = '';
            this.filters.from.supplierEmails = '';
            this.filters.search.supplierEmails = '';
            this.init('supplierEmails');
        } */
    }

    copy(o) {
        return JSON.parse(JSON.stringify(o));
    }

    init(type) {
        if (this.filters[type] == undefined) {
            return;
        }
        this.cdfs.init(type).subscribe(res => {
            this.filters[type] = this.filters[type].concat(res);
            this.cdfs.initFilters(this.copy(this.filters));
            if (res.length < this.filters.size) {
                this.filters.end[type] = true;
                this.cdfs.setEnd(type, this.filters.end[type]);
            }
            this.setNgSelect(type);
        });
    }
    onScrollToEnd(type) {
        if (!this.filters.end[type] && this.filters[type].length > 0) {
            this.onScroll(type);
        }
    }

    onScroll(type) {
        let name = '';
        if (type != 'categoryManagers') {
            name = this.cdfs.getLastFilter(type, this.filters).name;
        }
        if (type == 'categoryManagers') {
            name = this.cdfs.getLastFilter(type, this.filters).categoryManagers;
        }
        this.searching = true;
        this.cdfs.nextPage(type, name, this.filters.search[type]).subscribe(
            res => {
                if (res != undefined && res != null) {
                    this.filters[type] = this.filters[type].concat(res);
                } else {
                    this.filters.end[type] = true;
                }
                this.setNgSelect(type);
                this.searching = false;
            },
            err => {
                this.filters.end[type] = true;
                this.searching = false;
            }
        );
    }
    clear() {

        
       /*  this.filters.search.suppliers = '';
        this.filters.search.categoryManagers = ''; */

        for (var x in this.filterConstants){
            let type = this.filterConstants[x];

            this.filters.search[type] = '';

            this.cdfs.clearBackup(type);
            this.cdfs.clearBackup(type);
            this.cdfs.clearBackup(type);
            
            this.onchange(type);
            this.onchange(type);
            this.onchange(type);
        }
   /*      this.cdfs.clearBackup('suppliers');
        this.cdfs.clearBackup('categoryManagers');
        this.cdfs.clearBackup('supplierEmails');
        
        this.onchange('suppliers');
        this.onchange('categoryManagers');
        this.onchange('supplierEmails'); */

        this.cdfs.setFilters(this.filters);
        this.cdfs.clearFilters();
        this.activeModal.dismiss('dismissed');
    }

    showResult(filterForm: NgForm) {
        this.cdfs.updateFilters(this.filters);
        this.close();
    }

    close() {
        this.activeModal.close('closed');
    }

    resetPagination(type) {
        this.filters.from[type] = '';
        this.filters.end[type] = false;
        this.filters[type] = [];
        this.setNgSelect(type);
    }

    onchange(type) {
        console.log(type)
        console.log(this.filters.search[type]);
        //when search is cleared
        if (this.filters.search[type].length == 0) {
            //If back-up found, use back-up and clear back-up
            if (this.cdfs.getBackup()[type].length > 0) {
                this.filters.search[type] = '';
                this.filters.from[type] = this.copy(this.cdfs.getBackup()).from[type];
                this.filters.end[type] = this.copy(this.cdfs.getBackup()).end[type];
                this.filters[type] = this.copy(this.cdfs.getBackup())[type];
                this.setNgSelect(type);
                this.cdfs.clearBackup(type);
            } else {
                //When back-up not found, re initialize filters
                this.filters.search[type] = '';
                this.resetPagination(type);
                this.cdfs.nextPage(type, this.filters.from[type], this.filters.search[type]).subscribe(
                    res => {
                        this.filters[type] = this.filters[type].concat(res);
                        if (res.length < this.filters.size) {
                            this.filters.end[type] = true;
                        }
                        this.setNgSelect(type);
                    },
                    err => {
                        this.filters.end[type] = true;
                    }
                );
            }
        }
        //when search term is longer than 2 chars
        if (this.filters.search[type].length >= 2) {
            //If back-up not found, set back-up
            if (this.cdfs.getBackup()[type].length == 0) {
                this.cdfs.setBackup(type, this.copy(this.filters));
            }
            this.resetPagination(type);

            this.cdfs.setEnd(type, false);
            this.cdfs.setFrom(type, '');
            if (!this.searching) {
                this.searching = true;
                const currentSearch = this.filters.search[type];
                
                this.cdfs.nextPage(type, this.filters.from[type], this.filters.search[type]).subscribe(
                    res => {
                        if (res != undefined && res != null) {
                            this.filters[type] = this.filters[type].concat(res);
                            if (res.length < this.filters.size) {
                                this.filters.end[type] = true;
                            }
                        }
                        this.setNgSelect(type);
                        this.searching = false;
                        if (currentSearch != this.filters.search[type]) {
                            this.onchange(type);
                        }
                    },
                    err => {
                        this.filters.end[type] = true;
                        this.cdfs.setEnd(type, true);
                        this.searching = false;
                        if (currentSearch != this.filters.search[type]) {
                            this.onchange(type);
                        }
                    }
                );
            }
        }
    }
    getData(a, b) {}
}
