export interface IQuestion<T> {
    questionId?: number;
    question?: string;
    answerType?: string;
    displayOrder?: number;
    hasChild?: boolean;
    sectionId?: number;
    optionMasterId?: number;
    metadata?: any;
    answers?: T;
    parentQuestionId?: number;
    row?: number;
}
export class Question<T> implements IQuestion<T> {
    questionId?: number;
    question?: string;
    answerType?: string;
    displayOrder?: number;
    hasChild?: boolean;
    sectionId?: number;
    optionMasterId?: number;
    metadata?: any;
    answers?: T;
    parentQuestionId?: number;
    row?: number;
    constructor(
        options: {
            questionId?: number;
            question?: string;
            answerType?: string;
            displayOrder?: number;
            hasChild?: boolean;
            sectionId?: number;
            optionMasterId?: number;
            metadata?: any;
            answers?: T;
            parentQuestionId?: number;
            row?: number;
        } = {}
    ) {
        this.questionId = options.questionId || null;
        this.question = options.question || '';
        this.answerType = options.answerType || '';
        this.displayOrder = options.displayOrder || null;
        this.hasChild = options.hasChild || false;
        this.sectionId = options.sectionId || null;
        this.optionMasterId = options.optionMasterId || null;
        this.metadata = options.metadata || {};
        this.answers = options.answers || null;
        this.parentQuestionId = options.parentQuestionId || null;
        this.row = options.row || null;
    }
}
