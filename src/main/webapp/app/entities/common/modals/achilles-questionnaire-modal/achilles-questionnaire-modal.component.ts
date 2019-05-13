// import { Component, OnInit, Input } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionnaireService } from '../../../../achilles/achilles-questions/questionnaire.service';
import { QuestionnairesControlService } from '../../../../achilles/achilles-form/questionnaires-control.service';

import { QuestionBase } from '../../../../achilles/achilles-form/question-base';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
/* import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { toggler, toggler2 } from '../../../../animations/toggle.animation'; */
import { ToastrService } from 'ngx-toastr';
import { AchillesQuestionnaireService } from './achilles-questionnaire.service';
import { FetchData } from '../../service/fetch-data';

import * as util from 'util';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';

import { BaseColorService } from '../../service/base-color-service';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'fileName' })
export class FileNamePipe implements PipeTransform {
    transform(value: any) {
        if (value != undefined && value != null && value.length > 0 && value.indexOf('_') >= 0 && value.split('_').length > 2) {
            const a = value.split('_')[0] + '_';
            const b = value.split('_')[1] + '_';
            return value.replace(a + b, '');
        } else {
            return value;
        }
    }
}
@Component({
    selector: 'jhi-achilles-questionnaire-modal',
    templateUrl: './achilles-questionnaire-modal.component.html',
    styleUrls: ['./achilles-questionnaire-modal.component.css'],
    providers: [QuestionnaireService] /* ,
    animations: [toggler, toggler2] */
})
export class AchillesQuestionnaireModalComponent implements OnInit {
    successMsg = '';
    updatedFormValues: any = {};
    state: string = 'small';
    state2: string = 'small';
    state3: string = 'small';
    model = {};
    payload = {};
    respSelected;
    filename: string = null;
    clickIcon = false;

    disableCheck = false;

    // flagged questions requiring a file upload depedning on user repsonse
    respondYes;
    respondToFL1;
    respondToFL2;
    respondToFL8;
    respondToFL7;

    respondToEthical1;
    respondToEthical3;
    respondToEthical4;

    showQ4 = false;
    showQ3 = false;
    showFileUpload = false;

    showFileUploadFL9 = false;

    // validations
    requiredStatus1 = false;
    requiredStatus2 = false;

    // on saved btn
    saveBtnHSSEForm = false;
    savedHSSEForm = false;
    saveBtnFLForm = false;
    savedFLForm = false;
    saveBtnEthForm = false;
    savedEthForm = false;

    completedHSSEForm = false;
    completedFLForm = false;
    completedETHForm = false;

    HSSEForm: FormGroup;
    FLForm: FormGroup;
    EthicalForm: FormGroup;
    questionHsse: QuestionBase<any>[] = [];
    questionFL: QuestionBase<any>[] = [];
    questionEthical: QuestionBase<any>[] = [];

    multiSelection: any;
    showContainer = false;
    selectedItems = [];
    disableBtn = false;
    showAlert = false;

    ohsas18001 = false;
    showFL2 = false;
    showFL3 = false;
    showFL6 = false;
    showFL9 = false;

    showFL8 = false;

    showETH2 = false;
    showETH4 = false;
    showETH5 = false;
    showETH6 = false;

    hideFLForm: any;
    hideFLFormCheckbox = false;
    hideHSFormCheckbox = false;
    hideETFormCheckbox = false;
    hideRTWFormCheckbox = false;
    hideComplete = false;
    checkHS = false;
    checkFL;
    checkET;
    flComplete;
    file: any;
    inputValue2: any;
    inputValue: any;

    // activate questions with prev answers
    hs1 = false;

