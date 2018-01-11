import { RegisterUser } from "./register-user.model"

export class RegisterUserService {
    private _registerUser: RegisterUser;
    
    get registerUser():RegisterUser {
        if (!this._registerUser)
            this._registerUser = new RegisterUser();
        return this._registerUser;
    }
    
    set registerUser(value:RegisterUser){
        this._registerUser = value;
    }
    
    convertToJsonRequest(user:RegisterUser):any {
        let keys: string[] = [
                    'username',
                    'firstName',
                    'lastName',
                    'email',
                    'verifyEmail',
                    'organization',
                    'title',
                    'department',
                    ];
        if (user.authenticationMethod == 'LOCAL'){
            keys = keys.concat(['password',
                    'verifyPassword']);
        }
       
        let json = {};
        for (let k of keys){
            json[k] = user[k];
        }
        
        if (user.authenticationMethod === 'LOCAL'){
            json['type'] = 'LOCAL';
            json['username'] = user['email'];
        }else 
            if (user.authenticationMethod ==='OAUTH'){
                json['type'] = 'OAUTH';
                json['oauthProvider'] = user.oauthUser.provider;
                json['providerUsername'] = user.oauthUser.providerUsername;
                json['username'] = user.oauthUser.userName;
            }
        
        console.log(json);
        return json;
        
    }
    
}


