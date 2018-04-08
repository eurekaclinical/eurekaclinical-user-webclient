import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Location } from '@angular/common'
import { UserService } from '../user/user.service';
import { App } from '../user/app.model';
import { ConfigurationService } from '../config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    apps: App[];
    
    constructor(private userService: UserService, private location: Location, private config: ConfigurationService ) { }

    ngOnInit() {
        this.getApps();
    }
    
    getApps() : void {
        this.userService.getApps()
            .then(apps => {
                this.apps = apps;
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

    getIconUrl(app:App,size:string):string{
         let iconPath = '';
        switch (size){
            case 'small':
                iconPath = app.smallIcon;
                break;
            case 'medium':
                iconPath = app.mediumIcon;
                break;
            case 'large':
                iconPath = app.largeIcon;
            
        }
        
        if(!iconPath)
            return iconPath;
        
        if (iconPath.startsWith("https:") || iconPath.startsWith("http:")){
            return iconPath;
        }
        else{                  
            return app.url + "/"+iconPath;
        }

    }
    
    handleNoIconImageFound($event){
        if ((event.target as HTMLImageElement).src != this.config.defaultAppIconPath){
          (event.target as HTMLImageElement).src = this.config.defaultAppIconPath;  
        };
    }
}