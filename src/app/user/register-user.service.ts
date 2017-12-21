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
}


