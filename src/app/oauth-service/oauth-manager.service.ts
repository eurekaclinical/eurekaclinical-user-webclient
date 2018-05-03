import {Observable} from "rxjs"
import {OAuthProvider} from "./oauth-provider.model";
import {Injectable} from "@angular/core"
import { Http, Response} from "@angular/http"
import {OAuthUser} from './oauth-user'
import {OAuthInterface} from './oauth.interface'
import {ConfigurationService} from '../config.service'
import {GoogleOAuthService} from './google-oauth.service'
import {GithubOAuthService} from './github-oauth.service'
import {GlobusOAuthService} from './globus-oauth.service'

@Injectable()
export class OAuthManagerService{
    private _providers: Map<string, OAuthInterface> = new Map<string,OAuthInterface>();
    
    
    constructor(private httpClient: Http, private oauthProvider: OAuthProvider, private configService: ConfigurationService, private google2Provider: GoogleOAuthService, private github2Provider: GithubOAuthService, private globusProvider: GlobusOAuthService){
        this.registerOAuthService('google',google2Provider);
        this.registerOAuthService('github',github2Provider);
        this.registerOAuthService('globus',globusProvider);
    }
    
    registerOAuthService(provider:string, oauth: OAuthInterface){
       this._providers.set(provider,oauth);
    }

  
    authenticationServerUrl(providerName: string):Promise<string>{
        if (!this._providers.get(providerName))
            return null;
        else{
            return this._providers.get(providerName).authenticationServerUrl(); 
        }
    }
    
    get supportedOAuthProviders():string[]{
        let supportedProviders = [];
        
        for (let p in this._providers.keys()){
            if (this._providers.get(p).enabled())
            {
                supportedProviders.push(p);
            }
            
        }
        
        return supportedProviders;
    }
    
    getOAuthUser(providerName:string,params:any ):Observable<OAuthUser> {
        console.log('OAuthProvider: ' + providerName );
        console.log(params);
        return Observable.fromPromise(this.configService.getOAuthUserAPI(providerName)).flatMap(apiEndpoint=>{
            return this.httpClient.get(apiEndpoint
            , {params: params})
            .map(response => response.json() as OAuthUser);
        });
    }
        
   
    parseQueryString(queryString: string): any{
        let params = {};
        let regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }
}