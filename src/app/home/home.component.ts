import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { UserService } from '../user/user.service';
import { App } from '../user/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    
    apps: App[];
    
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getApps();
    }
    
    getApps() : void {
        this.userService.getApps()
            .then(apps => {
                this.apps = apps;
            });           
    }
    
    getIconUrl(iconPath:string):string{
        if (iconPath.startsWith("https:") || iconPath.startsWith("http:")){
            return iconPath;
        }
        else{                  
            return "assets/icons/" + iconPath;
        }

    }
}