import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user/user.service';
import { AppProperties } from '../user/app-properties.model';

import { RegisterUser } from '../user/register-user.model';
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
    
    constructor(private userService: UserService, private fb: FormBuilder) {
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
            password: [null, Validators.required],
            verifyPassword: [null, Validators.required]                                    
        });
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
        this.userService.saveUser( this.populateRegisterUser() ).then(
            ( response: ServiceResponse ) => {
                this.submitted = false;
            },
            ( error ) => {
                this.submitted = false;
            }
        );
    }   
    
    private populateRegisterUser(): RegisterUser {
        
        let registerUser = new RegisterUser();
        
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
        registerUser['username'] = registerUser['firstName'] + registerUser['lastName'];
                   
        return registerUser;

    }       

}
