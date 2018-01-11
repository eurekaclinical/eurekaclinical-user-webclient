import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { ServiceResponse } from '../user/service-response.model';
import {Router, RouterModule  } from "@angular/router" 
import {RegisterUserService} from '../user/register-user.service'
import {RegisterUser} from "../user/register-user.model"
import {Location} from '@angular/common'

import { OAuthServiceModule} from '../oauth-service/oauth-service.module';
import {OAuthManagerService} from '../oauth-service/oauth-manager.service';

@Component( {
    selector: 'choose-account',
    templateUrl: './choose-account.component.html',
})
export class ChooseAccountComponent implements OnInit {

    userprofileForm: FormGroup;
    userCredentialForm: FormGroup;
    currentUser: User
    errors: string[] = [];
    showPasswordDialog: boolean;
    submitted: boolean;
    submittedPassword: boolean;
    
    googleAuth = {
                  enabled:true
    };
    
    gitHubAuth = {
                  enabled:true
    };
    
    globusAuth = {
                  enabled:true
    };
    
    localAccount = {
                    enabled:true
    };
    
    
    messageBoard = {
                    showMessage: false,
                    'message': '',
                    styleClass:{'alert':true,
                                 'alert-success':true,
                                 'alert-danger':false
                                }
    };
    
    passwordMessageBoard = {
                    showMessage: false,
                    'message': '',
                    styleClass:{'alert':true,
                                 'alert-success':true,
                                 'alert-danger':false
                                }
    };
    
    
    
    private validationMessages = {
        'emailAddress': {
            'required': 'Email address is required.',
            'email': 'Please enter a valid email address.'
        }
    };

    constructor(private registerUserService: RegisterUserService, private router: Router, private oauthService:OAuthManagerService, private location: Location){

        
    }
    
   
    
    ngOnInit() {
        console.log(this.location.prepareExternalUrl("https://localhost:4200/googlecallback"));
    
    }

    ngAfterViewInit() {

    }
    
    chooseOAuthAccount(provider:string)
    {
       window.location.href = 
           this.oauthService.authenticationServerUrl(provider);
    }
    
    registerLocal()
    {
        this.registerUserService.registerUser.authenticationMethod = "LOCAL";
        this.router.navigate(['register']);
        
    }
}
