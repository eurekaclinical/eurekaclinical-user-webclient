export class App {

    private _id:number;
    
    private _name:string;
    
    private _displayName:string;
        
    private _description:string;     
          
    private _url:string;
    
    private _type:number;
               
    constructor() {}
    
    get id():number {
        return this._id;
    }
    
    set id( value:number ) {
        this._id = value;
    }
    
    get name():string {
        return this._name;
    }
    
    set name( value:string ) {
        this._name = value;
    }
    
    get displayName():string {
        return this._displayName;
    }
    
    set displayName( value:string ) {
        this._displayName = value;
    }
        
    get description():string {
        return this._description;
    }
    
    set description( value:string ) {
        this._description = value;
    }   
    
    get url():string {
        return this._url;
    }
    
    set url( value:string ) {
        this._url = value;
    }                     
    
    get type():number {
        return this._type;
    }
    
    set type( value:number ) {
        this._type = value;
    }
    
    toJSON() {
        
        let keys: string[] = ['id',
                    'name',
                    'displayName',
                    'description',
                    'url',
                    'type'];

        let json = {};
        for (let k of keys)
        {
            json[k] = this[k];
        }
        return json;
        
    }

}



