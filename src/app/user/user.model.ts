import { Role } from './role.model';
export class User {
    
    private _type:string;
    
    private _id:number;
    
    private _username:string;
    
    private _roles:number[];
    
    private _created:Date;
    
    private _active:boolean;
    
    private _firstName:string;
    
    private _lastName:string;
    
    private _fullName:string;    
    
    private _email:string;
        
    private _organization:string;  
    
    private _lastLogin:Date;
        
    private _title:string;
    
    private _department:string;     

    private _loginType:string; 
    
    private _verified:boolean; 
    
    private _verificationCode:string; 
    
    private _password:string;    
            
    constructor() {}
    
    get type():string {
        return this._type;
    }
    
    set type( value:string ) {
        this._type = value;
    }    
    
    get id():number {
        return this._id;
    }
    
    set id( value:number ) {
        this._id = value;
    }
    
    get username():string {
        return this._username;
    }
    
    set username( value:string ) {
        this._username = value;
    }
    
    get roles():number[] {
        return this._roles;
    }
    
    set roles( value: number[] ) {
        this._roles = value;
    }

    get created():Date {
        return this._created;
    }
    
    set created( value:Date ) {
        this._created = value;
    }  
                    
    get active():boolean {
        return this._active;
    }

    set active( value: boolean ) {
        this._active = value;
    }
      
    get firstName():string {
        return this._firstName;
    }
    
    set firstName( value:string ) {
        this._firstName = value;
    }
    
    get lastName():string {
        return this._lastName;
    }
    
    set lastName( value:string ) {
        this._lastName = value;
    }
    
    get fullName():string {
        return this._fullName;
    }
    
    set fullName( value:string ) {
        this._fullName = value;
    }
    
    get email():string {
        return this._email;
    }
    
    set email( value:string ) {
        this._email = value;
    }
        
    get organization():string {
        return this._organization;
    }
    
    set organization( value:string ) {
        this._organization = value;
    }
        
    get lastLogin():Date {
        return this._lastLogin;
    }
    
    set lastLogin( value:Date ) {
        this._lastLogin = value;
    }  
        
    get title():string {
        return this._title;
    }
    
    set title( value:string ) {
        this._title = value;
    }
    
    get department():string {
        return this._department;
    }
    
    set department( value:string ) {
        this._department = value;
    }                    

    get loginType():string {
        return this._loginType;
    }
    
    set loginType( value:string ) {
        this._loginType = value;
    }  
    
    get verified():boolean {
        return this._verified;
    }

    set verified( value: boolean ) {
        this._verified = value;
    }
           
    get verificationCode():string {
        return this._verificationCode;
    }
    
    set verificationCode( value:string ) {
        this._verificationCode = value;
    }  
    
    get password():string {
        return this._password;
    }
    
    set password( value:string ) {
        this._password = value;
    }          
    toJSON() {
        
        let json = {};
        
        json["email"] = this._email;
        
        return json;
        
    }

}



