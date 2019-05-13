import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStoreService } from 'app/core/auth/local-storage.service';
import { TCModalService } from '../../common/components/terms-conditions/terms-conditions.modal.service';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPiwik } from '../../common/service/custom-piwik';
import { SupplierFaqModalComponent } from '../../common/modals/supplier-faq-modal/supplier-faq-modal.component';
import { FetchData } from '../../common/service/fetch-data';
@Component({
    selector: 'jhi-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['../intro/intro.css']
})
export class IntroComponent implements OnInit, OnDestroy {
    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    modalRef: NgbModalRef;
    isOpen = false;
    showPage = false;
    claimed = false;
    constructor(
        private TCModalService: TCModalService,
        private router: Router,
        private route: ActivatedRoute,
        private localStorage: LocalStoreService,
        private customPiwik: CustomPiwik,
        private modalService: NgbModal,
        private fetchData: FetchData
    ) {}
    uuid: any;
    ngOnInit() {
        //this.uuid = this.route.snapshot.paramMap.get('id');
        this.route.params.subscribe(params => {
            this.uuid = params['id'];
            this.localStorage.storeLocalInfo('uuid', this.uuid);
            this.fetchData.checkSupplierClaim(this.uuid).subscribe(
                res => {
                    this.showPage = true;
                    this.claimed = true;
                },
                () => {
                    this.showPage = true;
                }
            );
        });
    }
    ngOnDestroy() {
        // remove the the body classes
        this.bodyTag.classList.remove('supplier-body');
    }
    getStarted() {
        console.log(this.uuid);
        if (!this.claimed) {
            this.customPiwik.setCustomData('userId', 'supplier/intro/getStarted/click', window.location.href);
            this.router.navigate(['/supplier/account-info']);
        } else {
            this.customPiwik.setCustomData('userId', 'supplier/intro/getStarted/click/login', window.location.href);
            this.router.navigate(['/login']);
        }
    }
    terms() {
        this.modalRef = this.TCModalService.open();
    }

    openFaq() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(SupplierFaqModalComponent, { size: 'lg' });
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
