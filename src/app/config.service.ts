import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AppProperties } from './user/app-properties.model';
import { Headers, Http, Response } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { Location } from '@angular/common'

@Injectable()
export class ConfigurationService {

    private _apiContextRoot: string = '/proxy-resource/';    
    readonly UPDATE_USER_ENDPOINT = 'users/{id}';
    readonly GET_CURRENT_USER_ENDPOINT = 'users/me';
    readonly CHANGE_PASSWORD_ENDPOINT = 'users/passwordchange';
    readonly REGISTRATION_ENDPOINT = 'userrequests';
    readonly OAUTH_ENDPOINT = 'oauthuser';
    readonly APP_REGISTER_ENDPOINT = 'components?type=WEBAPP&type=EXTERNAL';
    readonly CONFIG_FILE = 'assets/config.json';

    readonly DEFAULTIDLEWAITTIME=60;
    readonly LOGINCALLBACK_SELECTOR='home';
    private GET_SESSION_PROPERTIES_URL = '/protected/get-session-properties';
    private GET_SESSION_URL = '/protected/get-session';
    private DESTROY_SESSION_URL = '/destroy-session';
  
    private _appProperties: Promise<AppProperties>;
    private _defaultAppIconPath: string = "assets/icons/default-app-icon.png";
    
    constructor(private http: Http, private location: Location){
        this._appProperties = null;
        this.initUserWebappProperties();
    }
       
    initUserWebappProperties() {
        this._appProperties = this.http.get(this.getUserWebappPropertiesAPI)
                .toPromise()
            .then(function(response) {
                    return response.json() as AppProperties; 
                }
                )
            .catch(error=>this.handleError(error));
    }
    
    get getUserWebappPropertiesAPI(): string {  
        return this.location.prepareExternalUrl(this.CONFIG_FILE);     
    }
     
    get appProperties(): Promise<AppProperties> {
        return this._appProperties;
    }      
    
    get serviceUrl(): Promise<string> {
        return  this.appProperties.then(config=>{
                    return config.userWebappUrl + this._apiContextRoot;
                });  
    }
    
    get baseUrl(): string {
        return window.location.origin;
    }
    
    composeAPIEndpoint(endpointSegment:string): Promise<string>{
        return  this.serviceUrl.then(serviceUrl=>{
                    return serviceUrl + endpointSegment
                });
    }
    
    get appRegisterUrl(): Promise<string>{
        return this.composeAPIEndpoint(this.APP_REGISTER_ENDPOINT);
    }
    
    get updateUserAPITemplate(): Promise<string> {
        return this.composeAPIEndpoint(this.UPDATE_USER_ENDPOINT);
    }

    get saveUserAPI(): Promise<string> {
        return this.composeAPIEndpoint(this.REGISTRATION_ENDPOINT);
    }
    
    get changePasswordAPITemplate(): Promise<string> {
        return this.composeAPIEndpoint(this.CHANGE_PASSWORD_ENDPOINT);
    }
    
    getUpdateUserAPI(userId: string): Promise<string> {
        return  this.updateUserAPITemplate.then(apiTemplate=>{
                    return apiTemplate.replace("{id}",userId);
                }); 
    }
    
    getChangePasswordAPI(userId:string): Promise<string>{
        return  this.changePasswordAPITemplate.then(apiTemplate=>{
                    return apiTemplate.replace("{id}",userId);
                });
    }
    
    get getCurrentUserAPI(): Promise<string> {
        return this.composeAPIEndpoint(this.GET_CURRENT_USER_ENDPOINT);
    }
    
    getOAuthUserAPI(provider:string): Promise<string>{
        return this.composeAPIEndpoint(this.OAUTH_ENDPOINT + '/' + provider);
    }
    
    getSessionUrl():Promise<string>{
        return  this.appProperties.then(config=>{
            return config.userWebappUrl + this.GET_SESSION_URL;
        });
    }
    
    destroySessionUrl():Promise<string>{
        return  this.appProperties.then(config=>{
            return config.userWebappUrl + this.DESTROY_SESSION_URL;
        });
    }
    
    getSessionPropertiesUrl():Promise<string>{
        return  this.appProperties.then(config=>{
            return config.userWebappUrl + this.GET_SESSION_PROPERTIES_URL;
        });        
    }

    
    get defaultAppIconPath():string{
        return this.location.prepareExternalUrl(this._defaultAppIconPath);
    }
                  
    private handleError( error: Response | any ) {
        return Promise.reject( error.message || error );
    }

    
}
