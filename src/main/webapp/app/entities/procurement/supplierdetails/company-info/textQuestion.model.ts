import { Question } from './question.model';
export class TextQuestion<T> extends Question<T> {
    constructor(options: any = {}) {
        super(options);
        this.answers = options['answers'] || null;
    }
}
