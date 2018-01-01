import {Observable} from "rxjs"
import {OAuthProvider} from "./oauth-provider.model";
import {Injectable} from "@angular/core"
import { Http, Response} from "@angular/http"
import {OAuthUser} from './oauth-user'
import {OAuthInterface} from './oauth.interface'
import {ConfigurationService} from '../config.service'
import {GoogleOAuthService} from './google-oauth.service'

@Injectable()
export class OAuthManagerService{
    private _providers: Map<string, OAuthInterface> = new Map<string,OAuthInterface>();
    
    
    constructor(private httpClient: Http, private oauthProvider: OAuthProvider, private configService:ConfigurationService, private google2Provider: GoogleOAuthService){
        this.registerOAuthService('google',google2Provider);
    }
    
    registerOAuthService(provider:string, oauth: OAuthInterface){
       this._providers.set(provider,oauth);
    }
    
    
    
    
    
    
  
    authenticationServerUrl(providerName: string):string{
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
    
    getOAuthUser(providerName:string,callbackHash:string ):Observable<OAuthUser> {
        console.log('OAuthProvider: ' + providerName );
        let params = this.parseQueryString(callbackHash);
        console.log(params);
        
        let provider  = this._providers.get(providerName);
        
        if (provider && provider.enabled()){
            return provider.getOAuthUser(params);
        }
        else{
            return new Observable<OAuthUser>((observer)=> {
                                        observer.error("Provider not available")});
        }
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
    

