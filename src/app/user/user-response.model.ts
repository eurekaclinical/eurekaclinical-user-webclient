import { User } from './user.model';
export class UserResponse {
   
    private _statusCode: number;

    private _message: string;
    
    private _user:User;

    get user(): User {
        return this._user;
    }
    
    set user( value:User ) {
        this._user = value;
    } 

    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode( value: number ) {
        this._statusCode = value;
    }

    get message(): string {
        return this._message;
    }

    set message( value: string ) {
        this._message = value;
    }
    
    get ok(): boolean {
        return ( this._statusCode >= 200 && this._statusCode < 300 ) ? true : false;
    }

}
