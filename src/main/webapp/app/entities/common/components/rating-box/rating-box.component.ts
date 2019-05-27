// rating-box.component.ts
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
    selector: 'rating-box',
    templateUrl: './rating-box.component.html',
    styleUrls: ['./rating-box.css']
})
export class RatingBoxComponent implements OnInit {
    @Input() typeToShow: string;
    @Input() ratingValue: string;
    @Input() dataPoint: string;
    @Input() customClass: string;

    constructor() {}

    ngOnInit() {
        console.log(this.typeToShow);
        console.log(this.ratingValue);
        console.log(this.customClass);
    }
    getRadialColor(val) {
        if (val >= 0 && val <= 29) {
            return '#FF4F61';
        }
        if (val >= 30 && val <= 39) {
            return '#FFBE45';
        }
        if (val >= 40 && val <= 49) {
            return '#FFF245';
        }
        if (val >= 50 && val <= 59) {
            return '#31D490';
        }
        if (val >= 60 && val <= 79) {
            return '#14B4D2';
        }
        if (val >= 80 && val <= 100) {
            return '#795DDC';
        }
    }
    public getRatingClass(rating, ratingType) {
        if (ratingType == 'SER') {
            if (rating <= 2) {
                return 'r-E7F';
            }
            if (rating <= 4) {
                return 'r-EAF';
            }
            if (rating <= 5) {
                return 'r-FFF';
            }
            if (rating <= 7) {
                return 'r-FD7';
            }
            if (rating <= 9) {
                return 'r-FFE';
            }
        } else if (ratingType == 'PAYDEX') {
            if (rating >= 81) {
                return 'r-E7F';
            }
            if (rating >= 61) {
                return 'r-EAF';
            }
            if (rating >= 41) {
                return 'r-FFF';
            }
            if (rating >= 21) {
                return 'r-FD7';
            }
            if (rating >= 1) {
                return 'r-FFE';
            }
        } else if (ratingType == 'DOW_JONES') {
            return 'r-dow';
        } else if (ratingType == 'RATING_FINANCIAL') {
            return 'r-dow';
        } else if (ratingType == 'RATING_CCA') {
            if (rating == 1) {
                return 'r-high';
            }
            if (rating == 2) {
                return 'r-good';
            }
            if (rating == 3) {
                return 'r-fair';
            }
            if (rating == 4) {
                return 'r-limited';
            }
        } else {
            return 'r-default';
        }
    }
}
