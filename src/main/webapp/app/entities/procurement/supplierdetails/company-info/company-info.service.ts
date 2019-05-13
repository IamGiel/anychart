import { Injectable } from '@angular/core';
import { IQuestion } from './question.model';
import { Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CompanyInfoService {
    constructor() {}

    createValidation(validation: any) {
        let v = [];
        let i = 0;

        if (
            validation != undefined &&
            validation.errors != undefined &&
            validation.validators != undefined &&
            validation.validators.length == validation.errors.length
        ) {
            validation.errors.map(e => {
                let val = validation.validators[i];
                if (e == 'required' && val == true) {
                    v.push(Validators.required);
                }
                if (e == 'minlength' && val != undefined) {
                    v.push(Validators.minLength(val));
                }
                if (e == 'maxlength' && val != undefined) {
                    v.push(Validators.maxLength(val));
                }
                if (e == 'max' && val != undefined) {
                    v.push(Validators.max(val));
                }
                if (e == 'min' && val != undefined) {
                    v.push(Validators.min(val));
                }
                if (e == 'email' && val != undefined) {
                    v.push(Validators.email);
                }
                if (e == 'pattern' && val != undefined) {
                    v.push(Validators.pattern);
                }
                i++;
                return e;
            });
        }
        return v.length > 0 ? v : null;
    }
}
