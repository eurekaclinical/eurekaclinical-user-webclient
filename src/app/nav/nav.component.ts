import { Component, OnInit } from '@angular/core';

import { User } from '../user/user.model';
import {Router, Route, ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs/Subscription';
import { ConfigurationService } from '../config.service';
import { AppProperties } from '../user/app-properties.model';
import { App } from '../user/app.model';
import { ClickOutsideModule } from 'ng4-click-outside';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {
    currentUser: User
    apps: App[];
    idleWarning: boolean;
    idleWarningMessage:string;
    menuOpen:boolean = false;
    loginEvent:EventEmitter<boolean>;
    idleTime:number;
    idleWaitTime:number;
    
    constructor(private userService: UserService, private router: Router, private activteRoute: ActivatedRoute, private location: Location, private config: ConfigurationService, private idle: Idle, private changeDetectorRef: ChangeDetectorRef) { 
        this.currentUser = undefined;
        this.loginEvent = new EventEmitter<boolean>();
        this.idleTime = this.config.DEFAULTIDLETIME;
        this.idleWaitTime = this.config.DEFAULTIDLEWAITTIME;
        this.loginEvent.subscribe(() => {
            this.config.appConfig.subscribe((config)=> {
                if (config.idleTime){
                    this.idleTime = config.idleTime;
                }
                if (config.idleWaitTime){
                    this.idleWaitTime = config.idleWaitTime;
                }
                this.setupIdleWatcher();
            },
            error =>{
                this.setupIdleWatcher();
            }
            );
            
        });
    }
    
    setupIdleWatcher(){
        
        this.idle.setIdle(this.idleTime);
        this.idle.setTimeout(this.idleWaitTime);
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.idle.onIdleEnd.subscribe(() => {this.idleWarning = false; this.changeDetectorRef.detectChanges();});
        this.idle.onTimeout.subscribe(() => {this.logoutSystem();});//log out system
        this.idle.onIdleStart.subscribe(()=>{});
        this.idle.onTimeoutWarning.subscribe((countdown) => {
                    this.idleWarningMessage = 'You will be logged out in ' + countdown + ' seconds! Move your cursor to avoid this.';
                    this.idleWarning= true;
                    });
        this.idle.watch();

    }
    
    logoutSystem(){
        this.config.appConfig.subscribe((config:AppProperties)=>{
            console.log(config.casUrl+ '/logout');
                
            window.location.href = 
                config.casUrl + '/logout';
        });
    }

    ngOnInit() {
        this.getCurrentUser();
        this.getApps();
   
        
        
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
                this.loginEvent.emit(true);     
            })
            .catch(error=>{
                console.log('Fail to get user');
            });           
    }
    
    getApps() : void {
        this.userService.getApps()
            .then(apps => {
                this.apps = apps;
            })
            .catch(error=>{
                console.log('Fail to get apps:');
                console.log(error);
            });           
    }
    
     filterApps(): App[] {
        if (!this.apps) {
            return null;
        } else {
            let apps: App[] = [];
            for (let app of this.apps) {
                if (app.name != "Eureka! Clinical Portal" && app.displayName != "Portal") {
                    apps.push(app);
                }
            }
            return apps;
        }
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
    
    toggleUser()
    {
        this.menuOpen = !this.menuOpen;
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
