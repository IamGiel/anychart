import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FetchData } from '../../../entities/common/service/fetch-data';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
    @Input() companyId: any;
    companyDetail: any;
    loading: boolean = true;
    constructor(private fetchData: FetchData, private router: Router, public activeModal: NgbActiveModal) {}

    ngOnInit() {
        console.log(this.companyId);
        this.fetchData.getCompanyDetailsById(this.companyId).subscribe(
            res => {
                console.log(res);
                this.companyDetail = res;
                this.loading = false;
            },
            res => {
                console.log(res);
                this.loading = false;
            }
        );
    }
}
