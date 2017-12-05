import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user.model';
import { ConfigurationService } from '../config.service';
import { UserResponse } from './user-response.model';

@Injectable()
export class UserService {

    private headers = new Headers( {
        'Content-Type': 'application/json'
    });
    
    constructor( private http: Http, private configService: ConfigurationService ) { }

    updateUser( user: User ): Promise<UserResponse> {
        return this.http
            .post( this.configService.updateUserAPI, JSON.stringify( user ), { headers: this.headers })
            .toPromise()
            .then( response => response.json() as UserResponse )
            .catch( this.handleError );
    }

    getCurrentUser() : Promise<User> {
        return this.http
            .get(this.configService.getCurrentUserAPI)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }
        
    private handleError( error: Response | any ) {
        return Promise.reject( error.message || error );
    }

}