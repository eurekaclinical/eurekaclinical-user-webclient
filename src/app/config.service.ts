import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ConfigurationService {

    readonly UPDATE_USER_ENDPOINT = 'update-user';
    readonly GET_CURRENT_USER_ENDPOINT = 'users/me'

    private _serviceScheme: string = 'https';
    private _serviceHost: string = 'localhost';
    private _servicePort: number = 8443;
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

    get updateUserAPI(): string {
        return this.serviceUrl + this.UPDATE_USER_ENDPOINT;
    }

    get getCurrentUserAPI(): string {
        console.log("url: ", this.serviceUrl + this.GET_CURRENT_USER_ENDPOINT);
        return this.serviceUrl + this.GET_CURRENT_USER_ENDPOINT;
        
    }
        
}
