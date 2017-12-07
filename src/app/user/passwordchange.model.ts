export class PasswordChange {
    
    private _oldPassword:string;
    
    private _newPassword:string;
    
     
    
    get oldPassword():string {
        return this._oldPassword;
    }
    
    set oldPassword( value:string ) {
        this._oldPassword = value;
    }
    
    get newPassword():string {
        return this._newPassword;
    }
    
    set newPassword( value:string ) {
        this._newPassword = value;
    }
    
    toJSON() {
        
        let keys: string[] = [
                    'oldPassword',
                    'newPassword'];

        let json = {};
        for (let k of keys)
        {
            json[k] = this[k];
        }
        return json;
        
    }

}



