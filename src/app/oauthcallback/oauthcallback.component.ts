import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user/user.model';
import { Router } from "@angular/router" 
import { RegisterUserService } from '../user/register-user.service'
import { Location } from '@angular/common'
import { OAuthManagerService } from '../oauth-service/oauth-manager.service'
import { OAuthUser } from '../oauth-service/oauth-user'
@Component( {
    selector: 'oauthcallback',
    templateUrl: './oauth-callback.component.html',
})
export class OAuthCallbackComponent implements OnInit {

    queryParameters:any = {};
    
    userprofileForm: FormGroup;
    userCredentialForm: FormGroup;
    currentUser: User;
    errors: string[] = [];
    showPasswordDialog: boolean;
    submitted: boolean;
    submittedPassword: boolean;
    
    messageBoard = {
                    showMessage: false,
                    'message': '',
                    styleClass:{'alert':true,
                                 'alert-success':true,
                                 'alert-danger':false
                                }
    };
    
 showMessage(msg:string, status: string): void{
        this.messageBoard.message = msg;
        
        if(msg ===""){
            this.messageBoard.showMessage = false;
        }
        else{
            if(status=="success"){
                this.messageBoard.showMessage = true;
                this.messageBoard.styleClass['alert-success'] = true;
                this.messageBoard.styleClass['alert-danger'] = false;
            }
            else if(status=="fail")
            {
                this.messageBoard.showMessage = true;
                this.messageBoard.styleClass['alert-success'] = false;
                this.messageBoard.styleClass['alert-danger'] = true;
            }
        }
    }

    constructor(private registerUserService: RegisterUserService, private router: Router, private route: ActivatedRoute, private location: Location, private oauthService: OAuthManagerService){

        
    }

    
    ngOnInit() {
        
        let provider = this.route.snapshot.paramMap.get('provider');
        let queryString:string = this.location.path(true).substring(this.location.path(false).length+1);
              

        this.oauthService.getOAuthUser(provider, this.route.snapshot.queryParams)
        .subscribe(
            (user:OAuthUser)=>{
                console.log('get user successfully');
                console.log(user);
                this.registerUserService.registerUser.oauthUser = user;
                this.registerUserService.registerUser.authenticationMethod = "OAUTH";
                this.router.navigate(['register']);
                
                
            },
            error=>{    
                console.log('error occured');
                console.log(error);
                this.showMessage("<b>Error happens while authenticating</b>.\n" + error._body,'fail');
            }
        );

    }


    ngAfterViewInit() {

    }
    
}
