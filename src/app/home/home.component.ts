import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Location } from '@angular/common'
import { UserService } from '../user/user.service';
import { App } from '../user/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    
    apps: App[];
    
    constructor(private userService: UserService, private location: Location ) { }

    ngOnInit() {
        this.getApps();
    }
    
    getApps() : void {
        this.userService.getApps()
            .then(apps => {
                this.apps = apps;
            });           
    }
    
    getIconUrl(app:App,size:string):string{
        console.log(app);
        let iconPath = app.icon[size];
        if(!iconPath)
            return iconPath;
        
        if (iconPath.startsWith("https:") || iconPath.startsWith("http:")){
            return iconPath;
        }
        else{                  
            return app.url + "/"+iconPath;
        }

    }
}