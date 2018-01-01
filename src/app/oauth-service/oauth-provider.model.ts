export class OAuthProvider{
    private _name:string;
    private _url:string;
    private _clientId:string;
    private _redirect_uri:string;
    private _response_type:string;
    private _scope:string;
    private _state:string;
    private _tokenValidationUrl:string;
    private _getProfileUrl:string;
    
    constructor(){
        
    }

    get name():string{
        return this._name;
    }

    set name(value:string){
        this._name = value;
    }

    get url():string{
        return this._url;
    }

    set url(value:string){
        this._url = value;
    }

    get clientId():string{
        return this._clientId;
    }

    set clientId(value:string){
        this._clientId = value;
    }

    get redirectUri():string{
        return this._redirect_uri;
    }

    set redirectUri(value:string){
        this._redirect_uri = value;
    }

    get responseType():string{
        return this._response_type;
    }

    set responseType(value:string){
        this._response_type = value;
    }

    get scope():string{
        return this._scope;
    }
  
    set scope(value:string){
        this._scope = value;
    }
    
    get state():string{
        return this._state;
    }
  
    set state(value:string){
        this._state = value;
    }
    
    get tokenValidationUrl():string{
        return this._tokenValidationUrl;
    }
  
    set tokenValidationUrl(value:string){
        this._tokenValidationUrl = value;
    }
    
    get getProfileUrl():string{
        return this._getProfileUrl;
    }
  
    set getProfileUrl(value:string){
        this._getProfileUrl = value;
    }
    
    
      
};

