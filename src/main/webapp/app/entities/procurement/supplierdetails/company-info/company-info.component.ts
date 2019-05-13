import { Component, OnInit, Input } from '@angular/core';
import { CompanyInfoService } from './company-info.service';
import { IQuestion, Question } from './question.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TextQuestion } from './textQuestion.model';
import { DropDownQuestion } from './dropDownQuestion.model';
import { FetchData } from '../../../common/service/fetch-data';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
    selector: 'jhi-company-info',
    templateUrl: './company-info.component.html',
    styleUrls: ['./company-info.component.css']
})

/*
* question.metaOptions -> custom option ids list from question metadata
* question.optionIds -> user selected options id's
* question.customOptions -> user selected custom option ids
* questionsMap -> has original data from api
* question.selectedModel -> user selected options list
*/
export class CompanyInfoComponent implements OnInit {
    form = new FormGroup({});
    sections: any = [];
    processing = true;
    formValidation: any = {};
    isSupplier = false;
    @Input() requestId: string;

    constructor(public service: CompanyInfoService, public fetchData: FetchData) {}

    ngOnInit() {
        this.checkIfSupplier();
        this.fetchData.companyInfoQuestionnaireSections(this.requestId).subscribe(
            res => {
                this.sections = res.map(section => {
                    this.processSections(section);
                    const param = section.id.toString() + '/' + this.requestId;
                    this.fetchData.companyInfoQuestionnaireQuestions(param).subscribe(res => {
                        this.processQuestions(res);
                        section.questions = this.createQuestions(res);
                        this.addControls(section.questions);
                        this.processChildren(section.questions, section);
                    });
                    return section;
                });
                this.processing = false;
            },
            err => {}
        );
    }

    /*
    *Make children null if parent is null
    */
    handleChildren(v, q, s) {
        if (this.invalid(v) || v.length == 0) {
            if (this.valid(s.ancestorMap) && this.valid(s.ancestorMap[q]) && s.ancestorMap[q].length > 0) {
                s.ancestorMap[q].map(child => {
                    if (this.valid(this.form.get(child.toString()))) {
                        let v = {};
                        v[child] = null;
                        this.form.patchValue(v);
                    }
                    return child;
                });
            }
        }
    }

    /*
    * Checkes if user is supplier based on roles from localStorage
    */
    checkIfSupplier() {
        const acc = localStorage.getItem('jhi-account');
        if (
            acc != undefined &&
            acc.length > 0 &&
            JSON.parse(acc).authorities != undefined &&
            JSON.parse(acc).authorities != null &&
            JSON.parse(acc).authorities.indexOf('ROLE_SUPPLIER_USER') >= 0
        ) {
            this.isSupplier = true;
        }
    }

    /*
    * making rows array to itrate in html and converting metadata to object
    */
    processSections(section) {
        section.ancestorMap = {};
        let rows = [];
        section.readOnly = true;
        if (this.valid(section.numberOfRows)) {
            for (let x = 1; x <= section.numberOfRows; x++) {
                rows.push(x);
            }
            section.numberOfRows = rows;
        }
        if (section.metadata != undefined && section.metadata != null && section.metadata.length > 0) {
            section.metadata = JSON.parse(section.metadata);
        }
    }

    /*
    * converting questions and selected options metadata to object
    */
    processQuestions(res) {
        if (res.length > 0) {
            res.map(m => {
                if (this.valid(m.metadata) && m.metadata.length > 0) {
                    m.metadata = JSON.parse(m.metadata);
                }
                if (this.valid(m.selectedOptions) && Object.keys(m.selectedOptions).length > 0) {
                    for (let x in m.selectedOptions) {
                        if (this.valid(m.selectedOptions[x].metadata) && m.selectedOptions[x].metadata.length > 0) {
                            m.selectedOptions[x].metadata = JSON.parse(m.selectedOptions[x].metadata);
                        }
                    }
                }
                return m;
            });
        }
    }

