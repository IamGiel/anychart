import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './question-base';
import { QuestionnairesControlService } from './questionnaires-control.service';
import { toggler } from '../../animations/toggle.animation';

@Component({
    selector: 'jhi-achilles-form',
    templateUrl: './achilles-form.component.html',
    styleUrls: ['./achilles-form.component.css'],
    animations: [toggler]
})
export class AchillesFormComponent implements OnInit {
    state: string = 'small';
    @Input() questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor(private qcs: QuestionnairesControlService) {}

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
        this.form.valueChanges.subscribe(data => {
            console.log('data ', data);
        });
    }

    animateMe() {
        this.state = this.state === 'large' ? 'small' : 'large';
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
        if (this.form.valid) {
            // alert('hey');
            // this.animateMe();
        }
    }
}
