import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AppProperties } from './user/app-properties.model';
import { Headers, Http, Response } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { Location } from '@angular/common'

@Injectable()
export class ConfigurationService {

    readonly UPDATE_USER_ENDPOINT = 'users/{id}';
    readonly GET_CURRENT_USER_ENDPOINT = 'users/me';
    readonly CHANGE_PASSWORD_ENDPOINT = 'users/passwordchange';
    readonly CAS_LOGOUT_ENDPOINT = 'https://localhost:8443/cas-mock/logout';
    readonly REGISTRATION_ENDPOINT = 'userrequests';
    readonly OAUTH_ENDPOINT = 'oauthuser/';
    readonly APP_REGISTER_ENDPOINT = 'components?type=WEBAPP&type=EXTERNAL';
    
    
    private _serviceScheme: string = 'https';
    private _serviceHost: string = 'localhost';
    private _servicePort: number = 4200;
    private _apiContextRoot: string = '/eurekaclinical-user-webapp/proxy-resource/';
    
    private _appProperties: Observable<AppProperties>;
    
    constructor(private http: Http, private location: Location){
       
    }
    
     init() {
      this.initUserWebappProperties();
     }
     
     initUserWebappProperties() {
        this._appProperties = this.http.get(this.getUserWebappPropertiesAPI)
            .map(response=>response.json() as AppProperties)
            .catch(this.handleError);
    }
      
    
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
    
    get baseUrl(): string {
        return window.location.origin;
    } 
    
    get appRegisterUrl(): string{
        return this.serviceUrl + this.APP_REGISTER_ENDPOINT;
    }
    
    get casLogoutUrl(): string {
        return this.CAS_LOGOUT_ENDPOINT;
    }    

    get updateUserAPITemplate(): string {
        return this.serviceUrl + this.UPDATE_USER_ENDPOINT;
    }

    get saveUserAPI(): string {
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
    
    getOAuthUserAPI(provider:string): string{
            return this.serviceUrl + this.OAUTH_ENDPOINT + provider;        
    }
    
    get getUserWebappPropertiesAPI(): string {
        //return 'assets/config.json';  
        return this.location.prepareExternalUrl('assets/config.json');     
    }
     
    get appConfig(): Observable<AppProperties> {
        return this._appProperties;
    }  
             
    
    private handleError( error: Response | any ) {
        return Promise.reject( error.message || error );
    }

    
}