    /*
    * creating relevant question object from api response
    */
    createQuestions(sectionQuestions: any[]) {
        let questions: any[] = [];
        sectionQuestions.map(m => {
            if (this.valid(m.metadata) && this.valid(m.answerType)) {
                m.metadata = typeof m.metadata == 'object' ? m.metadata : JSON.parse(m.metadata);
                if (this.invalid(m.metadata.readOnly)) {
                    m.metadata.readOnly = false;
                }
                if (this.valid(this.checkIfDropDown(m)) && !this.checkIfDropDown(m)) {
                    if (m.metadata.boxes != undefined) {
                        m.metadata.boxes.map(b => {
                            this.setInputType(b, m);
                            return b;
                        });
                    }
                    questions.push(m.answerType != 'NUMERIC' ? new TextQuestion<string>(m) : new TextQuestion<number>(m));
                } else if (this.valid(this.checkIfDropDown(m)) && this.checkIfDropDown(m)) {
                    if (
                        this.valid(m.selectedOptions) &&
                        Object.keys(m.selectedOptions).length > 0 &&
                        this.invalid(m.customOptions) &&
                        this.invalid(m.optionIds)
                    ) {
                        m.customOptions = [];
                        m.optionIds = [];
                        m.answers = m.answerType == 'MULTIPLE_SELECT' ? [] : null;

                        for (let o in m.selectedOptions) {
                            m.optionIds.push(parseInt(o));
                            if (this.valid(m.selectedOptions[o].metadata) && this.valid(m.selectedOptions[o].metadata.custom)) {
                                m.customOptions.push(m.selectedOptions[o].metadata.custom);
                            }
                            if (m.answerType == 'MULTIPLE_SELECT') {
                                m.answers.push(m.selectedOptions[o].optionValue);
                            } else {
                                m.answers = m.selectedOptions[o].optionValue;
                            }
                        }
                    }
                    if (this.valid(m.metadata) && this.valid(m.metadata.custom)) {
                        m.metaOptions = m.metadata.custom;
                    }
                    questions.push(new DropDownQuestion<any>(m));
                }
            }
            return m;
        });

        return questions;
    }

    checkIfDropDown(m) {
        if (
            m.answerType == 'DATE' ||
            m.answerType == 'TEXT' ||
            m.answerType == 'TEXT_AREA' ||
            m.answerType == 'EMAIL' ||
            m.answerType == 'WEBSITE' ||
            m.answerType == 'NUMERIC' ||
            m.answerType == 'FILE'
        ) {
            return false;
        } else if (m.answerType == 'YES_NO' || m.answerType == 'SINGLE_SELECT' || m.answerType == 'MULTIPLE_SELECT') {
            return true;
        }
        return null;
    }

    setInputType(b, m) {
        if (b.name == 'input' && m.answerType == 'EMAIL') {
            this.createEmailValidation(m);
            b.type = 'text';
        }
        if (b.name == 'input' && m.answerType == 'FILE') {
            b.type = 'file';
        } else if (b.name == 'input' && m.answerType == 'NUMERIC') {
            b.type = 'number';
        } else if (b.name == 'input' && m.answerType == 'DATE') {
            b.type = 'date';
        } else {
            b.type = 'text';
        }
    }

    createEmailValidation(m) {
        if (this.invalid(m.metadata.validation)) {
            m.metadata.validation = {};
        }
        if (this.invalid(m.metadata.validation.errors)) {
            m.metadata.validation.errors = [];
        }
        if (this.invalid(m.metadata.validation.validators)) {
            m.metadata.validation.validators = [];
        }
        if (this.invalid(m.metadata.validation.messages)) {
            m.metadata.validation.messages = {};
        }
        if (m.metadata.validation.errors.indexOf('email') == -1) {
            m.metadata.validation.errors.push('email');
        }
        if (m.metadata.validation.validators.indexOf('email') == -1) {
            m.metadata.validation.validators.push('email');
        }
        if (m.metadata.validation.messages.email == undefined) {
            m.metadata.validation.messages.email = 'Please enter a valid E-mail';
        }
    }

    addControls(questions) {
        if (this.valid(questions) && questions.length > 0) {
            questions.map(question => {
                if (this.invalid(question.metadata.validation)) {
                    question.metadata.validation = {};
                }
                let v = this.service.createValidation(question.metadata.validation);
                this.form.addControl(question.questionId.toString(), new FormControl(null, v));
                if (question.metadata.validation != undefined && question.metadata.validation.validators != undefined) {
                    this.formValidation[question.questionId] = this.form.get(question.questionId.toString());
                }
                if (question.answers != undefined) {
                    const value = {};
                    value[question.questionId] = question.answers;
                    this.form.patchValue(value);
                }
                this.createCustomOptionControls(question);
                return question;
            });
        }
    }

