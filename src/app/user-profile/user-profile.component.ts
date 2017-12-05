import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { UserResponse } from '../user/user-response.model';

import { ModalService } from '../modal/modal.service';

@Component( {
    selector: 'user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

    userprofileForm: FormGroup;

    currentUser: User
    errors: string[] = [];

    submitted: boolean;

    private validationMessages = {
        'emailAddress': {
            'required': 'Email address is required.',
            'email': 'Please enter a valid email address.'
        }
    };

    constructor(
        private userService: UserService, private modalService: ModalService) {
    }

    ngOnInit() {
        this.getCurrentUser();
        this.userprofileForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            organization: new FormControl(),
            title: new FormControl(),
            department: new FormControl(),
            email: new FormControl()
        });
    }

    ngAfterViewInit() {

    }
    
    getCurrentUser() : void {
        this.userService.getCurrentUser()
            .then(currentUser => {
                this.currentUser = currentUser;
            });
    }
    
    updateUser() {        
        this.submitted = true;
        
        this.errors = [];
        this.userService.updateUser( this.populateUser() ).then(
            ( response: UserResponse ) => {
                this.submitted = false;
            },
            ( error ) => {
                this.submitted = false;
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

    private populateUser(): User {
        let updatedUser = new User();
        updatedUser.firstName = this.userprofileForm.get( 'firstName' ).value;      
        updatedUser.lastName = this.userprofileForm.get( 'lastName' ).value;
        updatedUser.organization = this.userprofileForm.get( 'organization' ).value;      
        updatedUser.title = this.userprofileForm.get( 'title' ).value;
        updatedUser.department = this.userprofileForm.get( 'department' ).value;      
        updatedUser.email = this.userprofileForm.get( 'email' ).value;                
        return updatedUser;

    }  
    
    openModal(){
        console.log("I am called openModal!");
        this.modalService.open();
    }
 
    /*closeModal(){
        this.modalService.close('custom-modal-1');
    }*/
}
