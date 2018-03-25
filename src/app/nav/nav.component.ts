import { Component, OnInit } from '@angular/core';

import { User } from '../user/user.model';
import {Router, Route, ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs/Subscription';
import { ConfigurationService } from '../config.service';
import { AppProperties } from '../user/app-properties.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: ['a {cursor:pointer;}']
})
export class NavComponent implements OnInit {

    currentUser: User
    
    menuOpen:boolean = false;
    constructor(private userService: UserService, private router: Router, private activteRoute: ActivatedRoute, private location: Location, private config: ConfigurationService) { 
        this.currentUser = undefined;
    }

    ngOnInit() {
        this.getCurrentUser(); 
        
    }

    isLoggedOut():boolean {
        
        if (this.currentUser===undefined){
            return true;
        }
        else{
            return false;
        }
    }
    
    getCurrentUser() : void {
        this.userService.getCurrentUser()
            .then(currentUser => {
                this.currentUser = currentUser;
            })
            .catch(error=>{
                console.log('Fail to get user');
            });           
    }
    
    currentUserDisplayName():string{
        if (!this.currentUser.firstName){
            return this.currentUser.username;
        }else{ 
            let name = this.currentUser.firstName;
            if(this.currentUser.lastName){
                name = name + ' ' + this.currentUser.lastName;
            }
            
            return  name;
        }
    }
    
    doLogin(){
        this.config.appConfig.subscribe((config:AppProperties)=>{
            console.log( config.userWebappUrl+ '/login?webclient=' 
                + encodeURIComponent(this.config.baseUrl + this.location.prepareExternalUrl("") ));
                
            window.location.href = 
            config.userWebappUrl + '/protected/login?webclient=' 
                + encodeURIComponent(this.config.baseUrl + this.location.prepareExternalUrl("") );
        });    
    }
    
    doHelp(){
        window.open("http://eurekaclinical.org", "_blank");
    } 
    
    loginUrl(){
        
        return "https://localhost:4200/eurekaclinical-user-webapp/protected/login?webclient=" + "https://localhost:4200/eurekaclinical-user-webclient";
        /*
        return this.config.appConfig.casUrl + '/login?webclient=' 
                + encodeURIComponent(this.config.baseUrl + this.location.prepareExternalUrl("/") );      
         */
        
    }    
    
    onEditUser(){
        this.menuOpen = false;
        this.router.navigate(["/user-profile"]);
    }
    
    onAppRegister(){
        this.menuOpen = false;
        this.router.navigate(["/home"]);
    }
        
    onLogOut(){
         this.config.appConfig.subscribe((config:AppProperties)=>{            
            window.location.href = 
            config.casUrl + '/logout';
        });
        
    }
}
