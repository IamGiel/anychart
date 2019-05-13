import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyListsService } from './company-list.service';
import { CartService } from '../../../shared/service/cart-service';
import { ICart, Cart } from 'app/shared/models/cart.model';
import { DashboardModal } from './dashboard.modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPiwik } from '../../common/service/custom-piwik';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../dashboard/dashboard.css']
})
export class DashboardComponent implements OnInit {
    backup: any = {};
    addedCount = 0;
    isSelectAll = false;
    checkedCount = 0;
    cartError = false;
    errMsg: string = '';
    activeTab: string;
    list: any;
    tempList: any;
    loadingData: boolean = true;
    loading = false;
    total = 0;
    page = 1;
    pageSize = 0;
    limit = 10;
    searchKeyword: string = '';
    serPop = 'The Supplier Evaluation Risk Rating (SER) is risk metric that helps supply management professionals evaluate the long term risk of doing business with a supplier. The SER score is based on a scale of 1-9, with 1 representing the lowest level of risk and 9 implying the highest level of risk. For suppliers whose headquarters are located outside the United States and Canada, the SER predicts the likelihood that a supplier will cease operations or reorganize without paying all creditors in full, or obtain relief from creditors under state/federal law over the next 12 months.The SER provides a consistent risk ranking across the globe.';
    paydexPop = `PAYDEX is Dun & Bradstreet's unique dollar-weighted numerical indicator of how a firm paid its bills over the    past year, based on trade experiences reported to D&B by various vendors. The D&B PAYDEX Score ranges
    from 1 to 100, with higher scores indicating better payment performance. The tables below demonstrate how
    the score correlates to payment behavior`;
    noPop = `This is placeholder`;
    constructor(
        private CLService: CompanyListsService,
        private cartService: CartService,
        private router: Router,
        private modalService: NgbModal,
        private customPiwik: CustomPiwik
    ) {}

