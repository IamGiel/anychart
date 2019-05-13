import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { Company } from '../../core/user/company.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FetchData } from '../../../entities/common/service/fetch-data';
import { JhiLanguageHelper, User, UserService } from 'app/core';

@Component({
    selector: 'jhi-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
    edited: boolean = false;
    editUser: boolean = false;
    errMsg: string = '';
    sucessMsg: string = '';
    submitted = false;
    isSaving: boolean;
    payload: any;
    success: boolean = false;

    user: User;
    languages: any[];
    authorities: any[];

    @Input() userData: any;
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private fetchData: FetchData,
        private languageHelper: JhiLanguageHelper,
        private userService: UserService
    ) {}

    userForm = new FormGroup({
        login: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        userId: new FormControl(),
        authority: new FormControl(),
        language: new FormControl(),
        activate: new FormControl()
    });

    loginPattern = '^[@.a-z0-9_-]{1,50}$';
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

    ngOnInit() {
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        this.isSaving = false;
        this.user = new User();
        this.userForm = this.formBuilder.group({
            userId: [],
            login: ['', [Validators.required, Validators.pattern(this.loginPattern), Validators.maxLength(50)]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            authority: ['', [Validators.required]],
            language: ['', [Validators.required]],
            activate: ['']
        });
    }
    get f() {
        return this.userForm.controls;
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
    save() {
        this.submitted = true;
        this.errMsg = '';
        console.log(this.userForm.value);
    }
}
