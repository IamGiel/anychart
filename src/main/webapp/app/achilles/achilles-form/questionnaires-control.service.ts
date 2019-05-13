import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';
import { IfStmt } from '@angular/compiler';
@Injectable({
    providedIn: 'root'
})
export class QuestionnairesControlService {
    constructor() {}

    toFormGroup(questions: QuestionBase<any>[]) {
        let group: any = {};
        const excludes = ['FL1', 'FL2', 'FL3', 'FL6', 'FL7', 'FL8', 'FL9', 'Ethical1', 'Ethical2'];
        questions.forEach(question => {
            const q: any = question;
            let initVal: any;
            if (q.type != undefined) {
                switch (q.type) {
                    case 'select': {
                        initVal = 'Select';
                        break;
                    }
                    case 'checkbox': {
                        initVal = false;
                        break;
                    }

                    default: {
                        initVal = null;
                        break;
                    }
                }
            }
            if (excludes.indexOf(q.key) == -1) {
                if (q.key == 'HSSE2') {
                    console.log(question);
                    q.options.forEach((o, i) => {
                        group[`${question.key}-${i}`] = q.required
                            ? new FormControl(initVal, Validators.required)
                            : new FormControl(initVal);
                    });
                } else {
                    group[q.key] = q.required ? new FormControl(initVal, Validators.required) : new FormControl(initVal);
                    console.log('THIS QUESTION.KEY >>>> ', group[q.key] + initVal);
                }
            }
        });
        return new FormGroup(group);
    }
}