    ngOnInit() {
        this.tabClicked('Pending');
    }
    tabClicked(tab) {
        this.searchKeyword = '';
        this.page = 1;
        if (this.activeTab !== tab) {
            //same tab click will not call api
            this.backup = {};
            this.getData(tab, '', true);
        }
        this.activeTab = tab;
    }
    getData(tab, search, savebackUp) {
        if (search.length == 0 && savebackUp && this.backup.page != undefined) {
            this.backup.page = this.page;
        }
        let param;
        this.loadingData = true;
        let tabData = tab.toLowerCase();
        this.pageSize = (this.page - 1) * this.limit;
        param = '&status=' + tabData + '&search=' + search + '&from=' + this.pageSize + '&size=' + this.limit;
        this.CLService.getAllRequest(param)
            .toPromise()
            .then(response => {
                this.list = response.body['data'];
                this.total = response.body['totalCounts'];
                //this.total=10;

                if (this.list !== null) {
                    this.tempList = this.list;
                    if (tab == 'Pending') {
                        let cart: ICart;
                        this.cartService.loadCart();
                        this.cartService.cart.subscribe(res => {
                            cart = res;
                            if (cart != null && cart.complianceReqIds !== undefined && cart.complianceReqIds !== null) {
                                this.list = this.list.map(p => {
                                    if (cart.complianceReqIds.indexOf(p.id) != -1) {
                                        p.addedToCart = true;
                                    }
                                    return p;
                                });
                            }
                        });
                    }
                }
                console.log(this.list);
                this.loadingData = false;

                if (this.isSelectAll) {
                    this.list = this.list.map(m => {
                        m.checked = true;
                        return m;
                    });
                }
                this.updateChecked();
                this.customPiwik.setCustomData(
                    'userId',
                    'supplier/dashboard/' + tabData + '/load/page/' + this.page + '/success',
                    window.location.href
                );
            })
            .catch(err => {
                let response: any = {};
                //alert('error block for dev');
                //dev code
                /*  let test ={"data":[{"addedToCart":true,"id":10,"requestId":"37a567de0ce345388c48bdbde5955e9f","supplierName":"IBM GLOBAL SYSTEMS INC","providerKey":{"DUNSNUMBER":"026912305"},"packages":[{"id":1,"name":"Financial Data","description":"This data will be visible on the supplier's profile in the dashboard.","status":"ACTIVE","priceRange":null,"dataPoints":[{"id":1,"name":"Supplier Evaluation Risk","code":"SER","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":2,"name":"D&B Rating Trend","code":"RTNG_TRND","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":3,"name":"CSRHub Rating","code":"CSRHub","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":4,"name":"RapidRating","code":"FHR","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":6,"name":"Payment & Paydex Details","code":"PIAP_STD","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null}]}],"userCompany":"Aricent","requestCount":1,"lastRequest":0,"status":"PENDING","regionName":"US","price":70.0,"comprStatus":null,"lastRequestedDate":"2018-12-05T11:10:51.334+0000","requestedDate":"2018-12-05T11:10:51.334+0000","packageResponse":{},"declineMessage":null,"declinedDate":null},
                            {"addedToCart":true,"id":11,"requestId":"37a567de0ce345388c48bdbde5955e9g","supplierName":"IBM GLOBAL SYSTEMS INCs","providerKey":{"DUNSNUMBER":"0269123051"},"packages":[{"id":1,"name":"Financial Data","description":"This data will be visible on the supplier's profile in the dashboard.","status":"ACTIVE","priceRange":null,"dataPoints":[{"id":1,"name":"Supplier Evaluation Risk","code":"SER","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":2,"name":"D&B Rating Trend","code":"RTNG_TRND","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":3,"name":"CSRHub Rating","code":"CSRHub","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":4,"name":"RapidRating","code":"FHR","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":6,"name":"Payment & Paydex Details","code":"PIAP_STD","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null}]}],"userCompany":"Aricent","requestCount":1,"lastRequest":0,"status":"PENDING","regionName":"US","price":70.0,"comprStatus":null,"lastRequestedDate":"2018-12-05T11:10:51.334+0000","requestedDate":"2018-12-05T11:10:51.334+0000","packageResponse":{},"declineMessage":null,"declinedDate":null},
                            {"addedToCart":true,"id":12,"requestId":"37a567de0ce345388c48bdbde5955e9g","supplierName":"IBM GLOBAL SYSTEMS INCs","providerKey":{"DUNSNUMBER":"0269123051"},"packages":[{"id":1,"name":"Financial Data","description":"This data will be visible on the supplier's profile in the dashboard.","status":"ACTIVE","priceRange":null,"dataPoints":[{"id":1,"name":"Supplier Evaluation Risk","code":"SER","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":2,"name":"D&B Rating Trend","code":"RTNG_TRND","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":3,"name":"CSRHub Rating","code":"CSRHub","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":4,"name":"RapidRating","code":"FHR","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":6,"name":"Payment & Paydex Details","code":"PIAP_STD","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null}]}],"userCompany":"Aricent","requestCount":1,"lastRequest":0,"status":"PENDING","regionName":"US","price":70.0,"comprStatus":null,"lastRequestedDate":"2018-12-05T11:10:51.334+0000","requestedDate":"2018-12-05T11:10:51.334+0000","packageResponse":{},"declineMessage":null,"declinedDate":null},
                            {"addedToCart":true,"id":13,"requestId":"37a567de0ce345388c48bdbde5955e9g","supplierName":"IBM GLOBAL SYSTEMS INCs","providerKey":{"DUNSNUMBER":"0269123051"},"packages":[{"id":1,"name":"Financial Data","description":"This data will be visible on the supplier's profile in the dashboard.","status":"ACTIVE","priceRange":null,"dataPoints":[{"id":1,"name":"Supplier Evaluation Risk","code":"SER","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":2,"name":"D&B Rating Trend","code":"RTNG_TRND","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":3,"name":"CSRHub Rating","code":"CSRHub","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":4,"name":"RapidRating","code":"FHR","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null},{"id":6,"name":"Payment & Paydex Details","code":"PIAP_STD","description":null,"details":null,"mandatory":null,"complianceAgencyTypeId":null}]}],"userCompany":"Aricent","requestCount":1,"lastRequest":0,"status":"PENDING","regionName":"US","price":70.0,"comprStatus":null,"lastRequestedDate":"2018-12-05T11:10:51.334+0000","requestedDate":"2018-12-05T11:10:51.334+0000","packageResponse":{},"declineMessage":null,"declinedDate":null},
                        ],
                        "totalCounts":2};
                            if(tab=='Pending'){
                                console.log(response);
                                    response.body = JSON.parse(JSON.stringify(test));
                                    console.log(response);
                            }
                            this.list = response.body['data'];
                            this.total = response.body['totalCounts'];
                            //this.total=10;
                            if (this.list !== null) {
                                this.tempList = this.list;
                                if (tab == 'Pending') {
                                    let cart: ICart;
                                    this.cartService.loadCart();
                                    this.cartService.cart.subscribe(res => {
                                        cart = res;
                                        if (cart != null && cart.complianceReqIds !== undefined && cart.complianceReqIds !== null) {
                                            this.list = this.list.map(p => {
                                                if (cart.complianceReqIds.indexOf(p.id) != -1) {
                                                    p.addedToCart = true;
                                                }
                                                return p;
                                            });
                                        }
                                    });
                                }
                            } 
                            console.log(this.list);
                            this.loadingData = false;
                            if(this.isSelectAll){
                    this.list = this.list.map(m=>{
                        m.checked = true;
                        return m;
                    });                   
                }
                this.updateChecked();  */
                //dev code
                console.log(err);
                this.loadingData = false;

                this.customPiwik.setCustomData(
                    'userId',
                    'supplier/dashboard/' + tabData + '/load/page/' + this.page + '/fail',
                    window.location.href
                );
            });
    }
    searchData(event, type) {
        let searchSharedValue = event.target.value.toLowerCase();
        this.searchKeyword = searchSharedValue;

        if (searchSharedValue != null) {
            const param = '&status=shared&search=' + searchSharedValue + '&from=0&size=10';
            this.page = 1;
            this.getData(type, searchSharedValue, false);
        }
    }
    goToPage(n: number): void {
        this.page = n;
        console.log(n);
        // this.getMessages();
    }

