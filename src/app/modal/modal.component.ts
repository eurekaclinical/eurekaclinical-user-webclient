import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

@Component({

    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
    private element: JQuery;

    constructor(private el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    ngOnInit(): void {
        let modal = this;
        this.element.appendTo('body');
    }
    
    ngOnDestroy(): void {
        this.element.remove();
    }
    // open modal
    open(): void {
        this.element.show();
    }

    // close modal
    close(): void {
        this.element.hide();
    }
    
    updatePassword() : void{
        console.log("I am called updatePassword!");
    }  
}
