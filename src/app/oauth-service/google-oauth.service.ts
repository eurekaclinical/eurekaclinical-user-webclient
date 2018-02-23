import {Observable} from "rxjs"
import {OAuthProvider} from "./oauth-provider.model";
import {Injectable} from "@angular/core"
import {Http, Response, Headers} from "@angular/http"
import {OAuthInterface} from './oauth.interface'
import 'rxjs/add/operator/mergeMap';
import {Router} from "@angular/router"
import { Location } from '@angular/common'
import {ConfigurationService} from '../config.service'
import { AppProperties } from '../user/app-properties.model';


class GoogleValidationResponse{
    public aud:string;
    public user_id:string;
    public scope: string;
    public expires_in:number;
}

@Injectable()
export class GoogleOAuthService implements OAuthInterface{
    providerInfo: OAuthProvider = new OAuthProvider();
    
    constructor(private httpClient: Http,private location: Location, private config:ConfigurationService, private router: Router){
        this.initializeProviderInfo();  
    }

    enabled():boolean{
        return true;
    }
    
    initializeProviderInfo(){
        this.providerInfo.name = "Google2Provider";
        this.providerInfo.url =  "https://accounts.google.com/o/oauth2/auth";
        /*
        this.config.getUserWebappProperties().subscribe(
            function (response) {this.providerInfo.clientId = response.googleOAuthID;}
        );
        */
        this.config.appConfig.subscribe((config:AppProperties) => {
            this.providerInfo.clientId = config.googleOAuthID; 
        }) 
       
        this.providerInfo.redirectUri = this.config.baseUrl + this.location.prepareExternalUrl('/oauthcallback/google');
        this.providerInfo.responseType= "code";
        this.providerInfo.scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me"
        this.providerInfo.tokenValidationUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
        this.providerInfo.getProfileUrl = 'https://www.googleapis.com/plus/v1/people/me'
        console.log(this.providerInfo);
    }
    
    isEnabled():boolean{
        return true;
    }
    
    authenticationServerUrl():string{//only useful
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
    

