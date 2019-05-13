import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase<string> {
    controlType = 'date';
    type;
    // options: { key: string; value: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.type = 'date';
    }
}
