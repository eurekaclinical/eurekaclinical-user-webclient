export class App {

    private _id:number;
    
    private _name:string;
    
    private _description:string;     
             
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
    
    get description():string {
        return this._description;
    }
    
    set description( value:string ) {
        this._description = value;
    }                    
    
    toJSON() {
        
        let keys: string[] = ['id',
                    'name',
                    'description'];

        let json = {};
        for (let k of keys)
        {
            json[k] = this[k];
        }
        return json;
        
    }

}



