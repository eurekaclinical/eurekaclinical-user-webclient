import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { ServiceResponse } from '../user/service-response.model';
import { PasswordChange } from '../user/passwordchange.model';



@Component( {
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

    userprofileForm: FormGroup;
    userCredentialForm: FormGroup;
    currentUser: User
    errors: string[] = [];
    showPasswordDialog: boolean;
    submitted: boolean;
    
    
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

    constructor(

        private userService: UserService, fb: FormBuilder) {
        this.showPasswordDialog = false;
        this.currentUser = new User();
        this.userprofileForm = fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            organization: [null, Validators.required],
            title: [null, Validators.required],
            department: [null, Validators.required],
            email: [null, Validators.compose([Validators.required, Validators.email])],
        });
        
        this.userCredentialForm = fb.group({
            oldPassword: [null, Validators.required],
            newPassword: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            verifyPassword: [null, Validators.required]
        }, {validator: this.passwordMatchValidator});
    }
    
   
    
    ngOnInit() {
        this.getCurrentUser();
        console.log(this.userCredentialForm);
    }

    ngAfterViewInit() {

    }
    
    passwordMatchValidator(g: FormGroup){
        const res = g.get('newPassword').value === g.get('verifyPassword').value  
        return res? null : {'mismatch': true};
    }

    getCurrentUser() : void {
        this.userService.getCurrentUser()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.populateUserForm()
            });
    }
    
    updateUser() {
        console.log("Update user being run");        
        this.submitted = true;
        this.showMessage("","")
        this.errors = [];
        this.userService.updateUser( this.populateUser() ).then(
            ( response: ServiceResponse ) => {
                this.submitted = false;
                this.showMessage("Your changes has been saved successfully.", "success");
            },
            ( error ) => {
                this.submitted = false;
            }
        );
    }
    
    updatePassword(): void{
        console.log("changing password");        
        this.showMessage("","");
        this.showPasswordMessage("","");
        this.errors = [];
        let req = new PasswordChange();
        req.oldPassword = this.userCredentialForm.get('oldPassword').value;
        req.newPassword = this.userCredentialForm.get('newPassword').value;
        this.userService.changePassword( req, this.currentUser.id ).then(
            ( response: ServiceResponse ) => {   
                this.showMessage("Your password has been saved successfully.", "success");
                this.closePasswordDialog();
            },
            ( error ) => {
                console.log(error._body);
                this.showPasswordMessage(error._body,"fail");
           
            }
        );
    
    } 

    onValueChanged( data?: any ) {

        this.errors = [];

        for( var controlName in this.userprofileForm.controls ) {
            let control = this.userprofileForm.controls[ controlName ];
            if( control.dirty && control.touched && control.errors ) {
                for( const errorName in control.errors ) {
                    this.errors.push( this.validationMessages[ controlName ][ errorName ] );
                }
            }
        }

    }
    
    
    
    private populateUserForm(): void{
        this.userprofileForm.setValue({'firstName': this.currentUser.firstName,
            'lastName': this.currentUser.lastName,
            'organization': this.currentUser.organization,
            'title': this.currentUser.title,
            'department': this.currentUser.department,
            'email': this.currentUser.email});
    }

    private populateUser(): User {
        let updatedUser = Object.assign(new User(), this.currentUser);
        updatedUser.id = this.currentUser.id;
        updatedUser.firstName = this.userprofileForm.get( 'firstName' ).value;      
        updatedUser.lastName = this.userprofileForm.get( 'lastName' ).value;
        updatedUser.organization = this.userprofileForm.get( 'organization' ).value;      
        updatedUser.title = this.userprofileForm.get( 'title' ).value;
        updatedUser.department = this.userprofileForm.get( 'department' ).value;      
        updatedUser.email = this.userprofileForm.get( 'email' ).value;               
        return updatedUser;

    }  
    
    openPasswordDialog() : void{
        console.log("I am called too!");
        this.showPasswordDialog = true;
    //    (<JQuery>(<any>$('#newPasswordModal'))).modal('show');
      //  console.log($('#newPasswordModal'));
    }
    
    closePasswordDialog():void{
        this.userCredentialForm.setValue({'oldPassword':'', 'newPassword':'','verifyPassword':''});
        this.showPasswordDialog = false;
        this.showPasswordMessage("","");
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
        }
    }
    
    showPasswordMessage(msg:string, status: string): void{
        this.passwordMessageBoard.message = msg;
        
        if(msg ===""){
            this.passwordMessageBoard.showMessage = false;
        }
        else{
            if(status=="success"){
                this.passwordMessageBoard.showMessage = true;
                this.passwordMessageBoard.styleClass['alert-success'] = true;
                this.passwordMessageBoard.styleClass['alert-danger'] = false;
            }
            else if(status=="fail")
            {
                this.passwordMessageBoard.showMessage = true;
                this.passwordMessageBoard.styleClass['alert-success'] = false;
                this.passwordMessageBoard.styleClass['alert-danger'] = true;
            }
        }
    }
}
