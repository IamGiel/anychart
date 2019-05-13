import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[jhi-dropZone]'
})
export class DropZoneDirective {
    @Output() dropped = new EventEmitter<FileList>();
    @Output() hovered = new EventEmitter<boolean>();

    constructor() {}

    @HostListener('drop', ['$event'])
    onDrop($event) {
        console.log('THIS IS EVENT ', event);
        $event.preventDefault();
        console.log('dropped!!!');
        this.dropped.emit($event.dataTransfer.files);
        this.hovered.emit(false);
    }

    @HostListener('dragover', ['$event'])
    onDragOver($event) {
        $event.preventDefault();
        this.hovered.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave($event) {
        $event.preventDefault();
        this.hovered.emit(false);
    }
}