    /*
    * creating control for custom option for the first time
    */
    createCustomOptionControls(question) {
        if (
            this.valid(question.selectedOptions) &&
            Object.keys(question.selectedOptions).length > 0 &&
            this.valid(question.metaOptions) &&
            question.metaOptions.length > 0
        ) {
            let customOptions = question.metaOptions.filter(f => question.customOptions.indexOf(f) >= 0);
            if (this.valid(customOptions) && customOptions.length > 0) {
                customOptions.map(c => {
                    let otherAnswer = null;
                    if (this.valid(question.selectedOptions)) {
                        let selectedOption = null;
                        for (let x in question.selectedOptions) {
                            const op = question.selectedOptions[x];
                            if (
                                this.valid(op.customAnswer) &&
                                this.valid(op.metadata) &&
                                this.valid(op.metadata.custom) &&
                                c == op.metadata.custom
                            ) {
                                otherAnswer = op.customAnswer;
                            }
                        }
                    }
                    this.form.addControl(`custom_${question.questionId.toString()}_${c}`, new FormControl(otherAnswer, null));
                    this.formValidation[`custom_${question.questionId.toString()}_${c}`] = this.form.get(
                        `custom_${question.questionId.toString()}_${c}`
                    );
                    return c;
                });
            }
        }
    }

    clone(ob: any) {
        if (ob != undefined && ob != null && typeof ob == 'object') {
            return JSON.parse(JSON.stringify(ob));
        }
        return null;
    }

    valid(obj: any) {
        if (obj != undefined && obj != null) {
            return true;
        }
        return false;
    }

    invalid(obj: any) {
        if (obj == undefined || obj == null) {
            return true;
        }
        return false;
    }

    show(question, section) {
        if (this.valid(question.parentQuestionId)) {
            const parentQuestion = this.form.get(question.parentQuestionId.toString());
            if (this.invalid(parentQuestion) || this.invalid(parentQuestion.value) || parentQuestion.value.length == 0) {
                return false;
            }
        }
        return true;
    }

    makeSelectedModelFromPreselectedOptions(question) {
        if (this.valid(question.optionIds)) {
            if (this.invalid(question.selectedModel)) {
                question.selectedModel = [];
            }
            let selectedModel = question.options.filter(f => {
                return question.optionIds.indexOf(f.id) >= 0 && question.selectedModel.map(m => m.id).indexOf(f.id) == -1;
            });

            question.selectedModel = [...question.selectedModel, ...selectedModel];
        }
    }

    onOpen(question, search, open) {
        if (this.invalid(search)) {
            search = '';
        }

        if (question.optionMasterId > 0 && ((open && question.options.length == 0) || !open)) {
            //question.options=this.service.getOptions(question.optionMasterId);
            question.loading = true;
            this.fetchData.companyInfoQuestionnaireQuestionOptions(`${question.optionMasterId}?search=${search}`).subscribe(
                res => {
                    question.loading = false;
                    question.options = res.content;
                    if (this.valid(res.number)) {
                        question.page = res.number;
                    }
                    if (this.valid(res.last)) {
                        question.last = res.last;
                    }
                    if (this.valid(question.options)) {
                        question.options = question.options.map(o => {
                            if (this.valid(o) && this.valid(o.metadata) && o.metadata.length > 0) {
                                o.metadata = JSON.parse(o.metadata);
                            }
                            return o;
                        });
                        this.makeSelectedModelFromPreselectedOptions(question);
                    }
                    let oldSearch = search;
                    if (!open && oldSearch != question.search) {
                        this.onOpen(question, question.search, false);
                    }
                },
                err => {
                    question.loading = false;
                }
            );
        }
    }

    search(question) {
        if (question.search != undefined && !question.loading) {
            if (this.invalid(question.search)) {
                question.search = '';
            }
            this.onOpen(question, question.search, false);
        }
    }

