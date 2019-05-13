import { Component, OnInit, ViewChild } from '@angular/core';
// import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective, FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';

import { Router } from '@angular/router';

// import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
//import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

//import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { truncateSync } from 'fs';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { UploadService } from './upload.service';
import { WindowRef } from 'app/core/tracker/window.service';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { ProcurementFaqModalComponent } from '../../common/modals/procurement-faq-modal/procurement-faq-modal.component';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const URL = 'compliance/api/file/process';

@Component({
    selector: 'jhi-upload-supplier',
    templateUrl: './upload-supplier.component.html',
    styleUrls: ['./upload-supplier.component.css']
})
export class UploadSupplierComponent implements OnInit {
    // show next button
    enableNxtBtn = false;
    fileIshovered = false;
    fileContainer = [];
    hideBrowseBtn = false;
    skipBtn = false;
    hideInstruction = false;
    slctCorrctFile = true;
    percentTrack1: number;
    percentTrack2: number;
    btnColor: string;
    // activeBtnColor = '#ffffff';
    blurNotes: number;
    progress: number;
    httpEmitter: Subscription;
    httpEvent: HttpEvent<Event>;

    //taskCancel: AngularFireUploadTask;

    // Progress monitoring
    percentage: Observable<number>;

    snapshot: Observable<any>;

    // Download URL
    downloadURL: Observable<string>;

    // State for dropzone CSS toggling
    isHovering: boolean;

    passFilter = false;
    errWhileUpload: string = '';
    uploader: FileUploader;
    successUpload: boolean;
    errorUpload: boolean;
    errMsg: string;
    isOpen = false;
    constructor(
        private router: Router,
        // private storage: AngularFireStorage,
        // private db: AngularFirestore,
        private localStorage: LocalStoreService,
        private uploadService: UploadService,
        private windowRef: WindowRef,
        private customPiwik: CustomPiwik,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.customPiwik.setCustomData('user', 'procurement/upload/init', window.location.href);
        this.uploader = new FileUploader({
            url: URL
            // headers: [{name:'Accept', value:'application/json'}],
            // autoUpload: true,
        });
        this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    }

    onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        let data = JSON.parse(response); //success server response
        console.log(data);
        this.localStorage.storeLocalInfo('fileUpload', data);
        this.successUpload = true;
        this.customPiwik.setCustomData(
            'userId',
            'procurement/uploadSupplier/upload/fileId/' + data.uploadedFileId + '/sucess',
            window.location.href
        );
    }

    onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        let error = JSON.parse(response); //error server response
        console.log('erroe');
        if (error.message == 'File Format should Be XLSX OR CSV!') {
            this.errMsg = error.message;
        } else {
            this.errMsg = 'Something went wrong,Please try again !';
        }
        this.errWhileUpload = error.message || error.msg;
        this.successUpload = false;
        this.errorUpload = true;
        this.customPiwik.setCustomData('userId', 'procurement/uploadSupplier/upload/fail', window.location.href);
    }

    // navigate buttons
    clickBackBtn() {
        this.router.navigateByUrl('/procurement/login').then(
            nav => {
                console.log('navigated to login screen ', nav); // true if navigation is successful
            },
            err => {
                console.log('errored out on csv back button navigation ', err); // when there's an error
            }
        );
    }
    goNext() {
        this.customPiwik.setCustomData('userId', 'procurement/uploadSupplier/next/click', window.location.href);
        this.router.navigate(['/procurement/request-data']);
    }
    resetForm() {
        this.successUpload = false;
        this.errorUpload = false;
    }
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    public fileOverBase(e: any): void {
        this.resetForm();
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
    downloadSample() {
        this.customPiwik.setCustomData('userId', 'procurement/uploadSupplier/downloadSample', window.location.href);

        /* return this.uploadService
            .downloadSample()
            .toPromise()
            .then(response => {
                //this.pendingList = response.body;
                console.log(response.body);
                response.body.forEach((keys: any, vals: any) => {
                    if (keys.configKey == 'DOWNLOAD_SAMPLE_FILE_PATH') {
                        // window.location = keys.configValue;
                        //  this.windowRef.nativeWindow.location= keys.configValue;
                    }
                });
                for (let prop in response.body) {
                    console.log(prop);
                }
            })
            .catch(err => {
                console.log(err);
    });*/
    }

    openFaq() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(ProcurementFaqModalComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isOpen = false;
            },
            reason => {
                this.isOpen = false;
            }
        );
        return modalRef;
    }
}
