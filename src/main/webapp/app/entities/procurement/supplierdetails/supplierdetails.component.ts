import { Component, EventEmitter, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { PopoverModule } from 'ngx-popover';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';
import { NgAnalyzedFile } from '@angular/compiler';
import { Map } from 'typescript';
import { FetchData } from '../../common/service/fetch-data';
import { ProcurementCompanyInfo } from '../../../shared/models/procurement-company-info.model';
import { baseDirectiveCreate } from '@angular/core/src/render3/instructions';
import { Router, ActivatedRoute } from '@angular/router';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { Location } from '@angular/common';
import { CustomPiwik } from '../../common/service/custom-piwik';
//import { AngularFireModule } from '@angular/fire';
import { LocalStoreService } from '../../../core/auth/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AchillesQuestionnaireModalComponent } from '../../common/modals/achilles-questionnaire-modal/achilles-questionnaire-modal.component';
import { AchillesQuestionnaireService } from '../../common/modals/achilles-questionnaire-modal/achilles-questionnaire.service';

@Component({
    selector: 'jhi-supplierdetails',
    templateUrl: './supplierdetails.component.html',
    styleUrls: ['./supplierdetails.component.css']
})
export class SupplierdetailsComponent implements AfterViewInit, OnDestroy {
    //test
    // integration variables
    ratings: any = {};
    dnbRating: any = {};
    dnbSerRating: any = {};
    dnbPaydex: any = {};
    csrHubRating: any = {};
    dowJones: any = {};
    editBasicInfo = false;
    editKeyPersonnel = false;
    editSummary = false;
    dnbRatingTrendCodeDetails: any[] = [];
    dnbScale: any[];
    dnbScaleValue: number;
    complianceRequestId: string;
    dunsRequest: string;
    companyInfo: any;
    sliderColors2: any = {};
    sliderColors: any = {};
    viewMode = 'tab2';
    oldRequest: any;
    routerSubscription: any;
    readOnly = true;
    financialScale: any;
    legend: any;
    loading = true;
    viewType = 'procurement';
    isSupplier = false;
    isOpen = false;
    submitted = false;
    package: string = null;

    constructor(
        private customPiwik: CustomPiwik,
        private fetchData: FetchData,
        private activeRoute: ActivatedRoute,
        private zone: NgZone,
        private router: Router,
        private ls: LocalStoreService,
        private modalService: NgbModal,
        public aqs: AchillesQuestionnaireService
    ) {
        this.ratings.dnbRating = this.dnbRating;
        this.ratings.dnbSerRating = this.dnbSerRating;
        this.ratings.dnbPaydex = this.dnbPaydex;
        this.ratings.csrHubRating = this.csrHubRating;
        this.ratings.dowJones = this.dowJones;
        this.ratings.dowJones.ethical = {};
        this.ratings.dowJones.environmental = {};
        this.ratings.dowJones.labor = {};

        this.ratings.dowJones.loading = true;
        this.ratings.dowJones.totalCount = 0;

        this.ratings.dnbPaydex.collapse = true;
        this.ratings.dnbSerRating.collapse = true;
        this.ratings.dnbRating.collapse = true;
        this.ratings.csrHubRating.collapse = true;
        this.ratings.dowJones.ethical.collapse = false;
        this.ratings.dowJones.environmental.collapse = false;
        this.ratings.dowJones.labor.collapse = false;

        this.ratings.dnbRating.title = 'D&B Rating';
        this.ratings.dnbSerRating.title = 'D&B SER Rating';
        this.ratings.dnbPaydex.title = 'D&B Paydex';
        this.ratings.csrHubRating.title = 'CSRHub Rating';

        this.ratings.dnbPaydex.denominator = 100;

        this.ratings.dnbSerRating.options = {
            readOnly: true,
            stepsArray: [
                { value: 1, legend: 'Very poor' },
                { value: 2 },
                { value: 3, legend: 'Fair' },
                { value: 4 },
                { value: 5, legend: 'Average' },
                { value: 6 },
                { value: 7, legend: 'Good' },
                { value: 8 },
                { value: 9, legend: 'Excellent' }
            ]
        };

        const acc = localStorage.getItem('jhi-account');
        if (
            acc != undefined &&
            acc.length > 0 &&
            JSON.parse(acc).authorities != undefined &&
            JSON.parse(acc).authorities != null &&
            JSON.parse(acc).authorities.indexOf('ROLE_SUPPLIER_USER') >= 0
        ) {
            this.isSupplier = true;
            this.readOnly = false;
            this.viewType = 'supplier';
        }
    }

    getRadialColor(val) {
        if (val >= 0 && val <= 29) {
            return '#FF4F61';
        }
        if (val >= 30 && val <= 39) {
            return '#FFBE45';
        }
        if (val >= 40 && val <= 49) {
            return '#FFF245';
        }
        if (val >= 50 && val <= 59) {
            return '#31D490';
        }
        if (val >= 60 && val <= 79) {
            return '#14B4D2';
        }
        if (val >= 80 && val <= 100) {
            return '#795DDC';
        }
    }

    goToDashboard() {
        if (this.readOnly) {
            this.router.navigate(['/procurement/dashboard']);
        } else {
            this.router.navigate(['/supplier/dashboard']);
        }
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        /*  if (this.router.url.indexOf('/supplier/') >= 0 &&) {
            this.readOnly = false;
            this.viewType = 'supplier';
        } */
        this.routerSubscription = this.activeRoute.params.subscribe(res => {
            if (this.validate(res) && this.validate(res.id) && this.validate(res.duns)) {
                this.complianceRequestId = res.id;
                this.dunsRequest = res.duns;

                if (this.validate(this.oldRequest) && this.oldRequest != this.complianceRequestId + '-' + this.dunsRequest) {
                    this.zone.runOutsideAngular(() => {
                        location.reload();
                    });
                }
                this.oldRequest = this.complianceRequestId + '-' + this.dunsRequest;

                this.initDnbRatings();
                this.initCSRHub();
                if (!this.isSupplier) {
                    this.initDowJones();
                }
                this.initCompanyInfo();
                this.aqs.setRequestId(this.complianceRequestId);
                this.aqs.callBackend(this.complianceRequestId).subscribe(r => {
                    this.aqs.saveData(r);
                    this.updateQuestionnaire(r);
                });
            }
        });
    }

    initDowJones() {
        this.fetchData.getDowJonesRating(this.complianceRequestId).subscribe(res => {
            if (this.validate(res.DOW_JONES) && this.validate(res.DOW_JONES[0]) && this.validate(res.DOW_JONES[0].DOWJones)) {
                const data = res.DOW_JONES[0];
                if (this.validate(data) && this.validate(data.DOWJones) && data.DOWJones.length > 0) {
                    data.DOWJones.map(m => {
                        if (this.validate(m.totalCount)) {
                            this.ratings.dowJones.totalCount += m.totalCount;
                        }
                        if (m.issueName.replace(/\s/g, '').toLowerCase() == 'regulatory' && Object.keys(m.allegations).length > 0) {
                            this.ratings.dowJones.ethical.totalCount = m.totalCount;
                            this.ratings.dowJones.ethical.allegations = m.allegations;
                        }
                        if (
                            m.issueName.replace(/\s/g, '').toLowerCase() == 'environment/production' &&
                            Object.keys(m.allegations).length > 0
                        ) {
                            this.ratings.dowJones.environmental.totalCount = m.totalCount;
                            this.ratings.dowJones.environmental.allegations = m.allegations;
                        }
                        if (m.issueName.replace(/\s/g, '').toLowerCase() == 'social/labour' && Object.keys(m.allegations).length > 0) {
                            this.ratings.dowJones.labor.totalCount = m.totalCount;
                            this.ratings.dowJones.labor.allegations = m.allegations;
                        }
                        return m;
                    });
                    this.ratings.dowJones.loading = false;
                }
            }
        });
    }

    initCSRHub() {
        this.fetchData.getCSRHubRating(this.complianceRequestId).subscribe(
            res => {
                if (
                    this.validate(res.CSRHUB) &&
                    res.CSRHUB.length > 0 &&
                    this.validate(res.CSRHUB[0]) &&
                    this.validate(res.CSRHUB[0].csrHubRating)
                ) {
                    this.ratings.csrHubRating = res.CSRHUB[0].csrHubRating;
                }
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
        );
    }
    public getSerRatingColor(color) {
        if (color <= 2) {
            return '#14B4D2';
        }
        if (color <= 4) {
            return '#31D490';
        }
        if (color == 5) {
            return '#FFBE45';
        }
        if (color <= 7) {
            return '#FD7C43';
        }
        if (color <= 9) {
            return '#FF4F61';
        }
        return '#2AE02A';
    }

    public getPaydexRatingColor(color) {
        if (color >= 81) {
            return '#14B4D2';
        }
        if (color >= 61) {
            return '#31D490';
        }
        if (color >= 41) {
            return '#FFBE45';
        }
        if (color >= 21) {
            return '#FD7C43';
        }
        if (color >= 1) {
            return '#FF4F61';
        }
        return '#2AE02A';
    }

    public getPaydexBoxRatingColor(color) {
        if (color >= 81) {
            return '#E7F7FA';
        }
        if (color >= 61) {
            return '#EAFAF3';
        }
        if (color >= 41) {
            return '#FFF8EC';
        }
        if (color >= 21) {
            return '#fd7c433d';
        }
        if (color >= 1) {
            return '#FFEDEF';
        }
        return '#2AE02A';
    }

    // function to get serRating Box colors
    public getSerBoxRatingColor(color) {
        if (color <= 2) {
            return '#E7F7FA';
        }
        if (color <= 4) {
            return '#EAFAF3';
        }
        if (color == 5) {
            return '#FFF8EC';
        }
        if (color <= 7) {
            return '#fd7c433d';
        }
        if (color <= 9) {
            return '#FFEDEF';
        }
        return '#2AE02A';
    }

    updateBasicInfo() {
        let basicInfo: ProcurementCompanyInfo = {};
        if (this.validate(this.companyInfo.naics_1_code)) {
            basicInfo.naics_1_code = this.companyInfo.naics_1_code;
        }
        if (this.validate(this.companyInfo.phoneNumber)) {
            basicInfo.phoneNumber = this.companyInfo.phoneNumber;
        }

        if (this.validate(this.companyInfo.sales)) {
            basicInfo.sales = this.companyInfo.sales;
        }

        if (this.validate(this.companyInfo.headQuaters)) {
            basicInfo.headQuaters = this.companyInfo.headQuaters;
        }

        if (this.validate(this.companyInfo.employees)) {
            basicInfo.employees = this.companyInfo.employees;
        }

        if (this.validate(this.companyInfo.established)) {
            basicInfo.established = this.companyInfo.established;
        }
        if (this.validate(this.companyInfo.duns_number)) {
            basicInfo.duns_number = this.companyInfo.duns_number;
        }

        this.fetchData.saveCompanyInfo(basicInfo).subscribe(
            res => {
                this.editBasicInfo = false;
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/companyInfo/basicInfo/save/success',
                    window.location.href
                );
            },
            err => {
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/companyInfo/basicInfo/save/fail',
                    window.location.href
                );
            }
        );
    }

    updateKeyPersonnel() {
        let keyPersonnel: ProcurementCompanyInfo = {};
        if (this.validate(this.companyInfo.chief_executive_officer_name)) {
            keyPersonnel.chief_executive_officer_name = this.companyInfo.chief_executive_officer_name;
        }
        if (this.validate(this.companyInfo.cfo)) {
            keyPersonnel.cfo = this.companyInfo.cfo;
        }
        if (this.validate(this.companyInfo.vicePresident)) {
            keyPersonnel.vicePresident = this.companyInfo.vicePresident;
        }
        if (this.validate(this.companyInfo.duns_number)) {
            keyPersonnel.duns_number = this.companyInfo.duns_number;
        }

        this.fetchData.saveCompanyInfo(keyPersonnel).subscribe(
            res => {
                this.editKeyPersonnel = false;
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/companyInfo/keyPersonnel/save/success',
                    window.location.href
                );
            },
            err => {
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/companyInfo/keyPersonnel/save/fail',
                    window.location.href
                );
            }
        );
    }

    updateSummary() {
        let summary: ProcurementCompanyInfo = {};
        if (this.validate(this.companyInfo.summary)) {
            summary.summary = this.companyInfo.summary;
        }
        if (this.validate(this.companyInfo.website)) {
            if (
                this.companyInfo.website.length > 0 &&
                (this.companyInfo.website.indexOf('http') == -1 && this.companyInfo.website.indexOf('https') == -1)
            ) {
                this.companyInfo.website = 'http://' + this.companyInfo.website;
            }
            summary.website = this.companyInfo.website;
        }
        if (this.validate(this.companyInfo.facebook)) {
            if (
                this.companyInfo.facebook.length > 0 &&
                (this.companyInfo.facebook.indexOf('http') == -1 && this.companyInfo.facebook.indexOf('https') == -1)
            ) {
                this.companyInfo.facebook = 'http://' + this.companyInfo.facebook;
            }
            summary.facebook = this.companyInfo.facebook;
        }
        if (this.validate(this.companyInfo.linkedIn)) {
            if (
                this.companyInfo.linkedIn.length > 0 &&
                (this.companyInfo.linkedIn.indexOf('http') == -1 && this.companyInfo.linkedIn.indexOf('https') == -1)
            ) {
                this.companyInfo.linkedIn = 'http://' + this.companyInfo.linkedIn;
            }
            summary.linkedIn = this.companyInfo.linkedIn;
        }

        if (this.validate(this.companyInfo.duns_number)) {
            summary.duns_number = this.companyInfo.duns_number;
        }

        this.fetchData.saveCompanyInfo(summary).subscribe(
            res => {
                this.editSummary = false;
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/companyInfo/summary/save/success',
                    window.location.href
                );
            },
            err => {
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/companyInfo/summary/save/fail',
                    window.location.href
                );
            }
        );
    }

    toggleEdit(type: string) {
        if (this.validate(type) && type === 'basic-info') {
            if (!this.editBasicInfo) {
                this.editBasicInfo = true;
            } else if (this.editBasicInfo) {
                this.updateBasicInfo();
            }
        }
        if (this.validate(type) && type === 'key-personnel') {
            if (!this.editKeyPersonnel) {
                this.editKeyPersonnel = true;
            } else if (this.editKeyPersonnel) {
                this.updateKeyPersonnel();
            }
        }
        if (this.validate(type) && type === 'summary') {
            if (!this.editSummary) {
                this.editSummary = true;
            } else if (this.editSummary) {
                this.updateSummary();
            }
        }
    }

    toggleCollapse(type: string) {
        if (this.validate(type) && this.validate(this.ratings[type])) {
            this.ratings[type].collapse = !this.ratings[type].collapse;
        }
    }

    validate(obj: any): boolean {
        if (obj === undefined || obj === null) {
            return false;
        }
        return true;
    }

    goTo(url) {
        window.open(url, '_blank');
    }
    checkUrl(url) {
        return /^http:\/\/|(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
    }

    initCompanyInfo() {
        this.fetchData.getProcurementCompanyInfo(this.complianceRequestId).subscribe(
            res => {
                if (this.validate(res) && this.validate(res.data) && res.data.length > 0 && this.validate(res.data[0])) {
                    this.companyInfo = new ProcurementCompanyInfo(res.data[0]);
                    this.customPiwik.setCustomData(
                        'userId',
                        this.viewType + '/supplierdetails/companyInfo/key/' + this.dunsRequest + '/load/success',
                        window.location.href
                    );
                }
            },
            err => {
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/companyInfo/key/' + this.dunsRequest + '/load/fail',
                    window.location.href
                );
            }
        );
    }

    initDnbRatings() {
        this.fetchData.getDnbRatingTrendCodeDetails().subscribe(res => {
            // different types of ratings from dnb
            let ratingClassification2: string[];
            let ratingClassification: string[];
            let employeeRangeSymbol: string[];
            let rating: any[];

            if (
                this.validate(res) &&
                this.validate(res._embedded) &&
                this.validate(res._embedded.ratingTrendCodeDetailses) &&
                res._embedded.ratingTrendCodeDetailses.length > 0
            ) {
                this.financialScale = res._embedded.ratingTrendCodeDetailses;
                //reduce to a single iteration
                ratingClassification = res._embedded.ratingTrendCodeDetailses
                    .filter(f => {
                        return this.validate(f.ratingClassification) && this.validate(f.netWorth);
                    })
                    .map(m => {
                        return m.ratingClassification;
                    });
                ratingClassification2 = res._embedded.ratingTrendCodeDetailses
                    .filter(f => {
                        return this.validate(f.ratingClassification) && !this.validate(f.netWorth);
                    })
                    .map(m => {
                        return m.ratingClassification;
                    });
                employeeRangeSymbol = res._embedded.ratingTrendCodeDetailses
                    .filter(f => {
                        return this.validate(f.employeeRangeSymbol);
                    })
                    .map(m => {
                        return m.employeeRangeSymbol;
                    });
                rating = res._embedded.ratingTrendCodeDetailses.filter(f => {
                    return this.validate(f.rating) && this.validate(f.description);
                });
                //reduce to a single iteration
                if (ratingClassification.length > 0) {
                    this.dnbRatingTrendCodeDetails.push(ratingClassification);
                }
                if (ratingClassification2.length > 0) {
                    this.dnbRatingTrendCodeDetails.push(ratingClassification2);
                }
                if (employeeRangeSymbol.length > 0) {
                    this.dnbRatingTrendCodeDetails.push(employeeRangeSymbol);
                }
                if (rating.length > 0) {
                    this.dnbRatingTrendCodeDetails.push(rating);
                }
            }
            this.getDnbRatings();
        });
    }
    getCcaColor(value: number) {
        if (this.validate(this.ratings.dnbRating.ratingTrendCodeDetails)) {
            if (value == this.ratings.dnbRating.ratingTrendCodeDetails.high) {
                return '#14B4D2'; // blue
            }
            if (value == this.ratings.dnbRating.ratingTrendCodeDetails.good) {
                return '#31D490'; // green
            }
            if (value == this.ratings.dnbRating.ratingTrendCodeDetails.fair) {
                return '#FFBE45'; // yellow
            }
            if (value == this.ratings.dnbRating.ratingTrendCodeDetails.limited) {
                return '#FF4F61'; // red
            }
        }
    }

    public getCcaBoxColor(color) {
        if (this.validate(this.ratings.dnbRating.ratingTrendCodeDetails)) {
            if (color == this.ratings.dnbRating.ratingTrendCodeDetails.high) {
                return '#E7F7FA';
            }
            if (color == this.ratings.dnbRating.ratingTrendCodeDetails.good) {
                return '#EAFAF3';
            }
            if (color == this.ratings.dnbRating.ratingTrendCodeDetails.fair) {
                return '#FFF8EC';
            }
            if (color == this.ratings.dnbRating.ratingTrendCodeDetails.limited) {
                return '#FFEDEF';
            }
        }
    }
    getDnbRatings() {
        this.loading = true;
        this.fetchData.getDnbRating(this.complianceRequestId).subscribe(
            res => {
                if (this.validate(res.DNB) && res.DNB.length > 0) {
                    let o: any;
                    let color: string;
                    for (o in res.DNB) {
                        // setting PAYDEX rating - paydexScore
                        if (this.validate(res.DNB[o].paydex)) {
                            if (this.validate(res.DNB[o].paydex.paydexScore)) {
                                this.ratings.dnbPaydex.paydexScore = parseInt(res.DNB[o].paydex.paydexScore);
                            }
                            if (this.validate(res.DNB[o].paydex.months)) {
                                this.ratings.dnbPaydex.months = res.DNB[o].paydex.months;
                            }
                            this.ratings.dnbPaydex.sliderColors = {
                                'blue-slider': this.ratings.dnbPaydex.paydexScore >= 81,
                                'green-slider': this.ratings.dnbPaydex.paydexScore >= 61 && this.ratings.dnbPaydex.paydexScore < 81,
                                'yellow-slider': this.ratings.dnbPaydex.paydexScore >= 41 && this.ratings.dnbPaydex.paydexScore < 61,
                                'orange-slider': this.ratings.dnbPaydex.paydexScore >= 21 && this.ratings.dnbPaydex.paydexScore < 41,
                                'red-slider': this.ratings.dnbPaydex.paydexScore >= 1 && this.ratings.dnbPaydex.paydexScore < 21
                            };
                            this.ratings.dnbPaydex.options = {
                                floor: 1,
                                ceil: 100,
                                showSelectionBar: true,
                                readOnly: true
                            };
                        }
                        // setting ser rating - risk score
                        if (this.validate(res.DNB[o].SER) && this.validate(res.DNB[o].SER.riskScore)) {
                            this.ratings.dnbSerRating.riskScore = parseInt(res.DNB[o].SER.riskScore);
                            this.ratings.dnbSerRating.sliderColors = {
                                'blue-slider': this.ratings.dnbSerRating.riskScore <= 2,
                                'green-slider': this.ratings.dnbSerRating.riskScore <= 4 && this.ratings.dnbSerRating.riskScore > 2,
                                'yellow-slider': this.ratings.dnbSerRating.riskScore == 5,
                                'orange-slider': this.ratings.dnbSerRating.riskScore <= 7 && this.ratings.dnbSerRating.riskScore > 5,
                                'red-slider': this.ratings.dnbSerRating.riskScore <= 9 && this.ratings.dnbSerRating.riskScore > 7
                            };
                        }
                        // parsing financial strength and composite credit apprisal from trend rating

                        if (this.validate(res.DNB[o].TrendRating) && this.validate(res.DNB[o].TrendRating.trendRating)) {
                            const trendRating = res.DNB[o].TrendRating.trendRating;
                            if (trendRating.length == 1) {
                                if (parseInt(trendRating) > -1) {
                                    this.ratings.dnbRating.compositeCreditApprisial = parseInt(trendRating);
                                }
                            }
                            if (trendRating.length == 2) {
                                this.ratings.dnbRating.financialStrength = trendRating;
                            }
                            if (trendRating.length == 3) {
                                this.ratings.dnbRating.financialStrength = trendRating[0] + trendRating[1];
                                this.ratings.dnbRating.compositeCreditApprisial = parseInt(trendRating[2]);
                            }
                            // this.ratings.dnbRating.financialStrength = 'BB';
                        }

                        // scale for composite credit
                        if (this.validate(res.DNB[o].TrendRating) && this.validate(res.DNB[o].TrendRating.ratingTrendCodeDetails)) {
                            this.ratings.dnbRating.ratingTrendCodeDetails = res.DNB[o].TrendRating.ratingTrendCodeDetails;
                        }
                    }
                }

                // picking the correct scale for the slider based on the financial strength
                if (this.dnbRatingTrendCodeDetails.length > 0 && this.validate(this.ratings.dnbRating.financialStrength)) {
                    for (let x in this.dnbRatingTrendCodeDetails) {
                        if (this.validate(this.dnbRatingTrendCodeDetails[x]) && this.dnbRatingTrendCodeDetails[x].length > 0) {
                            if (!this.validate(this.dnbRatingTrendCodeDetails[x][0].rating)) {
                                if (this.dnbRatingTrendCodeDetails[x].indexOf(this.ratings.dnbRating.financialStrength) >= 0) {
                                    this.dnbScale = this.dnbRatingTrendCodeDetails[x];
                                }
                            } else {
                                let arr = this.dnbRatingTrendCodeDetails[x].filter(f => {
                                    return f.rating == this.ratings.dnbRating.financialStrength;
                                });
                                if (arr.length > 0) {
                                    this.ratings.dnbRating.otherClassification = true;
                                }
                            }
                        }
                    }
                }

                // constructing dnb rating scale for slider
                if (!this.ratings.dnbRating.otherClassification && this.validate(this.dnbScale) && this.dnbScale.length > 0) {
                    this.ratings.dnbRating.description = 'Financial Strength';
                    this.dnbScaleValue = this.dnbScale.indexOf(this.ratings.dnbRating.financialStrength);
                    let c = 0;
                    this.legend = this.financialScale
                        .filter(f => {
                            return this.ratings.dnbRating.financialStrength == f.ratingClassification;
                        })
                        .map(m => {
                            if (m.netWorth !== null) {
                                return m.netWorth;
                            }
                            if (m.numberOfEmployess !== null) {
                                return m.numberOfEmployess;
                            }
                        });
                    const stepsArray = this.dnbScale.map(m => {
                        const o: any = {};
                        o.value = c;
                        if (c == this.dnbScaleValue && this.legend.length > 0) {
                            o.legend = this.legend[0];
                        }
                        c += 1;
                        return o;
                    });
                    this.ratings.dnbRating.min = this.dnbScale[0];
                    this.ratings.dnbRating.max = this.dnbScale[this.dnbScale.length - 1];

                    //settign dnb rating scale for slider
                    this.ratings.dnbRating.options = {
                        //  autoHideLimitLabels: false,
                        showTicksValues: false,
                        showTicks: true,
                        showSelectionBar: true,
                        readOnly: true,
                        stepsArray: stepsArray,
                        step: 10,
                        translate: (value: number, label: LabelType): string => {
                            return this.dnbScale[value];
                        }
                    };
                } else if (this.ratings.dnbRating.otherClassification) {
                    this.ratings.dnbRating.description = this.dnbRatingTrendCodeDetails[3].filter(f => {
                        return f.rating == this.ratings.dnbRating.financialStrength;
                    })[0].description;
                    this.dnbScaleValue = 1;
                    // settign dnb rating scale for greyed out slider
                    this.ratings.dnbRating.options = {
                        showSelectionBar: true,
                        readOnly: true,
                        floor: 0,
                        cail: 2,
                        stepsArray: [{ value: 0 }, { value: 1 }, { value: 2 }],
                        translate: (value: number, label: LabelType): string => {
                            return this.ratings.dnbRating.financialStrength;
                        }
                    };
                }
                this.toggleCollapse('dnbSerRating');
                this.toggleCollapse('dnbPaydex');
                this.toggleCollapse('dnbRating');

                this.loading = false;
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/DnbRatings/complianceRequestId/' + this.complianceRequestId + '/load/success',
                    window.location.href
                );
            },
            err => {
                this.customPiwik.setCustomData(
                    'userId',
                    this.viewType + '/supplierdetails/DnbRatings/complianceRequestId/' + this.complianceRequestId + '/load/success',
                    window.location.href
                );
            }
        );
    }

    timeThisCollapsingDiv() {}

    setColor() {}

    openAchillesQuestionnaireModal() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(AchillesQuestionnaireModalComponent, { size: 'lg', backdrop: 'static' });
        modalRef.result.then(
            result => {
                this.isOpen = false;
                this.updateQuestionnaire(this.aqs.getSavedData());
            },
            reason => {
                this.isOpen = false;
                this.updateQuestionnaire(this.aqs.getSavedData());
            }
        );
        return modalRef;
    }

    updateQuestionnaire(r: any) {
        if (
            this.validate(r) &&
            this.validate(r.dataPointResponseList) &&
            r.dataPointResponseList.length > 0 &&
            this.validate(r.dataPointResponseList[0]) &&
            this.validate(r.dataPointResponseList[0].status)
        ) {
            if (r.dataPointResponseList[0].status == 'AUDIT_DONE') {
                this.submitted = true;
            } else {
                this.submitted = false;
            }
        }

        if (r != null && r.compliancePackages != undefined && r.compliancePackages != null && r.compliancePackages.length > 0) {
            this.package = r.compliancePackages[0];
        }
    }

    showEthical() {
        /*if (!this.validateCompliancePackages()) {
            return false;
        }
        if (this.aqs.getSavedData().compliancePackages.indexOf('Base') >= 0 && this.isSupplier) {
            return false;
        }
        return true;*/
        return true;
    }

    notBase() {
        /*if (!this.validateCompliancePackages()) {
            return false;
        }
        if (this.aqs.getSavedData().compliancePackages.indexOf('Base') >= 0) {
            return false;
        }
        return true;*/
        return true;
    }

    validateCompliancePackages() {
        if (this.aqs.getSavedData() == undefined || this.aqs.getSavedData() == null) {
            return false;
        }
        if (this.aqs.getSavedData().compliancePackages == undefined || this.aqs.getSavedData().compliancePackages == null) {
            return false;
        }
        if (this.aqs.getSavedData().compliancePackages.length <= 0) {
            return false;
        }
        return true;
    }

    getAchillesLabel(label: any) {
        if (!this.validate(label)) {
            return 'IN PROGRESS';
        }
        if (
            label.toLowerCase() == 'gold' ||
            label.toLowerCase() == 'silver' ||
            label.toLowerCase() == 'platinum' ||
            label.toLowerCase() == 'essential'
        ) {
            return label;
        }
        return 'IN PROGRESS';
    }

    getAchillesBadge(label: any) {
        if (!this.validate(label)) {
            return '/content/images/Badge_In Progress.png';
        }
        if (
            label.toLowerCase() == 'gold' ||
            label.toLowerCase() == 'silver' ||
            label.toLowerCase() == 'platinum' ||
            label.toLowerCase() == 'essential'
        ) {
            let string = label.toLowerCase();
            return '/content/images/Badge_' + string.charAt(0).toUpperCase() + string.slice(1) + '.png';
        }
        return '/content/images/Badge_In Progress.png';
    }
}
