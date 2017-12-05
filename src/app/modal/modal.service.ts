import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
    private modal: any;

    // open modal
    open(){
        this.modal.open();
    }

    // close modal
    close(){
        this.modal.close();
    }
}