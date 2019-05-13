import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../achilles-form/question-base';
@Component({
    selector: 'jhi-achilles-questions',
    templateUrl: './achilles-questions.component.html',
    styleUrls: ['./achilles-questions.component.css']
})
export class AchillesQuestionsComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    get isValid() {
        return this.form.controls[this.question.key].valid;
    }
}
