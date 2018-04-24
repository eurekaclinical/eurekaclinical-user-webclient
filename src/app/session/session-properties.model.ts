export class SessionProperties {
    
    private _maxInactiveInterval:number;
     
            
    constructor() {}
    
    get maxInactiveInterval():number {
        return this._maxInactiveInterval;
    }
    
    set maxInactiveInterval( value:number ) {
        this._maxInactiveInterval = value;
    }    
   
    
    toJSON() {
        
        let keys: string[] = ['maxInactiveInterval'
                   ];

        let json = {};
        for (let k of keys)
        {
            json[k] = this[k];
        }
        return json;
        
    }

}



