import { QuestionBase } from './question-base';

export class UploadForm extends QuestionBase<number> {
    controlType = 'file';
    type;

    constructor(options: {} = {}) {
        super(options);
        this.type = 'file';
    }
}