    files: FileList;
    showFile = false;
    selectedValue = [];
    type = 'default';
    hsse2Questions: any;
    today = Date.now();
    constructor(
        private aqs: AchillesQuestionnaireService,
        private toastr: ToastrService,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal,
        private service: QuestionnaireService,
        private qcs: QuestionnairesControlService,
        private fetchData: FetchData,
        private bcs: BaseColorService
    ) {
        this.questionHsse = service.getHSSEQuestions();
        this.hsse2Questions = this.questionHsse.filter(f => f.key == 'HSSE2')[0];

        // this.questionFL = service.getForcedLabourQuestions();
        // this.questionEthical = service.getEthicalQuestions();
    }
    limitPercent(e) {
        let value = e.target.value;
        value = value < 0 ? 0 : value;
        value = value > 100 ? 100 : value;
        this.HSSEForm.patchValue({ Ethical2: value });
    }
    ngOnInit() {
        // this.remindUser = false
        this.type = this.bcs.isProc();

        this.HSSEForm = this.qcs.toFormGroup(this.questionHsse);
        //this.filename = this.HSSEForm.controls.file.value();
        this.HSSEForm.valueChanges.subscribe(data => {
            let ob: any = {};
            this.respondYes = data.HSSE1;
            if (this.respondYes === 'Yes') {
                this.showQ4 = true;
                this.showQ3 = false;
                ob.HSSE3 = 'Select';
            } else if (this.respondYes === 'No') {
                this.showQ4 = false;
                this.showQ3 = true;
                ob.HSSE4 = 'Select';
            } else if (this.respondYes === 'Select') {
                this.showQ4 = false;
                this.showQ3 = false;
                ob.HSSE4 = 'Select';
                ob.HSSE3 = 'Select';
            }
            this.respondToFL1 = data.FL1;
            this.respondToFL2 = data.FL2;
            this.respondToFL8 = data.FL8;

            this.respondToFL7 = data.FL7;
            if (this.respondToFL1 === 'No') {
                this.showFL2 = true;
            } else if (this.respondToFL1 === 'Yes' || this.respondToFL1 === 'Select') {
                this.showFL2 = false;
                ob.FL2 = 'Select';
                if (this.respondToFL1 === 'Yes') {
                    this.showFL6 = true;
                }
                if (this.respondToFL1 === 'Select') {
                    this.showFL6 = false;
                }
            }

            if (
                (this.respondToFL2 === 'No' || this.respondToFL2 === 'Select') &&
                (this.respondToFL1 === 'No' || this.respondToFL1 === 'Select')
            ) {
                this.showFL6 = false;
                ob.FL6 = 'Select';
            } else if (this.respondToFL2 === 'Yes' && this.respondToFL1 === 'No') {
                this.showFL6 = true;
            }

            if (this.respondToFL7 === 'Yes') {
                this.showFL8 = true;
            } else if (this.respondToFL7 === 'No' || this.respondToFL7 === 'Select') {
                this.showFL8 = false;
                this.showFL9 = false;
                ob.FL8 = 'Select';
                ob.FL9 = 'Select';
            }

            if (this.respondToFL8 === 'No' || this.respondToFL8 === 'Select') {
                this.showFL9 = false;
                ob.FL9 = 'Select';
            } else if (this.respondToFL8 === 'Yes' && this.respondToFL7 === 'Yes') {
                this.showFL9 = true;
            }

            this.respondToEthical1 = data.Ethical1;
            this.respondToEthical3 = data.Ethical3;
            this.respondToEthical4 = data.Ethical4;

            if (this.respondToEthical1 === 'Yes') {
                this.showETH2 = true;
            } else if (this.respondToEthical1 === 'No' || this.respondToEthical1 === 'Select') {
                this.showETH2 = false;
                ob.Ethical2 = 'Select';
            }

            if (this.respondToEthical3 === 'Yes') {
                // alert('respondToEthical3 ');
                this.showETH4 = true;
            } else if (
                this.respondToEthical3 === 'No' ||
                this.respondToEthical4 === 'No' ||
                this.respondToEthical3 === 'Select' ||
                this.respondToEthical4 === 'Select'
            ) {
                this.showETH4 = false;
                this.showETH5 = false;
                this.showETH6 = false;
                ob.Ethical4 = 'Select';
                ob.Ethical5 = '';
                ob.Ethical6 = 'Select';
            }
            if (this.respondToEthical4 === 'Yes' && this.respondToEthical3 === 'Yes') {
                this.showETH5 = true;
                this.showETH6 = true;
            } else if (
                this.respondToEthical4 === 'No' ||
                this.respondToEthical3 === 'No' ||
                this.respondToEthical3 === 'Select' ||
                this.respondToEthical4 === 'Select'
            ) {
                this.showETH5 = false;
                this.showETH6 = false;
                ob.Ethical5 = '';
                ob.Ethical6 = 'Select';
            }
            this.updatedFormValues = ob;
            //submit validation
            if (
                this.showETH5 &&
                (data.Ethical5 == undefined ||
                    data.Ethical6 == null ||
                    data.Ethical6 == '' ||
                    data.Ethical6 == null ||
                    data.Ethical6 == undefined ||
                    data.Ethical6 == '' ||
                    isNaN(Date.parse(data.Ethical6)))
            ) {
                this.disableCheck = true;
            } else {
                this.disableCheck = false;
            }
        });

        const r = this.aqs.getSavedData();
        if(this.valid(r)&&this.valid(r.dataPointResponseList)&&this.valid(r.dataPointResponseList[0])&&this.valid(r.dataPointResponseList[0].status)){
            const status =r.dataPointResponseList[0].status;
            this.checkHS = status == 'AUDIT_DONE' ? true : false;
            if (status == 'AUDIT_DONE') {
                this.hideComplete = true;
                this.HSSEForm.disable();
            }
        }
        if (r != null && r.achillesQuestionResponseList != null) {
            let newObj: any = {};
            r.achillesQuestionResponseList.forEach(obj => {
                if (obj.response == 'true' || obj.response == 'false') {
                    obj.response = obj.response == 'true' ? true : false;
                }
                if (obj.question == 'file') {
                    newObj.Ethical5 = obj.response;
                } else if (obj.question == 'HSSE2') {
                    let names = JSON.parse(obj.response);
                    names.forEach(n => {
                        let filter = this.hsse2Questions.options.filter(f => f.value == n.name)[0];
                        if (n.name != undefined && filter != undefined) {
                            newObj[filter.key] = true;
                        }
                    });
                } else {
                    newObj[obj.question] = obj.response;
                }
            });
            this.HSSEForm.patchValue(newObj);
        }
    }

