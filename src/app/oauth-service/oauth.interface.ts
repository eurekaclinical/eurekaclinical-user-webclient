import {Observable} from 'rxjs'
import {OAuthUser} from './oauth-user'

export interface OAuthInterface{
    enabled():Promise<boolean>;
    authenticationServerUrl():Promise<string>;
};