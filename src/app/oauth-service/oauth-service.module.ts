import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {RegisterUserService} from "../user/register-user.service"
import {OAuthManagerService} from './oauth-manager.service'
import {OAuthProvider} from './oauth-provider.model'
import {OAuthUser} from './oauth-user'
import {GoogleOAuthService} from './google-oauth.service'
@NgModule( {
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [


    ],
    providers: [
        RegisterUserService,
        OAuthManagerService,
        OAuthProvider,
        GoogleOAuthService
        
    ],
    exports: [
   
        
    ]
})
export class OAuthServiceModule { }
