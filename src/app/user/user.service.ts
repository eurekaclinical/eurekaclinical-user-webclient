import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user.model';
import { RegisterUser } from '../user/register-user.model';
import { AppProperties } from './app-properties.model';
import { ConfigurationService } from '../config.service';
import { ServiceResponse } from './service-response.model';
import { PasswordChange} from './passwordchange.model';


@Injectable()
export class UserService {

    private headers = new Headers( {
        'Content-Type': 'application/json'
    });
    
    constructor( private http: Http, private configService: ConfigurationService ) { }

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

    saveUser( registerUser: RegisterUser ): Promise<ServiceResponse> {
        return this.http
            .post( this.configService.saveUserAPI, JSON.stringify( registerUser ), { headers: this.headers })
            .toPromise()
            .then( response => response.json() as ServiceResponse )
            .catch( this.handleError );
    }
    
    getCurrentUser() : Promise<User> {
        return this.http
            .get(this.configService.getCurrentUserAPI)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }
        
    getUserWebappProperties() : Promise<AppProperties> {
        return this.http
            .get(this.configService.getUserWebappPropertiesAPI)
            .toPromise()
            .then(response => this.extractAppPropertiesData(response))
            .catch(this.handleError);
    }
        
    private extractAppPropertiesData(response: Response){
        let data = response.json();
        let appProperties = new AppProperties();
        
        appProperties.userWebappUrl = data.url;
        appProperties.ephiProhibited =  data.ephiProhibited;
        appProperties.demoMode = data.demoMode;
        appProperties.registryServiceUrl = data.registryServiceUrl;
        appProperties.localAccountRegistrationEnabled = data.localAccountRegistrationEnabled;
        
        return appProperties;
    }
    
    private handleError( error: Response | any ) {
        return Promise.reject( error.message || error );
    }

}