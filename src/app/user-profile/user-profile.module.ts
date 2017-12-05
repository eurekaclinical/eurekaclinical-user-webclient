import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user/user.service';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ModalModule } from '../modal/modal.module';

@NgModule( {
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        UserProfileRoutingModule,
        ModalModule
    ],
    declarations: [
        UserProfileComponent
    ],
    providers: [
        UserService
    ],
    exports: [
        UserProfileComponent
    ]
})
export class UserProfileModule { }
