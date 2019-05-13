import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../../core/user/company.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FetchData } from '../../entities/common/service/fetch-data';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    company: Company;
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

    @Input() companyData: any;

    public validators = [this.startsWithOutAt, this.containsDot];
    //companyForm: FormGroup;
    submitted = false;
    arr = [{ display: 'h.com', value: 'h.com' }, { display: 'b.com', value: 'b.com' }];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private fetchData: FetchData
    ) {}

    companyForm = new FormGroup({
        companyName: new FormControl(),
        tags: new FormControl(),
        companyId: new FormControl()
    });

    ngOnInit() {
        this.isSaving = false;
        this.company = new Company();
        /*  if(this.companyData!==undefined && this.companyData!==null){
            console.log(this.companyData);
            this.company = this.companyData ? this.companyData : new Company();
            console.log(this.company);
        } */

        this.companyForm = this.formBuilder.group({
            companyId: [],
            companyName: ['', [Validators.required, Validators.minLength(3)]],
            tags: ['', Validators.required]
        });
        if (this.companyData !== undefined && this.companyData !== null && this.companyData !== 'create') {
            this.editCompany = true;
            const domainList = this.convertDomianArrToList2(this.companyData.companyDomainList);
            this.oldDomainList = domainList;
            this.companyForm.patchValue({ companyId: this.companyData.companyId });
            this.companyForm.patchValue({ companyName: this.companyData.companyName });
            this.companyForm.patchValue({ tags: domainList });
        }
    }
    get f() {
        return this.companyForm.controls;
    }

    private startsWithOutAt(control: FormControl) {
        if (control.value.charAt(0) == '@') {
            return {
                'startsWithOutAt@': true
            };
        }

        return null;
    }

    private containsDot(control: FormControl) {
        if (control.value.indexOf('.') == -1) {
            return {
                containsDot: true
            };
        }

        return null;
    }
    previousState() {
        this.router.navigate(['/admin/user-management']);
    }

    save() {
        this.submitted = true;
        this.errMsg = '';
        const domainNameListArr = this.companyForm.value.tags.map(item => item.value);
        if (this.editCompany) {
            const oldDomainListArr = this.oldDomainList.map(item => item.value);
            let deletedDomains = oldDomainListArr.filter(f => domainNameListArr.indexOf(f) == -1);
            let newDomains = domainNameListArr.filter(f => oldDomainListArr.indexOf(f) == -1);
            /* let deletedDomains = [];
            for (var i = 0; i < oldDomainListArr.length; i++) {
                if (domainNameListArr.indexOf(oldDomainListArr[i]) === -1) {
                    deletedDomains.push(oldDomainListArr[i]);
                }
            }
            let newDomains = [];
            for (var i = 0; i < domainNameListArr.length; i++) {
                if (oldDomainListArr.indexOf(domainNameListArr[i]) === -1) {
                    newDomains.push(domainNameListArr[i]);
                }
            } */
            this.payload = {
                id: this.companyForm.value.companyId,
                companyName: this.companyForm.value.companyName,
                addDomainList: newDomains,
                removeDomainNameList: deletedDomains
            };
            this.fetchData.updateCompany(this.payload).subscribe(
                res => {
                    if (res.msg == 'Success') {
                        this.edited = true;
                        this.sucessMsg = 'Company edited successfully.';
                        //this.close(res.msg);
                        this.success = true;
                    }
                },
                err => {
                    console.log(err);
                    this.edited = false;
                    this.errMsg = err.msg || err.error.msg;
                }
            );
        } else {
            this.payload = {
                companyName: this.companyForm.value.companyName,
                domainNameList: domainNameListArr
            };
            this.fetchData.createCompany(this.payload).subscribe(
                res => {
                    if (res.msg == 'Success') {
                        this.edited = true;
                        this.sucessMsg = 'Company added successfully.';
                        //this.close(res.msg);
                        this.success = true;
                    } else {
                        this.edited = false;
                        this.errMsg = res.msg || res.error.msg;
                    }
                },
                err => {
                    this.edited = false;
                    this.errMsg = err.msg || err.error.msg;
                }
            );
        }
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
    private convertDomianArrToList(arr) {
        //convert array to required JSON format
        return arr.reduce(function(result, item, index) {
            var obj = {};
            obj['display'] = item;
            obj['value'] = item;
            result.push(obj);
            return result;
        }, []); //an empty array
    }
    private convertDomianArrToList2(arr) {
        //convert array to required JSON format
        return arr.reduce(function(result, item, index) {
            var obj = {};
            obj['display'] = item.domainName;
            obj['value'] = item.domainName;
            result.push(obj);
            return result;
        }, []); //an empty array
    }
}