    onNext(): void {
        this.page++;
        console.log(this.page);
        this.callBackend(true);
        //this.getMessages();
    }

    onPrev(): void {
        this.page--;
        console.log(this.page);
        this.callBackend(true);
        //this.getMessages();
    }
    callBackend(savebackUp) {
        this.getData(this.activeTab, this.searchKeyword, savebackUp);
    }
    clearSearch() {
        this.searchKeyword = '';
        if (Object.keys(this.backup).length > 0) {
            this.page = this.backup.page;
            this.getData(this.activeTab, '', true);
        } else {
            this.page = 1;
            this.callBackend(true);
        }
    }
    public removeFromCart(item: any) {
        this.CLService.removeFromCart(item.id).subscribe(
            r => {
                item.addedToCart = false;
                this.cartService.loadCartCount();
                this.cartService.loadCart();
                this.customPiwik.setCustomData(
                    'userId',
                    'supplier/dashboard/cart/remove/item/' + item.id + '/success',
                    window.location.href
                );
                this.updateChecked();
            },
            err => {
                this.customPiwik.setCustomData('userId', 'supplier/dashboard/cart/remove/item/' + item.id + '/fail', window.location.href);
            }
        );
    }

    declineRequest(item) {
        let ids: any = [];
        ids[0] = item.id;
        this.openModal(ids, false);
        /* const param = {
            requestId: item.id,
            declinedMessage: 'declined'
        };

        this.CLService.declineRequest(param)
            .toPromise()
            .then(response => {
                item.declined = true;
            })
            .catch(err => {
                console.log(err);
            });*/
    }

