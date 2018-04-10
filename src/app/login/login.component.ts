import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs/Subscription';
import { ConfigurationService } from '../config.service';
import { AppProperties } from '../user/app-properties.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private location: Location, private router: Router, private config: ConfigurationService) { }

    ngOnInit(): void {
        if ( this.router.url.endsWith( 'logout' ) ) {
            this.doLogout();
        }
        if ( this.router.url.endsWith( 'login' ) ) {
            this.doLogin();
        }
    }
    
    doLogin(){
        this.config.appConfig.subscribe((config:AppProperties)=>{
            console.log( config.userWebappUrl+ '/protected/login?webclient=' 
                + encodeURIComponent(this.config.baseUrl + this.location.prepareExternalUrl("") ));
                
            window.location.href = 
            config.userWebappUrl + '/protected/login?webclient=' 
                + encodeURIComponent(this.config.baseUrl + this.location.prepareExternalUrl("") );
        });    
    }
    
    doLogout() {
        this.userService.doLogout();
        this.router.navigate( ['/welcome', 'loggedOut'] );
    }  
}
