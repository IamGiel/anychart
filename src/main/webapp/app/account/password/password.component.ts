import { Component, OnInit, ViewChild } from '@angular/core';

import { Principal } from 'app/core';
import { PasswordService } from './password.service';
import { BaseColorService } from '../../entities/common/service/base-color-service';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'jhi-password',
    templateUrl: './password.component.html',
    styleUrls: ['../password-reset/password.css']
})
export class PasswordComponent implements OnInit {
    doNotMatch: string;
    error: string;
    success: string;
    account: any;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    pwdToggle: boolean = false;
    newPwdToggle: boolean = false;
    errMsg: string = 'Something went wrong !';

    constructor(private passwordService: PasswordService, private principal: Principal, public bcs: BaseColorService) {}
    @ViewChild(NgForm) passwordForm: NgForm;
    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    changePassword() {
        if (this.newPassword !== this.confirmPassword) {
            this.error = null;
            this.success = null;
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.passwordService.save(this.newPassword, this.currentPassword).subscribe(
                () => {
                    this.error = null;
                    this.success = 'OK';
                    this.currentPassword = null;
                    this.newPassword = null;
                    this.confirmPassword = null;
                    this.passwordForm.reset();
                },
                err => {
                    this.success = null;
                    this.error = 'ERROR';
                    console.log(err.error['title']);
                    console.log(err);
                    console.log(typeof err.error);
                    this.errMsg = JSON.parse(err.error).title;
                    if (this.errMsg == 'Current password does not match') {
                        this.errMsg = 'The current password is incorrect';
                    }
                }
            );
        }
    }
    showPwd() {
        if (this.pwdToggle) {
            this.pwdToggle = false;
        } else {
            this.pwdToggle = true;
        }
    }
    showNewPwd() {
        if (this.newPwdToggle) {
            this.newPwdToggle = false;
        } else {
            this.newPwdToggle = true;
        }
    }
}
