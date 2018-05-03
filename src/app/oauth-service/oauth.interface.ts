import {Observable} from 'rxjs'
import {OAuthUser} from './oauth-user'

export interface OAuthInterface{
    enabled():boolean;
    authenticationServerUrl():Promise<string>;
};