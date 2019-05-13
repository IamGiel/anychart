import { Question } from './question.model';
export class DropDownQuestion<T> extends Question<T> {
    multiselect = false;
    loading = false;
    options: any[] = [];
    optionIds: any[];
    answerList: string[] = null;
    dispalyModel: string[] = null;
    otherAnswer: string = null;
    selectedOptions: any;
    customOptions: any; //map of custom option ids selected by user
    metaOptions: any;
    last = false;
    page: number;
    selectedModel: any = [];
    search: any = null;
    constructor(options: any = {}) {
        super(options);
        this.answers = options['answers'] || null;
        this.optionIds = options['optionIds'] || [];
        this.options = options['options'] || [];
        this.dispalyModel = options['dispalyModel'] || null;
        this.otherAnswer = options['otherAnswer'] || null;
        this.customOptions = options['customOptions'] || [];
        this.selectedOptions = options['selectedOptions'] || null;
        this.metaOptions = options['metaOptions'] || [];
        this.last = options['last'] || false;
        this.page = options['page'] || 0;
        this.selectedModel = options['selectedModel'] || null;
        this.search = options['search'] || null;
        if (this.answerType == 'MULTIPLE_SELECT') {
            this.multiselect = true;
            this.answerList = options['answerList'] || [];
        }
    }
}
