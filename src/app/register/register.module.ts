import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user/user.service';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule( {
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        RegisterRoutingModule
    ],
    declarations: [
        RegisterComponent
    ],
    providers: [
        UserService
    ],
    exports: [
        RegisterComponent
    ]
})
export class RegisterModule { }
