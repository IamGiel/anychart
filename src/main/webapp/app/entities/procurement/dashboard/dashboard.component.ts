import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../shared/service/shared-data-service';
import { analyzeAndValidateNgModules, toTypeScript } from '@angular/compiler';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { LocalStoreService } from '../../../core/auth/local-storage.service';
import { ProcurementFaqModalComponent } from '../../common/modals/procurement-faq-modal/procurement-faq-modal.component';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FetchData } from '../../common/service/fetch-data';
@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../dashboard/dashboard.css']
})
export class DashboardComponent implements OnInit {
    backup: any = {};
    isOpen = false;
    viewMode = 'tab1';
    activeTab: string;
    list = [];
    tempList: any;
    loadingData: boolean = true;
    topRow: any;
    isCollapsed: boolean = false;
    loading = false;
    total = 0;
    page = 1;
    pagesize = 0;
    limit = 10;
    searchKeyword: string;
    isCatManager: boolean = false;
    serPop = 'The Supplier Evaluation Risk Rating (SER) is risk metric that helps supply management professionals evaluate the long term risk of doing business with a supplier. The SER score is based on a scale of 1-9, with 1 representing the lowest level of risk and 9 implying the highest level of risk. For suppliers whose headquarters are located outside the United States and Canada, the SER predicts the likelihood that a supplier will cease operations or reorganize without paying all creditors in full, or obtain relief from creditors under state/federal law over the next 12 months.The SER provides a consistent risk ranking across the globe.';
    paydexPop = `PAYDEX is Dun & Bradstreet's unique dollar-weighted numerical indicator of how a firm paid its bills over the    past year, based on trade experiences reported to D&B by various vendors. The D&B PAYDEX Score ranges
    from 1 to 100, with higher scores indicating better payment performance. The tables below demonstrate how
    the score correlates to payment behavior`;
    noPop = `This is placeholder`;
    csrPop = `CSR Ratings give the perceived performance on an absolute 0-100 scale`;
    dowPop = `A company’s brand reputation is among its most valuable assets. And regulators, especially those of financial institutions, are now requiring “adverse media” coverage as part of due diligence and compliance matters. By knowing the illegal, immoral or unethical conduct of a third party, companies can better evaluate the cost/benefit balance of proposed business relationships.`;
    constructor(
        private customPiwik: CustomPiwik,
        private ds: DashboardService,
        private router: Router,
        private data: SharedDataService,
        private lc: LocalStoreService,
        private modalService: NgbModal,
        private fetchData: FetchData
    ) {}
    ngOnInit() {
        this.recentlyShared();
        this.tabClicked('Shared');
        /*   if (this.lc.getLocalInfo('account').authorities.indexOf('ROLE_CM_USER') >= 0) {
            this.isCatManager = true;
        }*/
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

    reportData: any = [];
    recentlyShared() {
        console.log('called');
        let param = '&status=shared&search=&from=0&size=20';
        this.fetchData.getAllRequest(param).subscribe(
            res => {
                //this.data.shareData(dataset);

                res.data.forEach((value, index, arr) => {
                    console.log(value);
                    let temp: any = {};
                    temp.id = value.id;
                    temp.DUNSNUMBER = value.providerKey.DUNSNUMBER;
                    temp.supplierName = value.supplierName;
                    temp.rate = [];
                    if (
                        value.packageResponse != null &&
                        value.packageResponse.DNB != null &&
                        value.packageResponse.DNB['D&B Rating Trend'] != null
                    ) {
                        let tt: any = {};
                        tt.type = 'Trend';
                        tt.value = value.packageResponse.DNB['D&B Rating Trend'].TrendRating.trendRating;
                        temp.rate.push(tt);
                    } else {
                        let tt: any = {};
                        tt.type = 'Trend';
                        tt.value = 'NA';
                        temp.rate.push(tt);
                    }
                    if (
                        value.packageResponse != null &&
                        value.packageResponse.DNB != null &&
                        value.packageResponse.DNB['Supplier Evaluation Risk'] != null
                    ) {
                        let tt: any = {};
                        tt.type = 'SER';
                        tt.value = value.packageResponse.DNB['Supplier Evaluation Risk'].SER.riskScore;
                        temp.rate.push(tt);
                    } else {
                        let tt: any = {};
                        tt.type = 'SER';
                        tt.value = 'NA';
                        temp.rate.push(tt);
                    }
                    if (
                        value.packageResponse !== null &&
                        value.packageResponse.DNB != null &&
                        value.packageResponse.DNB['Payment & Paydex Details'] != null
                    ) {
                        let tt: any = {};
                        tt.type = 'Paydex';
                        tt.value = value.packageResponse.DNB['Payment & Paydex Details'].paydex.paydexScore;
                        temp.rate.push(tt);
                    } else {
                        let tt: any = {};
                        tt.type = 'Paydex';
                        tt.value = 'NA';
                        temp.rate.push(tt);
                    }
                    if (
                        value.packageResponse != null &&
                        value.packageResponse.CSRHUB != null &&
                        value.packageResponse.CSRHUB.csrHubRating != null &&
                        value.packageResponse.CSRHUB.csrHubRating.csrHubRating != null &&
                        value.packageResponse.CSRHUB.csrHubRating.csrHubRating.averageRating != null
                    ) {
                        let tt: any = {};
                        tt.type = 'CSR Hub Rating';
                        tt.value = value.packageResponse.CSRHUB.csrHubRating.csrHubRating.averageRating;
                        temp.rate.push(tt);
                    } else {
                        let tt: any = {};
                        tt.type = 'CSR Hub Rating';
                        tt.value = 'NA';
                        temp.rate.push(tt);
                    }
                    if (
                        value.packageResponse != null &&
                        value.packageResponse.DOW_JONES != null &&
                        value.packageResponse.DOW_JONES['Dow Jones Basic'] != null &&
                        value.packageResponse.DOW_JONES['Dow Jones Basic'].DOWJones != null &&
                        value.packageResponse.DOW_JONES['Dow Jones Basic'].DOWJones.length > 0
                    ) {
                        let tt: any = {};
                        tt.type = 'Dow Jones AME Appearances';
                        tt.value = 0;
                        value.packageResponse.DOW_JONES['Dow Jones Basic'].DOWJones.map(m => {
                            if (m.totalCount != undefined && m.totalCount != null) {
                                tt.value += m.totalCount;
                            }
                            return m;
                        });
                        temp.rate.push(tt);
                    } else {
                        let tt: any = {};
                        tt.type = 'Dow Jones AME Appearances';
                        tt.value = 'NA';
                        temp.rate.push(tt);
                    }

                    this.reportData.push(temp);
                });
                console.log(this.reportData);
                this.topRow = this.reportData;
                this.data.shareData(this.reportData);
            },
            err => {}
        );
    }
    tabClicked(tab) {
        console.log('tabcllicked');
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
        this.pagesize = (this.page - 1) * this.limit;
        param = '&status=' + tabData + '&search=' + search + '&from=' + this.pagesize + '&size=' + this.limit;
        this.fetchData.getAllRequest(param).subscribe(
            res => {
                console.log(res);
                this.list = res.data;
                this.total = res.totalCounts;

                if (this.list !== null) {
                    this.tempList = this.list;
                }

                this.loadingData = false;
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/dashboard/tab' + tab + '/load/page/' + this.page + '/success',
                    window.location.href
                );
            },
            err => {
                console.log(err);
                this.loadingData = false;
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/dashboard/tab' + tab + '/load/page/' + this.page + '/fail',
                    window.location.href
                );
            }
        );
        /* this.ds
            .getAllRequest(param)
            .toPromise()
            .then(response => {
                console.log(response);
                this.list = response.body['data'];
                this.total = response.body['totalCounts'];

                if (this.list !== null) {
                    this.tempList = this.list;
                }
                
                this.loadingData = false;
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/dashboard/tab' + tab + '/load/page/' + this.page + '/success',
                    window.location.href
                );
            })
            .catch(err => {
                console.log(err);
                this.loadingData = false;
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/dashboard/tab' + tab + '/load/page/' + this.page + '/fail',
                    window.location.href
                );
            });*/
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
    callBackend(savebackUp) {
        console.log(this.page);
        console.log(this.activeTab);
        console.log(this.searchKeyword);
        this.getData(this.activeTab, this.searchKeyword, savebackUp);
    }
    sendReminder(item) {
        console.log(item);
        this.ds
            .sendReminder(item.id)
            .toPromise()
            .then(response => {
                item.reminder = 'sent';
                item.lastRequestedDate = new Date().toISOString();
                this.pushToArray(this.list, item);
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/dashboard/sendReminder/id/' + item.id + '/success',
                    window.location.href
                );
            })
            .catch(err => {
                item.reminder = 'sent';
                item.lastRequestedDate = new Date().toISOString();
                this.pushToArray(this.list, item);
                this.customPiwik.setCustomData(
                    'userId',
                    'procurement/dashboard/sendReminder/id/' + item.id + '/fail',
                    window.location.href
                );
            });
    }
    pushToArray(arr, obj) {
        const index = arr.findIndex(e => e.id === obj.id);
        arr[index] = obj;
    }
    goToCompanyProfile(item) {
        this.customPiwik.setCustomData(
            'userId',
            'procurement/dashboard/companyProfile/key/' + item.providerKey.DUNSNUMBER,
            window.location.href
        );
        this.router.navigate(['/procurement/supdetails', item.id, item.providerKey.DUNSNUMBER]);
    }
    clearSearch() {
        /*    this.searchKeyword = '';
        this.callBackend(); */
        if (Object.keys(this.backup).length > 0) {
            this.searchKeyword = '';
            this.page = this.backup.page;
            this.getData(this.activeTab, '', true);
        } else {
            this.page = 1;
            this.searchKeyword = '';
            this.callBackend(true);
        }
        // input is cleared then load last search eresult
    }
    goToCatDashboard() {
        this.router.navigate(['/procurement/category-dashboard']);
    }
    gotoFaq() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(ProcurementFaqModalComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isOpen = false;
            },
            reason => {
                this.isOpen = false;
            }
        );
        return modalRef;
    }
    getDowJonesCount(data) {
        let totalcount = 0;
        for (let o of data) {
            totalcount += o.totalCount;
        }
        //  {{item.packageResponse.DOW_JONES['Dow Jones Basic'].DOWJones[0].totalCount}}
        // console.log(totalcount);
        return totalcount;
    }
}
