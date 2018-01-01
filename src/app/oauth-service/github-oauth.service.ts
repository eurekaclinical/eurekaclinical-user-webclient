import {Observable} from "rxjs"
import {OAuthProvider} from "./oauth-provider.model";
import {Injectable} from "@angular/core"
import {Http, Response, Headers} from "@angular/http"
import {OAuthUser} from './oauth-user'
import {OAuthInterface} from './oauth.interface'
import 'rxjs/add/operator/mergeMap';

class GithubValidationResponse{
    public aud:string;
    public user_id:string;
    public scope: string;
    public expires_in:number;
    public accessToken;
}

class GithubToken{
    public access_token:string;
    public token_type:string;
    public expires_in:string;
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
    
    /*
    authenticate:Observable<any> (oauthProvider: OAuthProvider)
    {
        
    }
    */
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
        /*
        if (oauthProvider.responseType) {
            urlString += "&response_type=" + encodeURIComponent(oauthProvider.responseType);
        }
        */
        
        return urlString;
    }
    
    validateToken(params:GithubToken): Observable<GithubToken> {
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
    
    getUserAfterToken(params:GithubToken):Observable<OAuthUser>{
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
            oauthUser.providerUsername = oauthUser.email;
            return oauthUser;
        });
        
    }
    
    getOAuthUser(callbackParams:any ):Observable<OAuthUser> {
        callbackParams = <GithubToken>callbackParams;
        if(!callbackParams['access_token']){
            return new Observable<OAuthUser>((observer)=> {
                                        observer.error("No access token found")});
        }
        
        return this.validateToken(callbackParams).flatMap(resp=>this.getUserAfterToken(resp));
    }
    

}
    
