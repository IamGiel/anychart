import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../achilles-form/question-dropdown';
import { QuestionBase } from '../achilles-form/question-base';
import { TextboxQuestion } from '../achilles-form/question-textbox';
import { NumericQuestion } from '../achilles-form/question-numeric';
import { DateQuestion } from '../achilles-form/question-date';
import { UploadForm } from '../achilles-form/question-fileupload';
import { MultipleSelectQuestion } from '../achilles-form/question-list';
import { CountryLists } from '../achilles-form/question-country';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {
    // countryList = CountryLists;

    constructor() {}

    getHSSEQuestions() {
        let questions: QuestionBase<any>[] = [
            new DropdownQuestion({
                key: 'HSSE1',
                label: 'Does your organisation have a documented Health and Safety Management System (HSS)?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                type: 'select',
                order: 2
            }),
            new TextboxQuestion({
                key: 'HSSE2',
                label: "Please select the recognised standard that your organisation's Health and Safety Management System is aligned to: ", // value: '',
                options: [
                    { key: 'HSSE2-0', value: 'OHSAS 18001' },
                    { key: 'HSSE2-1', value: 'ISO45001' },
                    { key: 'HSSE2-2', value: 'OHSAS 18002' },
                    { key: 'HSSE2-3', value: 'AS / NZS 4801' },
                    { key: 'HSSE2-4', value: 'International Labor' },
                    { key: 'HSSE2-5', value: 'Organization ILO-OSH 2001' },
                    { key: 'HSSE2-6', value: 'Other' }
                ],
                type: 'checkbox', // required: true,
                order: 1
            }),

            new DropdownQuestion({
                // if question 1  = no
                key: 'HSSE3',
                label: 'Is there a policy statement in place relating to the health and safety management of your organisation?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                type: 'select',
                order: 4
            }),
            new DropdownQuestion({
                // if question 2  = yes
                key: 'HSSE4',
                label: 'Does your organisation monitor the performance of its Health and Safety Management Systems?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                type: 'select',
                order: 3
            }),
            new DropdownQuestion({
                key: 'FL1',
                type: 'select',
                label: 'Does your organisation have a documented Corporate Social Responsibility (CSR) system?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 5
            }),
            new DropdownQuestion({
                // if FL1 is no -> show this question
                key: 'FL2',
                type: 'select',
                label:
                    "Does your company have in place a policy statement or code of conduct relating to the company's Corporate Social Responsibility? ",
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 6
            }),
            new DropdownQuestion({
                key: 'FL3',
                type: 'select',
                label: 'Does your organisation have a documented purchasing/procurement policy in place?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 7
            }),
            new DropdownQuestion({
                key: 'FL6',
                type: 'select',
                label: "Does your organisation's CSR system, policy or code of conduct also apply to its supply chain?",
                options: [
                    {
                        key: 'Response1',
                        value: 'Yes. There is a separate documented policy applied to the supply chain.'
                    },
                    {
                        key: 'Response2',
                        value: "Our organisation's CSR policy is shared with, but does not govern, our supply chain suppliers and partners."
                    },
                    {
                        key: 'Response3',
                        value:
                            "Our organisation's CSR policy is shared only as part of general communications to shareholders and external stakeholders."
                    },
                    {
                        key: 'Response4',
                        value:
                            'Our CSR system, policy or code applies to internal processes only and is not formally shared or communicated outside our organisation.'
                    }
                ],
                order: 10
            }),
            new DropdownQuestion({
                key: 'FL7',
                type: 'select',
                label: 'Does your organisation have a documented purchasing/procurement policy in place?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 11
            }),
            new DropdownQuestion({
                // if FL7 is Yes -> show this question
                key: 'FL8',
                type: 'select',
                label: "Does your organisation's policy cover sustainable purchasing/procurement?",
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 12
            }),
            new DropdownQuestion({
                // if FL8 is Yes -> show this question
                key: 'FL9',
                type: 'select',
                label: 'Is your sustainable procurement policy aligned to any externally recognised guidance (eg: ISO20400)',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 13
            }),
            new DropdownQuestion({
                key: 'Ethical1',
                type: 'select',
                label:
                    'Where it is legal to do so, are workers free to join trade unions, worker committees or other collective bargaining organisations of their choice?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 14
            }),
            new NumericQuestion({
                // if Ethical1 is Yes -> show this question
                key: 'Ethical2',
                type: 'number',
                label: "What percentage of your organisation's workforce is covered by collective bargaining agreements?",
                order: 15
            }),
            new DropdownQuestion({
                // options: [{ key: 'Select', value: 'Select' },{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                key: 'Ethical3',
                label: 'Is your organisation subject to the Modern Slavery Act 2015? ',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 16,
                type: 'select'
            }),
            new DropdownQuestion({
                // if Ehtical3 is Yes -> show this qustion
                key: 'Ethical4',
                label: 'Does your organisation produce and publish an annual slavery and human trafficking statement?  ',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 17,
                type: 'select'
            }),
            new UploadForm({
                // if Ehtical4 is Yes -> show this qustion
                key: 'Ethical5',
                type: 'file',
                label: "Please upload a copy of your organisation's most recent statement (pdf file, doc file) ",
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 18
            }),
            new DateQuestion({
                // if Ehtical4 is Yes -> show this qustion too
                key: 'Ethical6',
                type: 'date',
                label: 'Publish date: ',
                order: 19
            }),
            new DropdownQuestion({
                // if Ehtical3 is Yes -> show this qustion
                key: 'RTW1',
                label:
                    'Does your organisation have a process to ensure that personnel recruited are entitled to work in the country of operation?',
                options: [{ key: 'Select', value: 'Select' }, { key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
                order: 20,
                type: 'select'
            })
        ]; // options: [{ key: 'Select', value: 'Select' },{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
        return questions.sort((a, b) => a.order - b.order);
    }
}
