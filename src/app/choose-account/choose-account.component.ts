import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { ServiceResponse } from '../user/service-response.model';
import { Router, RouterModule } from "@angular/router" 
import { RegisterUserService } from '../user/register-user.service'
import { RegisterUser } from "../user/register-user.model"
import { Location } from '@angular/common'
import { fromPromise } from 'rxjs/observable/fromPromise';

import { OAuthServiceModule } from '../oauth-service/oauth-service.module';
import { OAuthManagerService } from '../oauth-service/oauth-manager.service';

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
                  enabled:false
    };
    
    gitHubAuth = {
                  enabled:false
    };
    
    globusAuth = {
                  enabled:false
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

    constructor(private registerUserService: RegisterUserService, private router: Router, private oauthManagerService:OAuthManagerService, private location: Location){

        
    }
    
   
    
    ngOnInit() {
        this.oauthManagerService.getProvider('google').enabled().then(response=>{
            this.googleAuth.enabled = response;
        });
       
        this.oauthManagerService.getProvider('github').enabled().then(response=>{
            this.gitHubAuth.enabled = response;
        });
        
        this.oauthManagerService.getProvider('globus').enabled().then(response=>{
            this.globusAuth.enabled = response;
        });
       
    }
      
    

    ngAfterViewInit() {

    }
    
    chooseOAuthAccount(provider:string){
        this.registerUserService.resetUser();
        this.oauthManagerService.authenticationServerUrl(provider).then(url=>{
            window.location.href = url;
        });
    }
    
    registerLocal(){
        this.registerUserService.resetUser();
        this.registerUserService.registerUser.authenticationMethod = "LOCAL";
        this.router.navigate(['register']);
        
    }
}
