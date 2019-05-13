import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchData } from '../../entities/common/service/fetch-data';

@Component({
    selector: 'jhi-manage-compliance',
    templateUrl: './manage-compliance.component.html'
})
export class ManageComplianceComponent implements OnInit, OnDestroy {
    file: any;
    fileUUID: string;
    uploadResponse: string;
    requestId: string;
    createComplianceResponse: string;
    disabled = false;
    filename: any;
    companies: any;
    users: any;
    selctedComp: any;
    selctedUser: any;
    showFileUploadBtn = true;
    msg: string = '';
    userBoxEnable = true;
    constructor(private fetchData: FetchData) {}

    ngOnInit() {
        this.getCompnayList();
    }

    ngOnDestroy() {}

    selectFile(event) {
        this.file = event.target.files.item(0);
    }

    uploadFile() {
        let formData = new FormData();
        this.disabled = true;
        if (this.file !== undefined && this.file !== null && this.fileUUID !== undefined && this.fileUUID !== null) {
            formData.append('file', this.file);
            this.fetchData.curatedFileUpload(formData, this.fileUUID).subscribe(
                res => {
                    console.log(res);
                    this.disabled = false;
                    this.uploadResponse = res.msg || res.data || res.message || res.error;
                },
                err => {
                    console.log(err);
                    this.disabled = false;
                    this.uploadResponse = err.msg || err.data || err.message || err.error;
                }
            );
        }
    }

    createCompliance() {
        if (this.requestId !== undefined && this.requestId !== null) {
            this.fetchData.createCompliance(this.requestId).subscribe(
                res => {
                    this.createComplianceResponse = res.msg || res.data || res.message || res.error;
                },
                res => {
                    this.createComplianceResponse = res.msg || res.data || res.message || res.error;
                }
            );
        }
    }
    getCompnayList() {
        this.fetchData.getAllcompanies().subscribe(
            res => {
                this.companies = res;
            },
            res => {
                console.log(res);
            }
        );
    }
    companyChange($event) {
        console.log($event.target.value);
        this.selctedComp = $event.target.value;
        this.users = [];
        if (this.selctedComp != undefined && this.selctedComp != 'undefined') {
            this.getUserByCompany(this.selctedComp);
            this.userBoxEnable = false;
        }
    }
    getUserByCompany(param) {
        this.fetchData.getUserByCompany(param).subscribe(
            res => {
                console.log(res);
                this.users = res;
            },
            res => {
                console.log(res);
            }
        );
    }
    userChange($event) {
        this.selctedUser = $event.target.value;
        if (this.selctedUser != undefined && this.selctedUser != 'undefined') {
            this.showFileUploadBtn = false;
        }
    }
    selectFileToUpload(event) {
        this.filename = event.target.files.item(0);
    }
    uploadSupplierFile() {
        let formData = new FormData();
        this.disabled = true;
        if (
            this.filename !== undefined &&
            this.filename !== null &&
            this.selctedComp !== undefined &&
            this.selctedComp !== null &&
            this.selctedUser !== undefined &&
            this.selctedUser !== null
        ) {
            formData.append('file', this.filename);
            this.fetchData.supplierFileUpload(formData, this.selctedUser).subscribe(
                res => {
                    const reqdata = {
                        uploadSupplierFileId: res.uploadedFileId,
                        compliancePackageIds: [1]
                    };
                    this.fetchData.requestCompPackage(reqdata).subscribe(
                        res => {
                            this.msg = 'file uploaded successfully.';
                        },
                        err => {
                            this.msg = 'Soemthing went wrong.';
                        }
                    );
                },
                err => {
                    this.msg = 'Soemthing went wrong.';
                }
            );
        }
    }
}