    processChildren(questions, section) {
        let clone = [];
        questions.map(m => {
            clone.push(JSON.parse(JSON.stringify(m)));
            return m;
        });
        clone.map(q => {
            if (q.hasChild) {
                this.fetchData.companyInfoQuestionnaireQuestionChild(`${q.questionId}/${this.requestId}`).subscribe(res => {
                    let children: IQuestion<any>[] = res;
                    children.sort(function(a, b) {
                        return a.displayOrder - b.displayOrder;
                    });
                    children = children.map(c => {
                        c.displayOrder = q.displayOrder;
                        if (this.valid(c.row)) {
                            c.row = q.row;
                        }
                        this.createAncestorMap(section, c, q);
                        console.log(section.ancestorMap);
                        return c;
                    });
                    let ix: number;
                    section.questions.map((m, i) => {
                        if (m.questionId == q.questionId) {
                            ix = i;
                        }
                        return m;
                    });
                    children = this.createQuestions(children);
                    this.addControls(children);
                    let pre = section.questions.slice(0, ix + 1);
                    let post = section.questions.slice(ix + 1);
                    section.questions = [...pre, ...children, ...post];
                    this.processChildren(children, section);
                });
            }
            return q;
        });

        return section.questions;
    }

    /*
    * c-> child q-> question
    */
    createAncestorMap(section, c, q) {
        if (this.invalid(section.ancestorMap[q.questionId])) {
            section.ancestorMap[q.questionId] = [];
        }
        //create map with parent as key and child array as value
        if (section.ancestorMap[q.questionId].indexOf(c.questionId) == -1) {
            section.ancestorMap[q.questionId].push(c.questionId);
        }

        //collect grand children
        if (Object.keys(section.ancestorMap).length > 0) {
            for (let x in section.ancestorMap) {
                if (section.ancestorMap[x].length > 0) {
                    section.ancestorMap[x].map(mp => {
                        if (this.valid(section.ancestorMap[mp]) && section.ancestorMap[mp].length > 0) {
                            section.ancestorMap[mp].map(child => {
                                if (section.ancestorMap[x].indexOf(child) == -1) {
                                    section.ancestorMap[x].push(child);
                                }
                                return child;
                            });
                        }
                        return mp;
                    });
                }
            }
        }
    }

    minDate(question) {
        if (
            this.invalid(question.metadata) ||
            this.invalid(question.metadata.validation) ||
            this.invalid(question.metadata.validation.validators) ||
            this.invalid(question.metadata.validation.errors) ||
            question.metadata.validation.errors.indexOf('mindate') == -1 ||
            question.metadata.validation.validators.length != question.metadata.validation.errors.length
        ) {
            return '';
        }
        return new Date(question.metadata.validation.validators[question.metadata.validation.errors.indexOf('mindate')]);
    }

    maxDate(question) {
        if (
            this.invalid(question.metadata) ||
            this.invalid(question.metadata.validation) ||
            this.invalid(question.metadata.validation.validators) ||
            this.invalid(question.metadata.validation.errors) ||
            question.metadata.validation.errors.indexOf('maxdate') == -1 ||
            question.metadata.validation.validators.length != question.metadata.validation.errors.length
        ) {
            return '';
        }
        return new Date(question.metadata.validation.validators[question.metadata.validation.errors.indexOf('maxdate')]);
    }

    showOptional(section, question, c) {
        if (
            !section.readOnly &&
            !question.metadata.readOnly &&
            this.valid(this.form.get(`custom_${question.questionId.toString()}_${c}`))
        ) {
            return true;
        }
        return false;
    }

    toggleEdit(section) {
        if (section.readOnly == false) {
            this.postData(section);
        }
        if (section.readOnly) {
            section.readOnly = !section.readOnly;
        }
    }

    notValid(questions) {
        let invalid = false;
        questions.forEach(q => {
            if (this.form.get(q.questionId.toString()) != undefined && !this.form.get(q.questionId.toString()).valid) {
                invalid = true;
            }
        });
        return invalid;
    }

