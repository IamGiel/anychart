import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { Company } from '../../core/user/company.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FetchData } from '../../entities/common/service/fetch-data';

@Component({
    selector: 'jhi-achilles-badge-update',
    templateUrl: './achilles-badge-update.component.html',
    styles: [
        `
        .btn-prime {
            border-radius: 24px;
            background: linear-gradient(134.72deg, #804cd9 0%, #804cd9 51%, #544ad8 100%);
            transition: 0.5s;
            color: #ffffff;
            font-family: 'Inter UI';
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1px;
            line-height: 24px;
            background-size: 200% auto;
            text-transform: uppercase;
        }
        
        .btn-prime:hover {
            background-position: right center;
        }
        .has-search .form-control {
            padding-left: 2.75rem;
            background-image: none !important;
        }
        .btn[disabled]:hover{
            color:#804cd9;
            border-color:#804cd9;
        }
        `
    ]
})
export class AchillesBadgeUpdateComponent implements OnInit {
    company: any;
    languages: any[];
    domainList: any[];
    isSaving: boolean;
    payload: any;
    oldDomainList: any[];
    editCompany: boolean = false;
    public sucessMsg = '';
    public errMsg = '';
    edited: boolean = false;
    success: boolean = false;
    successMsg: string = '';
    @Input() companyData: any;

    //companyForm: FormGroup;
    submitted = false;
    isDunsFound = false;
    dunsSearch = '';
    public badges = [{ id: 1, name: 'Silver' }, { id: 2, name: 'Gold' }, { id: 3, name: 'Platinum' }];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private fetchData: FetchData
    ) {}

    updateBadgeForm = new FormGroup({
        dunsNo: new FormControl(),
        dunsNoInput: new FormControl(),
        badgeName: new FormControl()
    });

    ngOnInit() {
        this.isSaving = false;
        this.successMsg = '';
        //this.company = new Company();

        this.updateBadgeForm = this.formBuilder.group({
            dunsNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            badgeName: ['', Validators.required]
        });
    }
    get f() {
        return this.updateBadgeForm.controls;
    }

    previousState() {
        this.router.navigate(['/admin/user-management']);
    }

    save() {}
    searchDuns() {
        this.submitted = true;
        this.isDunsFound = true;
        let dunsFound = this.dunsSearch;
        this.updateBadgeForm.patchValue({ dunsNo: dunsFound });
        this.updateBadgeForm.patchValue({ dunsNoInput: dunsFound });
        console.log('search');
    }
    valuechange(value) {
        this.dunsSearch = value;
        console.log(value);
        this.isDunsFound = false;
    }

    updateBadge() {
        //this.successMsg='Badge updated successfully';
        console.log('updte badge');
        console.log(this.updateBadgeForm.value);
        let payload = {
            badge: this.updateBadgeForm.value.badgeName,
            providerKey: this.updateBadgeForm.value.dunsNo
        };

        this.fetchData.badgeUpdate(payload).subscribe(
            res => {
                this.successMsg = 'Badge updated successfully';
            },
            err => {
                console.log(err);
                this.errMsg = 'Error! ' + err.error;
            }
        );
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        // this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        //  this.close();
    }

    close() {
        let data = 'closed';
        if (this.success) {
            data = 'success';
        }
        this.activeModal.close(data);
    }

    dismiss() {
        this.activeModal.dismiss();
    }
}
