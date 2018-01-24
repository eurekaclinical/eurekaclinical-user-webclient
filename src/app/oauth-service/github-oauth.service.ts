import {Observable} from "rxjs"
import {OAuthProvider} from "./oauth-provider.model";
import {Injectable} from "@angular/core"
import {Http, Response, Headers} from "@angular/http"
import {OAuthInterface} from './oauth.interface'
import 'rxjs/add/operator/mergeMap';

class GithubValidationResponse{
    public aud:string;
    public user_id:string;
    public scope: string;
    public expires_in:number;
}

@Injectable()
export class GithubOAuthService implements OAuthInterface{
    providerInfo: OAuthProvider = new OAuthProvider();
    
    constructor(private httpClient: Http){
        this.initializeProviderInfo();  
    }
    
    enabled():boolean{
        return true;
    }
    
    initializeProviderInfo(){
        this.providerInfo.name = "GitHub2Provider";
        this.providerInfo.url =  "https://github.com/login/oauth/authorize";
        this.providerInfo.clientId = "6848fbb612df8f5c5a15"
        this.providerInfo.redirectUri = "https://localhost:4200/oauthcallback/github";
  
        this.providerInfo.scope = "read:user";
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
        
        return urlString;
    }
    
}
    

