import { QuestionBase } from './question-base';

export class NumericQuestion extends QuestionBase<number> {
    controlType = 'number';
    type;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || 'number';
    }
}
