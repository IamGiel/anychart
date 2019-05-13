import { Component, OnInit } from '@angular/core';
import { FetchData } from '../../entities/common/service/fetch-data';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'jhi-process-file',
    templateUrl: './process-file.component.html',
    styleUrls: ['./process-file.component.css']
})
export class ProcessFileComponent implements OnInit {
    faTimes = faTimes;
    faFileAlt = faFileAlt;
    faBoxOpen = faBoxOpen;
    processRequestId: any;
    createRequestId: any;
    procesedResponse: any = null;
    createResponse: any = null;
    processLoading = false;
    requestLoading = false;
    open = [];
    constructor(public fetchData: FetchData) {}
    ngOnInit() {}
    change(e, type) {
        if (e != null && (e == undefined || e.length == 0)) {
            if (type == 'process') {
                this.procesedResponse = null;
            } else if (type == 'send') {
                this.createResponse = null;
            }
        }
    }

    process() {
        this.processLoading = true;
        this.fetchData.processFileAdmin({}, this.processRequestId).subscribe(
            res => {
                this.processLoading = false;
                this.procesedResponse = res;
            },
            err => {
                this.processLoading = false;
                this.procesedResponse = 'There was an error while processing the request';
            }
        );
    }

    createRequest() {
        this.requestLoading = true;
        this.fetchData.createRequestAdmin(this.createRequestId).subscribe(
            res => {
                this.requestLoading = false;
                this.createResponse = res.msg;
            },
            err => {
                this.requestLoading = false;
                this.createResponse = 'There was an error while creating the request';
            }
        );
    }

    close(i) {
        let index = this.open.indexOf(i);
        if (index != -1) {
            this.open = this.open.filter((f, ix) => ix != index);
        }
    }

    openSection(i) {
        if (this.open.indexOf(i) == -1) {
            this.open.push(i);
        }
    }
}
