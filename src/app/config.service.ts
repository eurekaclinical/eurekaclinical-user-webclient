import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ConfigurationService {

    readonly UPDATE_USER_ENDPOINT = 'users/{id}';
    readonly GET_CURRENT_USER_ENDPOINT = 'users/me';
    readonly CHANGE_PASSWORD_ENDPOINT = 'users/passwordchange';
    readonly REGISTRATION_ENDPOINT = 'unprotected/userrequests';
    
    private _serviceScheme: string = 'https';
    private _serviceHost: string = 'localhost';
    private _servicePort: number = 4200;
    private _apiContextRoot: string = '/eurekaclinical-user-webapp/proxy-resource/';

    get serviceUrl(): string {

        let serviceUrl: string = '';

        if( environment.useScheme ) {
            serviceUrl += ( environment.serviceScheme ) ? environment.serviceScheme : this._serviceScheme;
            serviceUrl += '://';
        }

        if( environment.useHost ) {
            serviceUrl += ( environment.serviceHost ) ? environment.serviceHost : this._serviceHost;
        }

        if( environment.usePort ) {
            serviceUrl += ':';
            serviceUrl += ( environment.servicePort ) ? environment.servicePort : this._servicePort;
        }

        serviceUrl += ( environment.apiContextRoot ) ? environment.apiContextRoot : this._apiContextRoot;

        return serviceUrl;

    }

    get updateUserAPITemplate(): string {
        return this.serviceUrl + this.UPDATE_USER_ENDPOINT;
    }

    get saveUserAPI(): string {
        //return "https://localhost:4200/eurekaclinical-user-service/api/userrequests"
        return this.serviceUrl + this.REGISTRATION_ENDPOINT;
    }
    
    get changePasswordAPITemplate(): string {
        return this.serviceUrl + this.CHANGE_PASSWORD_ENDPOINT;
    }
    
    getUpdateUserAPI(userId: string): string {
        return this.updateUserAPITemplate.replace("{id}",userId);
    }
    
    getChangePasswordAPI(userId:string): string{
        return this.changePasswordAPITemplate.replace("{id}",userId);
    }
    
    get getCurrentUserAPI(): string {
        return this.serviceUrl + this.GET_CURRENT_USER_ENDPOINT;
        
    }
    
    get getUserWebappPropertiesAPI(): string {
        return 'assets/config.json';     
    }    
}
