import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import { User } from './user.model';
import { ConfigurationService } from '../config.service';
import { ServiceResponse } from './service-response.model';
import { PasswordChange} from './passwordchange.model';
import { App } from './app.model';
import { AppProperties } from './app-properties.model'
import { SessionProperties } from '../session/session-properties.model'
import { EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class UserService {
data: any;
    private headers = new Headers( {
        'Content-Type': 'application/json'
    });
    
    loginEvent:EventEmitter<boolean>;
    logoutEvent:EventEmitter<boolean>;
    isLoggedIn:boolean;
    constructor( private http: Http, private configService: ConfigurationService ) { 
        this.loginEvent = new EventEmitter<boolean>();
        this.logoutEvent = new EventEmitter<boolean>();
        this.isLoggedIn = false;
    }
       
    updateUser( user: User ): Promise<ServiceResponse> {
        return this.configService.getUpdateUserAPI(String(user.id)).then(apiEndpoint => {
            return this.http
            .put(apiEndpoint, user.toJSON(), { headers: this.headers })
            .toPromise()
            .then( response => response.json() as ServiceResponse )
            .catch( this.handleError );
        });
    }
    
    changePassword(request: PasswordChange, userid:number): Promise<ServiceResponse>{
        return this.configService.getChangePasswordAPI(String(userid)).then(apiEndpoint =>{
            return this.http
            .post(apiEndpoint, request.toJSON(), { headers: this.headers })
            .toPromise()
            .then( response => response.json() as ServiceResponse )
            .catch( this.handleError );
        });
    }

    registerUser( registerUser: any ): Promise<any> {
        return this.configService.saveUserAPI.then(apiEndpoint=> {
            return this.http
            .post(apiEndpoint, registerUser, { headers: this.headers })
            .toPromise()
            .then( response => response )
            .catch( this.handleError );
        });
    }
    
    getCurrentUser(): Promise<User> {
        return this.configService.getCurrentUserAPI.then(apiEndpoint=>{
            return this.http
            .get(apiEndpoint)
            .toPromise()
                .then(response => {this.isLoggedIn = true; this.loginEvent.emit(true); return response.json() as User})
            .catch(error=> { this.logOut(); throw(error);});
        });
    }
    
    getLoginEvent() :EventEmitter<boolean>{
        return this.loginEvent;     
    }
    
    getLogoutEvent(){
        return this.logoutEvent;
    }
    
    logOut(){
        if (this.isLoggedIn){
            this.isLoggedIn = false;
            this.logoutEvent.emit(true);
        }
    }
    
    getSession():Promise<Response> {
        return this.configService.getSessionUrl().then(apiEndpoint =>{ 
                    return this.http
                    .get(apiEndpoint)
                    .toPromise();
                })
                .then(response => {return response;})
            .catch(error => {this.logOut(); throw(error);});
    }
    
    getSessionProperties(): Promise<SessionProperties> {
        return this.configService.getSessionPropertiesUrl().then(apiEndpoint =>{    
            return this.http
            .get(apiEndpoint)
            .toPromise()
            .then(response => response.json() as SessionProperties)
            .catch(error=>{this.handleError(error); throw(error);});
        });
    }
    
    destroySession():Promise<Response> {
        return this.configService.destroySessionUrl().then(apiEndpoint =>{ 
                    return this.http
                    .get(apiEndpoint)
                    .toPromise();
                })
                .then(response => {this.logOut(); return response;})
            .catch(error => {this.logOut(); throw(error);});
    }
     
    getApps(): Promise<App[]> {
        return this.configService.appRegisterUrl.then(apiEndpoint=>{
            return this.http
            .get(apiEndpoint)
            .toPromise()
            .then(function(response) {
                    let apps: any= response.json();
                    return apps as App[]; 
                }
                )
            .catch(error=>{throw(error);});
        });
    }
        
    private handleError( error: Response | any ) {
        return Promise.reject( error.message || error );
    }

}
