import { Component, EventEmitter, AfterViewInit, NgZone, OnDestroy, Input } from '@angular/core';
import { PopoverModule } from 'ngx-popover';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';
import { NgAnalyzedFile } from '@angular/compiler';
import { Map } from 'typescript';
import { FetchData } from '../../common/service/fetch-data';
import { ProcurementCompanyInfo } from '../../../shared/models/procurement-company-info.model';
import { baseDirectiveCreate } from '@angular/core/src/render3/instructions';
import { Router, ActivatedRoute } from '@angular/router';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { Location } from '@angular/common';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-dow-jones',
    templateUrl: './dowjones.component.html',
    styleUrls: ['./dowjones.component.css']
})
export class DowJonesComponent implements AfterViewInit, OnDestroy {
    @Input() data: any = {};
    collapse = true;
    appearences = {};
    readOnly = true;
    errLink = false;
    info = `A company’s brand reputation is among its most valuable assets. And regulators, especially those of financial institutions, are now requiring “adverse media” coverage as part of due diligence and compliance matters. By knowing the illegal, immoral or unethical conduct of a third party, companies can better evaluate the cost/benefit balance of proposed business relationships.`;
    constructor(private router: Router, private http: HttpClient) {}

    ngAfterViewInit() {
        // console.log(this.data);

        if (this.router.url.indexOf('/supplier/') >= 0) {
            this.readOnly = false;
        }
        if (this.val(this.data) && this.val(this.data.collapse)) {
            this.collapse = this.data.collapse;
        }
        if (this.val(this.data) && this.val(this.data.allegations)) {
            this.appearences = this.data.allegations;
        }
        //  console.log(this.appearences);
        this.errLink = false;
    }
    ngOnDestroy() {}

    val(o: any) {
        if (o !== undefined && o !== null) {
            return true;
        }
        return false;
    }

    toggleCollapse() {
        this.collapse = !this.collapse;
    }
    getPDFLink(link) {
        //link="https://api.dowjones.com/api/public/2.0/Content/article/articleRef/Xml?articleRef=VOZPOPU020151027ebar0000b&encryptedToken=S00YcVo1sV72Gbt1HmnOHmnNTUqM92pODMn5DByWWNW1pFpV92oRsJqMUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEA";
        this.http.get(link, { responseType: 'text' }).subscribe(
            response => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(response, 'text/xml');
                let types = xmlDoc.getElementsByTagName('Type');
                if (types != undefined && types != null && types.length > 0) {
                    for (let x = 0; x < types.length; x++) {
                        let type = types[x];
                        if (
                            type != undefined &&
                            type != null &&
                            type.innerHTML != undefined &&
                            type.innerHTML != null &&
                            type.innerHTML == 'PDF'
                        ) {
                            let typeParent = type.parentElement;
                            let references = typeParent.getElementsByTagName('Reference');
                            if (references != undefined && references != null && references.length > 0) {
                                let url = references[0].textContent;
                                window.open(url, '_blank');
                            }
                        }
                    }
                } else {
                    this.errLink = true;
                }
            },
            err => {
                this.errLink = true;
                console.log(err);
            }
        );
        setTimeout(function() {
            this.errLink = false;
        }, 3000);
    }
    closeDOWPop(p: any) {
        p.close();
    }
}
