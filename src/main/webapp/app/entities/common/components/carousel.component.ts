import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from '../../../shared/service/shared-data-service';
import { Router } from '@angular/router';
@Component({
    selector: 'jhi-custom-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.css']
})
export class CarouselComponent implements OnInit {
    sharedData: any;
    @ViewChild('widgetsContent', { read: ElementRef })
    public widgetsContent: ElementRef<any>;

    constructor(config: NgbCarouselConfig, private data: SharedDataService, private router: Router) {
        console.log('NgbCarouselConfig');
        config.interval = 4000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
        config.showNavigationIndicators = false;
    }

    ngOnInit() {
        this.data.currentData.subscribe(sharedData => (this.sharedData = sharedData));
        console.log(this.sharedData);
    }

    public scrollLeft(event): void {
        this.widgetsContent.nativeElement.scrollTo({
            left: this.widgetsContent.nativeElement.scrollLeft + 150,
            behavior: 'smooth'
        });
    }

    public scrollRight(event): void {
        this.widgetsContent.nativeElement.scrollTo({
            left: this.widgetsContent.nativeElement.scrollLeft - 150,
            behavior: 'smooth'
        });
    }
    goToCompanyProfile(item) {
        console.log(item);
        this.router.navigate(['/procurement/supdetails', item.id, item.DUNSNUMBER]);
    }
}
