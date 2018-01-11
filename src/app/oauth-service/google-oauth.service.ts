import {Observable} from "rxjs"
import {OAuthProvider} from "./oauth-provider.model";
import {Injectable} from "@angular/core"
import {Http, Response, Headers} from "@angular/http"
import {OAuthUser} from './oauth-user'
import {OAuthInterface} from './oauth.interface'
import 'rxjs/add/operator/mergeMap';

class GoogleValidationResponse{
    public aud:string;
    public user_id:string;
    public scope: string;
    public expires_in:number;
    public accessToken;
}

class GoogleToken{
    public access_token:string;
    public token_type:string;
    public expires_in:string;
}
@Injectable()
export class GoogleOAuthService implements OAuthInterface{
    providerInfo: OAuthProvider = new OAuthProvider();
    
    constructor(private httpClient: Http){
        this.initializeProviderInfo();  
    }
    
    enabled():boolean{
        return true;
    }
    
    initializeProviderInfo(){
        this.providerInfo.name = "Google2Provider";
        this.providerInfo.url =  "https://accounts.google.com/o/oauth2/auth";
        this.providerInfo.clientId = "32862166882-uo3mehuo8klmd9n16vfujuk1cs7ciagu.apps.googleusercontent.com"
        this.providerInfo.redirectUri = "https://localhost:4200/oauthcallback/google";
        this.providerInfo.responseType= "token";
        this.providerInfo.scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me"
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
    
    validateToken(params:GoogleToken): Observable<GoogleToken> {
        let queryString: string = this.providerInfo.tokenValidationUrl + "?access_token="+params['access_token'];
        console.log(this);
        
        return this.httpClient.get(queryString).map(response => {
                    let results = response.json();
                    
                    if (results['aud'] != this.providerInfo.clientId){
                        Observable.throw('clientID does not match');
                    }
                    console.log('validation token success');
                    console.log(results); 
                    return params;
                    });
        
    }
    
    getUserAfterToken(params:GoogleToken):Observable<OAuthUser>{
        let header = new Headers();
        header.append("Authorization", params.token_type + " " + params.access_token);
        console.log("working on getting user");
        console.log(this);
        return this.httpClient.get(this.providerInfo.getProfileUrl,{
            headers:header
        }).map(response=>{
            let oauthUser = new OAuthUser();
            let res = response.json();

            oauthUser.lastName = res.name.familyName;
            oauthUser.firstName = res.name.givenName;
            oauthUser.email = res.emails[0].value;
            oauthUser.userName = 'GoogleProfile#'+res.id;
            oauthUser.provider = "Google2Provider";
            oauthUser.providerUserName = oauthUser.email;
            return oauthUser;
        });
        
    }
    
    getOAuthUser(callbackParams:any ):Observable<OAuthUser> {
        callbackParams = <GoogleToken>callbackParams;
        if(!callbackParams['access_token']){
            return new Observable<OAuthUser>((observer)=> {
                                        observer.error("No access token found")});
        }
        
        return this.validateToken(callbackParams).flatMap(resp=>this.getUserAfterToken(resp));
    }
    

}
    

