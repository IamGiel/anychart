// pagination.component.ts
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.css']
})
export class SelectComponent implements OnInit {
    @Input() data: any[];
    @Input() label: string;
    @Input() active: string;

    @Output() onSelect = new EventEmitter<string>();

    hover: string;
    selected: string;

    constructor() {}

    ngOnInit() {
        if (this.active != undefined) {
            this.selected = this.active;
        }
        if (this.selected != undefined) {
            this.hover = this.selected;
        }
    }

    select(d) {
        this.selected = d;
        this.hover = d;
        this.onSelect.emit(d);
    }

    onHover(d) {
        this.hover = d;
    }
}
