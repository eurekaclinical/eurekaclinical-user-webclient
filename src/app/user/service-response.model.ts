export class ServiceResponse {
   
    private _statusCode: number;

    private _message: string;


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
