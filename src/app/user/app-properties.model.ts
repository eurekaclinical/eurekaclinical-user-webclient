export class AppProperties {

    private _userWebappUrl:string; 
    
    private _ephiProhibited:boolean;
    
    private _demoMode:boolean;

    private _registryServiceUrl:string;  
    
    private _localAccountRegistrationEnabled:boolean;  
    
    private _authenticationMethod:string;
    
    private _accountTypeDisplayName:string;
    
    private _googleOAuthID:string;
    
    private _githubOAuthID:string;
    
    private _globusOAuthID:string;
    private _casUrl: string;
            
    constructor() {}
    
    get userWebappUrl():string {
        return this._userWebappUrl;
    }
    
    set userWebappUrl( value:string ) {
        this._userWebappUrl = value;
    }    
    
    get ephiProhibited():boolean {
        return this._ephiProhibited;
    }

    set ephiProhibited( value: boolean ) {
        this._ephiProhibited = value;
    }
    
    get demoMode():boolean {
        return this._demoMode;
    }

    set demoMode( value: boolean ) {
        this._demoMode = value;
    }
            
    get registryServiceUrl():string {
        return this._registryServiceUrl;
    }
    
    set registryServiceUrl( value:string ) {
        this._registryServiceUrl = value;
    }
                          
    get localAccountRegistrationEnabled():boolean {
        return this._localAccountRegistrationEnabled;
    }
    
    set localAccountRegistrationEnabled( value:boolean ) {
        this._localAccountRegistrationEnabled = value;
    }
    
    get authenticationMethod():string {
        return this._authenticationMethod;
    }
    
    set authenticationMethod( value:string ) {
        this._authenticationMethod = value;
    }    
     
    get accountTypeDisplayName():string {
        return this._accountTypeDisplayName;
    }
    
    set accountTypeDisplayName( value:string ) {
        this._accountTypeDisplayName = value;
    }
    
    get googleOAuthID(): string{
        return this._googleOAuthID;
    }
    
    set googleOAuthID(value:string){
        this._googleOAuthID = value;
    }
    
    get githubOAuthID(): string{
        return this._githubOAuthID;
    }
    
    set githubOAuthID(value:string){
        this._githubOAuthID = value;
    } 
    
    get globusOAuthID(): string{
        return this._globusOAuthID;
    }
    
    set globusOAuthID(value:string){
        this._globusOAuthID = value;
    }
    
    set casUrl(value:string) {
        this._casUrl = value;
    }    
    
    get casUrl(): string {
        return this._casUrl;
    }
    
    toJSON() {
        
        let json = {};
        
        json["userWebappUrl"] = this._userWebappUrl;
        
        return json;
        
    }

}



