export class OAuthUser{
    private _firstName:string;
    private _lastName:string;
    private _email:string;
    private _provider:string;
    private _providerUserName:string;
    private _userName:string;  
    
    get firstName():string{
        return this._firstName;
    }
  
    set firstName(value:string){
        this._firstName = value;
    }
      
    get lastName():string{
        return this._lastName;
    }
  
    set lastName(value:string){
        this._lastName = value;
    }
    
    get email():string{
        return this._email;
    }
  
    set email(value:string){
        this._email = value;
    }
    
    get provider():string{
        return this._provider;
    }
  
    set provider(value:string){
        this._provider = value;
    }
    
   get providerUsername():string{
        return this._providerUserName;
    }
  
    set providerUsername(value:string){
        this._providerUserName = value;
    }
    
    get userName():string{
        return this._userName;
    }
  
    set userName(value:string){
        this._userName = value;
    }
}


