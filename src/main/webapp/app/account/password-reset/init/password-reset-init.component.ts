import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared';
import { PasswordResetInitService } from './password-reset-init.service';
import { BaseColorService } from '../../../entities/common/service/base-color-service';
@Component({
    selector: 'jhi-password-reset-init',
    templateUrl: './password-reset-init.component.html',
    styleUrls: ['../../password-reset/password.css']
})
export class PasswordResetInitComponent implements OnInit, AfterViewInit {
    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: string;

    constructor(
        private passwordResetInitService: PasswordResetInitService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        public bcs: BaseColorService
    ) {}

    ngOnInit() {
        this.resetAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
    }

    requestReset() {
        this.error = null;
        this.errorEmailNotExists = null;

        this.passwordResetInitService.save(this.resetAccount.email).subscribe(
            () => {
                this.success = 'OK';
            },
            response => {
                console.log(response);
                this.success = null;
                if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
                    this.errorEmailNotExists = 'ERROR';
                } else {
                    this.error = 'ERROR';
                }
            }
        );
    }
}
