import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { User } from './user.model';
import { ConfigurationService } from '../config.service';
import { ServiceResponse } from './service-response.model';
import { PasswordChange} from './passwordchange.model';
import { App } from './app.model';
import { AppProperties } from './app-properties.model'

@Injectable()
export class UserService {
data: any;
    private headers = new Headers( {
        'Content-Type': 'application/json'
    });
    
    constructor( private http: Http, private configService: ConfigurationService ) { }

    public doLogout() {
        return this.http
            .get( this.configService.casLogoutUrl );
    }
    
    updateUser( user: User ): Promise<ServiceResponse> {
        return this.http
            .put(this.configService.getUpdateUserAPI(String(user.id)), user.toJSON(), { headers: this.headers })
            .toPromise()
            .then( response => response.json() as ServiceResponse )
            .catch( this.handleError );
    }
    
    changePassword(request: PasswordChange, userid:number){
        return this.http
            .post(this.configService.getChangePasswordAPI(String(userid)), request.toJSON(), { headers: this.headers })
            .toPromise()
            .then( response => response.json() as ServiceResponse )
            .catch( this.handleError );
        
    }

    registerUser( registerUser: any ): Promise<any> {
        return this.http
            .post(this.configService.saveUserAPI, registerUser, { headers: this.headers })
            .toPromise()
            .then( response => response )
            .catch( this.handleError );
    }
    
    getCurrentUser(): Promise<User> {
        return this.http
            .get(this.configService.getCurrentUserAPI)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }
      
    getApps(): Promise<App[]> {
        return this.http
            .get(this.configService.appRegisterUrl)
            .toPromise()
            .then(function(response) {
                    let apps: any= response.json();
                    return apps as App[]; 
                }
                )
            .catch(this.handleError);
    }
        
    getUserWebappProperties():Observable<AppProperties> {
        return this.http.get(this.configService.getUserWebappPropertiesAPI)
            .map(response => response.json() as AppProperties)
            .catch( this.handleError );
    }
       
    
    private handleError( error: Response | any ) {
        return Promise.reject( error.message || error );
    }

}
