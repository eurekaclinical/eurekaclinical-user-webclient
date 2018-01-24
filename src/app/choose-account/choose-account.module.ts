import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {RegisterUserService} from "../user/register-user.service"
import { ChooseAccountRoutingModule } from './choose-account-routing.module';
import { ChooseAccountComponent } from './choose-account.component';


@NgModule( {
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        ChooseAccountRoutingModule,
    ],
    declarations: [
        ChooseAccountComponent
    ],
    providers: [
        RegisterUserService
        
    ],
    exports: [
        ChooseAccountComponent
    ]
})
export class ChooseAccountModule { }
