import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';

@NgModule( {
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        ModalComponent
    ],
    providers: [
        ModalService
    ],
    exports: [
        ModalComponent
    ]
})
export class ModalModule { }