    /*
    *Onchange for ng select,
    * please note that ngselect emits added and removed for multiselect
    * ngselect emits change for single select
    * ngselect emits change when X is clicked for both multisect
    * when x is clicked the option value is undefined for singleselect and [] for multiselect
    */
    onChange(option, question, added, section) {
        //filtering out search event
        if (option == undefined || (option != null && !this.valid(option.target))) {
            //multi select
            //add remove
            if (this.valid(added) && question.answerType == 'MULTIPLE_SELECT' && this.valid(option)) {
                this.handleMultiSelectChange(option, question, added);
            } else if (!this.valid(added)) {
                if (this.invalid(option) || option.length == 0) {
                    this.handleChildren(null, question.questionId, section);
                }
                //change
                if (question.answerType == 'SINGLE_SELECT') {
                    question.selectedModel = option == undefined ? [] : [option];
                } else if (question.answerType == 'MULTIPLE_SELECT' && option.length == 0) {
                    this.handleMultiSelectChange(option, question, false);
                }
            }
            if (this.valid(question.selectedModel)) {
                question.customOptions = this.createCustomOptions(question);
                question.customOptions.map(c => {
                    this.handleCustomOptionControl(question, c);
                });
            }
        }
    }

    handleMultiSelectChange(option, question, added) {
        if (this.valid(option)) {
            if (this.invalid(question.selectedModel)) {
                question.selectedModel = [];
            }
            if (this.valid(option.id) || this.valid(option.value)) {
                question.selectedModel = this.valid(option.id)
                    ? question.selectedModel.filter(f => f.id != option.id)
                    : question.selectedModel.filter(f => f.id != option.value.id);
            }
            if (added) {
                question.selectedModel.push(option);
            }
        }
    }

    createCustomOptions(question) {
        /* let optionIds = []; */
        let customOptions = [];
        /*  optionIds = question.selectedModel.map(o => {
            return o.id;
        }); */
        if (this.valid(question.metaOptions)) {
            customOptions = question.selectedModel
                .filter(o => {
                    return this.valid(o.metadata) && this.valid(o.metadata.custom) && question.metaOptions.indexOf(o.metadata.custom) >= 0;
                })
                .map(m => m.metadata.custom);
        }
        return customOptions;
    }

    handleCustomOptionControl(question, c) {
        let deleteControl = false;
        if (
            this.invalid(question.metaOptions) ||
            question.customOptions.length == 0 ||
            question.metaOptions.length == 0 ||
            question.metaOptions.indexOf(c) == -1
        ) {
            deleteControl = true;
        }
        if (this.valid(this.form.get(`custom_${question.questionId.toString()}_${c}`)) && deleteControl) {
            this.form.removeControl(`custom_${question.questionId.toString()}_${c}`);
        }
        if (!deleteControl && this.invalid(this.form.get(`custom_${question.questionId.toString()}_${c}`))) {
            let otherAnswer = null;
            if (this.valid(question.selectedOptions)) {
                let selectedOption = null;
                for (let x in question.selectedOptions) {
                    const op = question.selectedOptions[x];
                    if (
                        this.valid(op.customAnswer) &&
                        this.valid(op.metadata) &&
                        this.valid(op.metadata.custom) &&
                        c == op.metadata.custom
                    ) {
                        otherAnswer = op.customAnswer;
                    }
                }
            }
            this.form.addControl(`custom_${question.questionId.toString()}_${c}`, new FormControl(otherAnswer, null));
            this.formValidation[`custom_${question.questionId.toString()}_${c}`] = this.form.get(
                `custom_${question.questionId.toString()}_${c}`
            );
        }
    }

    customAnswer(question) {
        if (
            this.valid(question) &&
            this.valid(question.metadata) &&
            (typeof question.metadata != 'string' && this.valid(question.metadata.custom))
        ) {
            let answer = '';
            if (this.valid(question.customOptions)) {
                question.customOptions.map(m => {
                    if (this.valid(this.form.get(`custom_${question.questionId.toString()}_${m}`))) {
                        if (
                            this.valid(this.form.get(`custom_${question.questionId.toString()}_${m}`).value) &&
                            this.form.get(`custom_${question.questionId.toString()}_${m}`).value.length > 0
                        ) {
                            answer += ', ' + this.form.get(`custom_${question.questionId.toString()}_${m}`).value;
                        }
                    }
                });
            }
            return answer;
        }
    }