    goToCompanyProfile(item) {
        this.customPiwik.setCustomData('userId', 'supplier/dashboard/goToCompanyProfile/click', window.location.href);

        this.router.navigate(['/supplier/supdetails', item.id, item.providerKey.DUNSNUMBER]);
    }
    onAddCartClicked(item) {
        const reqdata = [item.id];
        return this.CLService.AddCartRequest(reqdata)
            .toPromise()
            .then(response => {
                console.log(response.body);
                item.addedToCart = true;
                this.cartService.loadCartCount();
                this.cartService.loadCart();
                this.updateChecked();

                this.customPiwik.setCustomData('userId', 'supplier/dashboard/cart/add/items/' + reqdata + '/success', window.location.href);
            })
            .catch(err => {
                if (err.error.message !== undefined) {
                    this.cartError = true;
                    this.errMsg = err.error.message;
                    setTimeout(() => {
                        this.errMsg = '';
                    }, 5000);
                }
                this.customPiwik.setCustomData('userId', 'supplier/dashboard/cart/add/items/' + reqdata + '/fail', window.location.href);
            });
    }

    addMultipleToCart() {
        let ids = this.list
            .filter(f => {
                return f.checked && (f.addedToCart == undefined || !f.addedToCart);
            })
            .map(m => {
                return m.id;
            });
        const reqdata = ids;
        return this.CLService.AddCartRequest(reqdata)
            .toPromise()
            .then(response => {
                this.list = this.list.map(m => {
                    if (m.checked && reqdata.indexOf(m.id) !== -1) {
                        m.addedToCart = true;
                        m.checked = false;
                    }
                    return m;
                });
                this.updateChecked();
                this.cartService.loadCartCount();
                this.cartService.loadCart();
                this.customPiwik.setCustomData('userId', 'supplier/dashboard/cart/add/items/' + reqdata + '/success', window.location.href);
            })
            .catch(err => {
                if (err.error.message !== undefined) {
                    this.cartError = true;
                    this.errMsg = err.error.message;
                    setTimeout(() => {
                        this.errMsg = '';
                    }, 5000);
                }
                this.customPiwik.setCustomData('userId', 'supplier/dashboard/cart/add/items/' + reqdata + '/fail', window.location.href);
            });
    }

    declineMultiple() {
        let ids = this.list
            .filter(f => {
                return f.checked && (f.addedToCart == undefined || !f.addedToCart);
            })
            .map(m => {
                return m.id;
            });
        this.openModal(ids, true);
    }

    onClickPending() {
        this.tabClicked('Pending');
    }

    showOldDate(event) {
        if (event.target.value == '') {
            if (Object.keys(this.backup).length > 0) {
                this.page = this.backup.page;
            } else {
                this.page = 1;
            }
            // input is cleared then load last search eresult
            this.getData(this.activeTab, '', true);
        }
    }

    openModal(items, multiple) {
        const obj: any = { ids: items };
        const modalRef = this.modalService.open(DashboardModal, { centered: true, size: 'lg' });
        modalRef.componentInstance.data = obj;
        modalRef.result.then(data => {
            this.list = this.list.filter(f => {
                return items.indexOf(f.id) == -1;
            });
            if (multiple) {
                this.list = this.list.map(m => {
                    // m.checked = false;
                    return m;
                });
                this.updateChecked();
            }
        });
    }

    updateChecked() {
        this.checkedCount = this.list.filter(f => {
            return f.checked != undefined && f.checked == true;
        }).length;
        this.addedCount = this.list.filter(f => {
            return f.addedToCart != undefined && f.addedToCart == true && f.checked != undefined && f.checked == true;
        }).length;
        if (this.checkedCount != 0 && this.checkedCount == this.list.length) {
            this.isSelectAll = true;
        } else if (this.isSelectAll) {
            this.isSelectAll = false;
        }
    }

    selectAll(selectall) {
        this.isSelectAll = selectall;
        console.log('selectall');
        console.log(this.isSelectAll);
        if (this.list !== null) {
            this.list = this.list.map(m => {
                m.checked = this.isSelectAll;
                return m;
            });
            this.updateChecked();
        } else {
            this.checkedCount = 0;
            this.addedCount = 0;
        }
    }

    removeSelectedFromCart() {
        const selectedItems = this.list
            .filter(f => {
                return f.checked == true && f.addedToCart == true;
            })
            .map(m => {
                return m.id;
            });

        this.list = this.list.map(m => {
            if (selectedItems.indexOf(m.id) != -1) {
                m.addedToCart = false;
                m.checked = false;
            }
            return m;
        });
        this.updateChecked();
    }
}
