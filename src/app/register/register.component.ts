import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user/user.service';
import { AppProperties } from '../user/app-properties.model';

import { RegisterUser } from '../user/register-user.model';
import { RegisterUserService } from "../user/register-user.service"
import { ServiceResponse } from '../user/service-response.model';

import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    appProperties: AppProperties;
    errors: string[] = [];

    submitted: boolean;
    
    hideForm: boolean;
    
    messageBoard = {
                    showMessage: false,
                    'message': '',
                    styleClass:{'alert':true,
                                 'alert-success':true,
                                 'alert-danger':false
                                }
                    };
    
    constructor(private userService: UserService, private fb: FormBuilder, private registerUserService: RegisterUserService ) {
    }

    ngOnInit() {
        this.getUserWebappProperties();
        this.registerForm = this.fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            organization: [null, Validators.required],
            title: [null, Validators.required],
            department: [null, Validators.required],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            verifyEmail: [null, Validators.compose([Validators.required, Validators.email])],
            password: [null, this.passwordValidator],
            verifyPassword: [null, Validators.required]                                    
        }, {validator: this.passwordMatchValidator});
        
        this.registerForm.valueChanges.subscribe((data) => {this.showMessage("","")});
        this.hideForm = false;
    }
    
    passwordValidator(g: FormControl){
        let value:string = g.value;
        
        return value && value.length >= 8 && /[0-9]+/.test(value) && /[a-zA-Z]+/.test(value) ? null : {'passwordPattern': true};
    }
            
    getUserWebappProperties() {   
        this.userService.getUserWebappProperties().subscribe((data) => {
              console.log("appProperties: ", data);
              this.appProperties = data;
            });

     }  
    
    saveUser() {        
        this.submitted = true;     
        this.errors = [];
        this.showMessage("","");
        
        if (this.registerForm.invalid)
            return;
            
        this.userService.saveUser( this.populateRegisterUser() ).then(
            ( response ) => {

                this.showMessage("User registration request submitted successfully, you will receive an email after the request is approved.", "success");
                this.hideForm = true;
            },
            ( error ) => {

                this.showMessage("Registration request failed.\n" +error._body,"fail");
            }
        );
    }   
    
    private populateRegisterUser(): RegisterUser {
        
        let registerUser = new RegisterUser();
        registerUser.authenticationMethod = this.registerUserService.registerUser.authenticationMethod;
        
        let keys: string[] = [
                    'firstName',
                    'lastName',
                    'email',
                    'verifyEmail',
                    'organization',
                    'title',
                    'department',
                    'password',
                    'verifyPassword'
                    ];
        
        for (let k of keys)
        {
            registerUser[k] = this.registerForm.get(k).value;
        }
        registerUser['username'] = registerUser['email'];
        
                   
        return registerUser;

    } 
    
     passwordMatchValidator(g: FormGroup){
        let result = {};
        if(g.get('password').value != g.get('verifyPassword').value)
        {
            result = {'passwordMismatch': true};
        }
        
        if(g.get('email').value != g.get('verifyEmail').value)
        {
            result['emailMismatch'] = true;
        }
        
        return result; 
    }
    
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
            else
            {
                console.log("Unknow message type, please report this to website admin");
            }
        }
    }
    
    formgroupClass(formName:string, controlName: string)
    {
        return {"form-group":true,
                "has-error": this[formName].controls[controlName].errors&&this.submitted?true:false
               };
    }     

}
