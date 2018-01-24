import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {RegisterUserService} from "../user/register-user.service"
import { OAuthCallbackRoutingModule } from './oauthcallback-routing.module';
import { OAuthCallbackComponent } from './oauthcallback.component';
import {OAuthServiceModule} from '../oauth-service/oauth-service.module'

@NgModule( {
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        OAuthCallbackRoutingModule,
        OAuthServiceModule
    ],
    declarations: [
        OAuthCallbackComponent
    ],
    providers: [
        RegisterUserService,      
    ],
    exports: [
        OAuthCallbackComponent
    ]
})
export class OAuthCallbackModule { }