    valid(o:any){
        if(o!=undefined&&o!=null){
            return true;
        }
        return false;
    }

    change(e) {}

    showCheckboxes() {
        if (this.selectedItems.length === 0) {
            this.disableBtn = false;
        }
        if (this.selectedItems.length > 0) {
            this.disableBtn = true;
        }
    }

    onSlctdBox(item, $event) {
        let index = this.selectedItems.indexOf(item.id);
        if (item.checked === true) {
            this.selectedItems.push(item.id);
            this.showAlert = false;
        }
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }

        if (this.selectedItems.length > 0) {
            this.disableBtn = true;
        } else if (this.selectedItems.length === 0) {
            this.disableBtn = false;
            this.showAlert = true;
        }
    }

    drpDwnArrow() {
        if (this.showContainer) {
            return 'arrowdown';
        } else {
            return 'arrowleft';
        }
    }
    closeModal() {
        this.activeModal.close('Modal Closed');
    }
    openHSform() {
        this.hideHSFormCheckbox = !this.hideHSFormCheckbox;
    }
    openFLform() {
        this.hideFLFormCheckbox = !this.hideFLFormCheckbox;
    }
    openETform() {
        this.hideETFormCheckbox = !this.hideETFormCheckbox;
    }
    openRTWform() {
        this.hideRTWFormCheckbox = !this.hideRTWFormCheckbox;
    }
    testCheckBoxHS($event) {
        this.checkHS = $event.target.checked;
        console.log('this is checkHS ' + this.checkHS);
        if (this.checkHS) {
            this.savedHSSEForm = true;
            this.completedHSSEForm = true;
            this.HSSEForm.disable();
        } else {
            this.HSSEForm.enable();
        }
    }

    onSubmitHsse() {
        this.saveBtnHSSEForm = true;
        //this.toastr.success('Saving Responses!');
        let newArr: any = [];
        this.savedHSSEForm = true;
        this.completedHSSEForm = true;
        let formValues = this.HSSEForm.value;
        console.log(this.HSSEForm.value);
        let hsse2Options = [];

        Object.keys(formValues).forEach(key => {
            if (this.updatedFormValues[key] != undefined) {
                formValues[key] = this.updatedFormValues[key];
            }
            let newObj: any = {};
            newObj.question = key;
            newObj.response = formValues[key];

            //no file name no file - remove from payload - no file uploaded
            //file name '' and no file - remove file
            //file name not null and file - update file
            //file name and no file - do nothing

            if (key == 'Ethical5' && formValues[key] != null) {
                newObj.question = 'file';
                if (this.file != undefined && this.file != null) {
                    newObj.response = formValues[key];
                } else if (formValues[key] != null) {
                    newObj.response = formValues[key] == '' ? null : formValues[key];
                }
            }
            if (key.indexOf('HSSE2-') == -1) {
                newArr.push(newObj);
            } else if (formValues[key] != null && formValues[key]) {
                let o: any = {};
                o.name = this.hsse2Questions.options.filter(f => f.key == key)[0].value;
                hsse2Options.push(o);
            }
        });

        if (hsse2Options.length > 0) {
            let newObj: any = {};
            newObj.question = 'HSSE2';
            newObj.response = JSON.stringify(hsse2Options);
            newArr.push(newObj);
        }

        let payload: any = {};
        payload.achillesQuestionResponseList = newArr;
        payload.isSubmitted = this.checkHS;
        let fd: FormData = new FormData();
        if (this.file != undefined) {
            fd.append('file', this.file);
        }

        fd.append('payload', JSON.stringify(payload));

        this.fetchData.saveQuestionnaire(fd, this.aqs.getRequestId()).subscribe(() => {
            this.aqs.callBackend(this.aqs.getRequestId()).subscribe(
                r => {
                    this.aqs.saveData(r);
                    this.closeModal();
                },
                r => {
                    this.closeModal();
                }
            );
        });

        //  localStorage.setItem('mockDataSubmitted', JSON.stringify([payload]));
    }

    shwLink() {
        this.clickIcon = !this.clickIcon;
    }

    /*   animateMe() {
        this.state = this.state === 'large' ? 'small' : 'large';
    }
    animateMe2() {
        this.state2 = this.state2 === 'large' ? 'small' : 'large';
    }
    animateMe3() {
        this.state3 = this.state3 === 'large' ? 'small' : 'large';
    } */

    onFileChange(event, control) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const file = event.target.files;
            if (file != undefined && file.item(0) != undefined) {
                this.file = file.item(0);
                let o = {};
                o[control] = this.file.name;
                console.log(o);
                this.HSSEForm.patchValue(o);
            }
        }
    }
}
