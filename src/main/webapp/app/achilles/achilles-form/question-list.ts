import { QuestionBase } from './question-base';

export class MultipleSelectQuestion extends QuestionBase<string> {
    controlType = 'selectpicker';
    options: { key: string; value: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
