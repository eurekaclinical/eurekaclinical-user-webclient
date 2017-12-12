import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
    
    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getUserWebappProperties();
        this.registerForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            organization: new FormControl(),
            title: new FormControl(),
            department: new FormControl(),
            email: new FormControl(),
            verifyEmail: new FormControl(),
            password: new FormControl(),
            verifyPassword: new FormControl()                                    
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
        
        registerUser.firstName = this.registerForm.get( 'firstName' ).value;      
        registerUser.lastName = this.registerForm.get( 'lastName' ).value;
        registerUser.organization = this.registerForm.get( 'organization' ).value;      
        registerUser.title = this.registerForm.get( 'title' ).value;
        registerUser.department = this.registerForm.get( 'department' ).value;      
        registerUser.email = this.registerForm.get( 'email' ).value;      
        registerUser.verifyEmail = this.registerForm.get( 'verifyEmail' ).value;
        registerUser.password = this.registerForm.get( 'password' ).value;      
        registerUser.verifyPassword = this.registerForm.get( 'verifyPassword' ).value;  
                          
        return registerUser;

    }       

}
