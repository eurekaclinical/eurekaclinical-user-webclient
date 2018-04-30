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
    providerInfo: Promise<OAuthProvider>;
    
    constructor(private httpClient: Http, private config: ConfigurationService, private location: Location){
        this.initializeProviderInfo();  
    }
    
    enabled():boolean{
        return true;
    }
    
    initializeProviderInfo(){
        this.providerInfo = this.config.appProperties.then((config:AppProperties) => {
            let providerInfo = new OAuthProvider();
            providerInfo.name = "GlobusProvider";
            providerInfo.url =  "https://auth.globus.org/v2/oauth2/authorize";
            providerInfo.clientId = config.globusOAuthID; 
            providerInfo.redirectUri = this.config.baseUrl + this.location.prepareExternalUrl('/oauthcallback/globus');
            providerInfo.responseType= "code";
            providerInfo.scope = "openid profile email urn:globus:auth:scope:auth.globus.org:view_identities "
            providerInfo.tokenValidationUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
            providerInfo.getProfileUrl = 'https://www.googleapis.com/plus/v1/people/me';
            return providerInfo;
        });
    }
    
    isEnabled():boolean{
        return true;
        
    }

    authenticationServerUrl():Promise<string>{
        return this.composeAuthenticationUrl(this.providerInfo);
    }
    
    composeAuthenticationUrl(oauthProviderPromise: Promise<OAuthProvider>):Promise<string>{
         return oauthProviderPromise.then((oauthProvider:OAuthProvider) => {

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
         });
    }

}
    

