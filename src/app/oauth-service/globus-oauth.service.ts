import {Observable} from "rxjs"
import {OAuthProvider} from "./oauth-provider.model";
import {Injectable} from "@angular/core"
import {Http, Response, Headers} from "@angular/http"
import {OAuthInterface} from './oauth.interface'
import 'rxjs/add/operator/mergeMap';
import { Location } from '@angular/common'
import {ConfigurationService} from '../config.service'
import { AppProperties } from '../user/app-properties.model';


class GlobusValidationResponse{
    public aud:string;
    public user_id:string;
    public scope: string;
    public expires_in:number;
}

@Injectable()
export class GlobusOAuthService implements OAuthInterface{
    providerInfo: OAuthProvider = new OAuthProvider();
    
    constructor(private httpClient: Http, private config: ConfigurationService, private location: Location){
        this.initializeProviderInfo();  
    }
    
    enabled():boolean{
        return true;
    }
    
    initializeProviderInfo(){
        this.providerInfo.name = "GlobusProvider";
        this.providerInfo.url =  "https://auth.globus.org/v2/oauth2/authorize";
        /*
        this.config.getUserWebappProperties().subscribe(
             function (response) {this.providerInfo.clientId = response.globusOAuthID;}
        );
        */
        //this.providerInfo.clientId = this.config.appConfig.globusOAuthID;
        this.config.appConfig.then((config:AppProperties) => {
            this.providerInfo.clientId = config.globusOAuthID; 
        }); 
        
        this.providerInfo.redirectUri = this.config.baseUrl + this.location.prepareExternalUrl('/oauthcallback/globus');
        this.providerInfo.responseType= "code";
        this.providerInfo.scope = "openid profile email urn:globus:auth:scope:auth.globus.org:view_identities "
        this.providerInfo.tokenValidationUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
        this.providerInfo.getProfileUrl = 'https://www.googleapis.com/plus/v1/people/me'
    }
    
    isEnabled():boolean{
        return true;
        
    }

    authenticationServerUrl():string{
        return this.composeAuthenticationUrl(this.providerInfo);
    }
    
    composeAuthenticationUrl(oauthProvider: OAuthProvider):string{
        
        let urlString: string = oauthProvider.url + "?client_id=" + encodeURIComponent(oauthProvider.clientId);
        
        if (oauthProvider.redirectUri){
            urlString += "&redirect_uri=" + encodeURIComponent(oauthProvider.redirectUri);
        }
        
        if (oauthProvider.scope) {
            urlString += "&scope=" + encodeURIComponent(oauthProvider.scope);
        }
        
        if (oauthProvider.responseType) {
            urlString += "&response_type=" + encodeURIComponent(oauthProvider.responseType);
        }
        
        return urlString;
    }

}
    