    onFileChange(event, control) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const file = event.target.files;
            if (file != undefined && file.item(0) != undefined) {
                let fd: FormData = new FormData();
                fd.append('file', file.item(0));
                this.fetchData.companyInfoUpload(fd, control).subscribe(res => {
                    let o = {};
                    o[control] = res;
                    this.form.patchValue(o);
                });
            }
        }
    }

    onScrollToEnd(question) {
        if (this.valid(question.options) && question.options.length > 0 && !question.last) {
            if (this.invalid(question.search)) {
                question.search = '';
            }
            question.loading = true;
            this.fetchData
                .companyInfoQuestionnaireQuestionOptions(`${question.optionMasterId}?search=${question.search}&page=${question.page + 1}`)
                .subscribe(
                    res => {
                        question.loading = false;
                        if (this.valid(res.content)) {
                            let resOptions = res.content.slice(0);
                            resOptions = resOptions.map(o => {
                                if (this.valid(o) && this.valid(o.metadata) && o.metadata.length > 0) {
                                    o.metadata = JSON.parse(o.metadata);
                                }
                                return o;
                            });
                            question.options = [...question.options, ...resOptions];
                            this.makeSelectedModelFromPreselectedOptions(question);
                        }
                        if (this.valid(res.number)) {
                            question.page = res.number;
                        }
                        if (this.valid(res.last)) {
                            question.last = res.last;
                        }
                    },
                    err => {
                        question.loading = false;
                    }
                );
        }
    }

    getFileName(value: any) {
        if (value != undefined && value != null && value.length > 0 && value.indexOf('_') >= 0 && value.split('_').length > 2) {
            const a = value.split('_')[0] + '_';
            const b = value.split('_')[1] + '_';
            return value.replace(a + b, '');
        } else {
            return value;
        }
    }

    postData(section) {
        let sectionClone = this.clone(section);
        let questionsMap = {};
        let children = [];
        let payload = [];
        if (this.valid(sectionClone.questions) && sectionClone.questions.length > 0) {
            for (var x in sectionClone.questions) {
                let questionWithType = this.createQuestions([sectionClone.questions[x]])[0];
                // making a map for easy access
                let ob: any = {};
                const id = sectionClone.questions[x].questionId;
                if (this.form.get(id.toString()) != undefined) {
                    ob.value = this.form.value[id];
                    ob.question = questionWithType; //IQuestion<T>
                    questionsMap[id] = ob;
                }
            }
        }
        this.constructPayload(questionsMap, payload);
        const param = sectionClone.id.toString();
        this.fetchData.companyInfoAnswers(payload, param).subscribe(res => {
            section.readOnly = true;
        });
    }

    constructPayload(questionsMap, payload) {
        for (var x in questionsMap) {
            if (this.valid(questionsMap[x])) {
                if (this.valid(questionsMap[x].question.optionIds)) {
                    this.createOptionIdsForPost(questionsMap[x]);
                }
                //actual payload construction for dropdown questions
                if (this.valid(questionsMap[x].optionIds) && questionsMap[x].optionIds.length > 0) {
                    questionsMap[x].optionIds.map(opId => {
                        let ob: any = {};
                        ob.questionId = x;
                        ob.answerType = questionsMap[x].question.answerType;
                        ob.file = null;
                        ob.answer = null;
                        this.handleCustomOptionForPost(questionsMap[x], x, ob, opId);
                        if (this.invalid(ob.answer) || ob.answer.length == 0) {
                            ob.answer = null;
                        }
                        ob.optionId = opId;
                        payload.push(ob);
                        return opId;
                    });
                } else {
                    let ob: any = {};
                    ob.questionId = x;
                    ob.answerType = questionsMap[x].question.answerType;
                    ob.file = null;
                    ob.answer = questionsMap[x].value;
                    ob.optionId = null;
                    if (this.invalid(ob.answer) || ob.answer.length == 0) {
                        ob.answer = null;
                    }
                    payload.push(ob);
                }
            }
        }
    }

    /*
    *creating optionIds for questionsMap
    *x is questionId
    */
    createOptionIdsForPost(questionsMapOb) {
        // User did changes
        if (this.valid(questionsMapOb.question.selectedModel)) {
            let options = questionsMapOb.question.selectedModel;
            let optionsArray = [];
            //multiselect
            if (typeof questionsMapOb.value == 'object' && this.valid(questionsMapOb.value)) {
                questionsMapOb.value.forEach(p => {
                    let arr = options.filter(o => o.optionValue == p).map(m => m.id);
                    optionsArray = [...optionsArray, ...arr];
                });
                //single select
            } else if (this.valid(questionsMapOb.value)) {
                optionsArray = options.filter(o => o.optionValue == questionsMapOb.value).map(m => m.id);
            }
            questionsMapOb.optionIds = optionsArray;
            this.addPreselectdOptionsIfNotFetched(questionsMapOb);
            // No user changes
        } else if (this.valid(questionsMapOb.question.optionIds)) {
            questionsMapOb.optionIds = questionsMapOb.question.optionIds;
        }
    }

    /*
    *x is questionId
    */
    addPreselectdOptionsIfNotFetched(questionsMapOb) {
        if (
            this.valid(questionsMapOb.question.optionIds) &&
            questionsMapOb.question.optionIds.length > 0 &&
            this.valid(questionsMapOb.optionIds) &&
            this.valid(this.form.value[questionsMapOb.question.questionId.toString()]) &&
            this.form.value[questionsMapOb.question.questionId.toString()].length > 0
        ) {
            let unfetchedButAnsweredOptions = questionsMapOb.question.optionIds.filter(ops => {
                return questionsMapOb.optionIds.indexOf(ops) == -1;
            });
            if (unfetchedButAnsweredOptions.length > 0 && questionsMapOb.answerType == 'MULTIPLE_SELECT') {
                questionsMapOb.optionIds = [...questionsMapOb.optionIds, ...unfetchedButAnsweredOptions];
            }
        }
    }

    handleCustomOptionForPost(questionsMapOb, questionId, ob, opId) {
        //custom answer if options are populated
        if (
            this.valid(questionsMapOb.question.metadata) &&
            this.valid(questionsMapOb.question.metadata.custom) &&
            this.valid(questionsMapOb.question.options) &&
            this.valid(questionsMapOb.question.selectedModel) &&
            this.valid(questionsMapOb.question.customOptions) &&
            this.valid(questionsMapOb.question.metaOptions) &&
            questionsMapOb.question.selectedModel.length > 0
        ) {
            questionsMapOb.question.selectedModel.map(qmo => {
                if (this.valid(qmo.metadata) && this.valid(qmo.metadata.custom)) {
                    let customId = qmo.metadata.custom;
                    if (
                        questionsMapOb.question.customOptions.indexOf(customId) >= 0 &&
                        questionsMapOb.question.metaOptions.indexOf(customId) >= 0
                    ) {
                        ob.answer =
                            opId == qmo.id ? this.form.value[`custom_${questionsMapOb.question.questionId.toString()}_${customId}`] : null;
                    }
                }
            });
            //custom answer if options are not populated
        } else if (
            (this.invalid(questionsMapOb.question.options) || questionsMapOb.question.options.length == 0) &&
            this.valid(questionsMapOb.question.metadata) &&
            this.valid(questionsMapOb.question.metadata.custom) &&
            this.valid(questionsMapOb.question.selectedOptions) &&
            Object.keys(questionsMapOb.question.selectedOptions).length > 0 &&
            this.valid(questionsMapOb.question.customOptions) &&
            this.valid(questionsMapOb.question.metaOptions)
        ) {
            for (let option in questionsMapOb.question.selectedOptions) {
                if (
                    this.valid(questionsMapOb.question.selectedOptions[option].metadata) &&
                    this.valid(questionsMapOb.question.selectedOptions[option].metadata.custom)
                ) {
                    let answer = null;
                    let customId = questionsMapOb.question.selectedOptions[option].metadata.custom;
                    if (
                        option == opId &&
                        questionsMapOb.question.customOptions.indexOf(customId) >= 0 &&
                        questionsMapOb.question.metaOptions.indexOf(customId) >= 0
                    ) {
                        ob.answer = this.valid(this.form.get(`custom_${questionId.toString()}_${customId}`))
                            ? this.form.get(`custom_${questionId.toString()}_${customId}`).value
                            : answer;
                    }
                }
            }
        }
    }
}
