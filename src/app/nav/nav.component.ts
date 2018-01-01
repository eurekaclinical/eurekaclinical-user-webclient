import { Component, OnInit } from '@angular/core';

import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

    currentUser: User
    isLoggedOut: boolean = false;
    
    constructor(private userService: UserService, private router:Router) { 
        this.currentUser = new User();
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            console.log('url: ',this.router.url);
            if(this.router.url.endsWith('loggedOut')){
                this.isLoggedOut = true;         
            }else{
                this.isLoggedOut = false; 
                this.getCurrentUser();
            }            
        });        

    }

    getCurrentUser() : void {
        this.userService.getCurrentUser()
            .then(currentUser => {
                this.currentUser = currentUser;
            });           
    }
    
    doLogin(){
        this.router.navigate(['/welcome']);
    }    
}
