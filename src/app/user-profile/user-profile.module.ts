import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user/user.service';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule( {
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        UserProfileRoutingModule
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
