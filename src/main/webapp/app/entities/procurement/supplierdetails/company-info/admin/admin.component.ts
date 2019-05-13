import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap, takeUntil, skip } from 'rxjs/operators';
import { FetchData } from '../../../../common/service/fetch-data';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    routerSubscription: any;
    complianceRequestId: any;
    sections$: any;
    questions: any;
    section: any;

    constructor(public activeRoute: ActivatedRoute, public fetchData: FetchData) {}

    ngOnInit() {
        this.routerSubscription = this.activeRoute.params.subscribe(res => {
            if (this.validate(res) && this.validate(res.id)) {
                this.complianceRequestId = res.id;
                this.sections$ = this.fetchData.companyInfoQuestionnaireSections(this.complianceRequestId);
            }
        });
    }
    selectSection(s) {
        let rows = [];
        for (let x = 0; x <= s.numberOfRows; x++) {
            rows.push(x);
        }
        s.rows = rows;
        this.section = s;
        this.fetchQuestion(s.id).subscribe(res => {
            this.questions = res;
            this.questions = this.questions.sort((a, b) => a.displayOrder - b.displayOrder);
            this.questions = this.questions.map(q => {
                if (this.validate(q.metadata)) {
                    let ob = JSON.parse(q.metadata);
                    q.metadata = JSON.stringify(ob, undefined, 4);
                }
                return q;
            });
        });
    }
    validate(obj: any): boolean {
        if (obj == undefined || obj == null) {
            return false;
        }
        return true;
    }
    fetchQuestion(sectionId: string): Observable<any> {
        if (sectionId != null) {
            return this.fetchData.companyInfoAdminQuestions(sectionId);
        }
    }
    getOptions(q) {
        q.loading = true;
        this.fetchData.companyInfoQuestionnaireQuestionOptions(q.optionMasterId).subscribe(
            res => {
                q.options = res.content;
                q.first = res.first;
                q.last = res.last;
                q.page = res.number;
                q.loading = false;
            },
            e => {
                q.loading = false;
            }
        );
    }

    pagination(q, next) {
        if (!this.validate(q.loading) || !q.loading) {
            q.loading = true;
            if (next && !q.last) {
                this.fetchData.companyInfoQuestionnaireQuestionOptions(`${q.optionMasterId}?page=${q.page + 1}`).subscribe(
                    res => {
                        q.options = res.content;
                        q.first = res.first;
                        q.last = res.last;
                        q.page = res.number;
                        q.loading = false;
                    },
                    e => {
                        q.loading = false;
                    }
                );
            } else if (!next && !q.first) {
                this.fetchData.companyInfoQuestionnaireQuestionOptions(`${q.optionMasterId}?page=${q.page - 1}`).subscribe(
                    res => {
                        q.options = res.content;
                        q.first = res.first;
                        q.last = res.last;
                        q.page = res.number;
                        q.loading = false;
                    },
                    e => {
                        q.loading = false;
                    }
                );
            } else {
                q.loading = false;
            }
        }
    }

    change() {
        this.questions = this.questions.sort((a, b) => a.displayOrder - b.displayOrder);
    }
    save(q) {
        let payload: any = {};
        payload.id = q.id;
        payload.displayOrder = q.displayOrder;
        payload.row = q.row;
        payload.metadata = JSON.stringify(JSON.parse(q.metadata));
        this.fetchData.companyInfoAdminSave(payload, q.id).subscribe(res => {
            q.isCollapsed = false;
        });
    }
}
