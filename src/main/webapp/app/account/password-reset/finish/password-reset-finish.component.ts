import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginModalService } from 'app/core';
import { PasswordResetFinishService } from './password-reset-finish.service';
import { BaseColorService } from '../../../entities/common/service/base-color-service';
@Component({
    selector: 'jhi-password-reset-finish',
    templateUrl: './password-reset-finish.component.html',
    styleUrls: ['../../password-reset/password.css']
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    keyMissing: boolean;
    resetAccount: any;
    success: string;
    modalRef: NgbModalRef;
    key: string;
    newPwdToggle: boolean = false;
    errMsg: string = 'Something went wrong !';

    constructor(
        private passwordResetFinishService: PasswordResetFinishService,
        private loginModalService: LoginModalService,
        private route: ActivatedRoute,
        private elementRef: ElementRef,
        private renderer: Renderer,
        public bcs: BaseColorService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.key = params['key'];
        });
        this.resetAccount = {};
        this.keyMissing = !this.key;
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.querySelector('#password') != null) {
            this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#password'), 'focus', []);
        }
    }

    finishReset() {
        this.doNotMatch = null;
        this.error = null;
        if (this.resetAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.passwordResetFinishService.save({ key: this.key, newPassword: this.resetAccount.password }).subscribe(
                () => {
                    this.success = 'OK';
                },
                err => {
                    this.success = null;
                    this.error = 'ERROR';
                    this.errMsg = err.error;
                }
            );
        }
    }

    login() {
        this.router.navigate(['/login']);
    }
    showNewPwd() {
        if (this.newPwdToggle) {
            this.newPwdToggle = false;
        } else {
            this.newPwdToggle = true;
        }
    }
}
