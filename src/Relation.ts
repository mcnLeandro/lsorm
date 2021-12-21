import { RecordModel } from ".";
import ORM from "./ORM";

class Relation<E> {
    private orm1:ORM<any>
    private orm2:ORM<any>

    constructor({ orm1, orm2 }: { orm1: ORM<any>, orm2: ORM<any> }) {
        this.orm1 = orm1
        this.orm2 = orm2
    }

    public static belongsTo(model: any, foreignKey: string): Function {
        return ({ orm1, orm2 }: { orm1: ORM<any>, orm2: ORM<any> }) => {
            const relation = new Relation({ orm1, orm2 })
            
        }
    }
    public belongsTo(model: any, foreignKey:string){
        
    }

    public hasMany(): Function {
        return () => { }
    }

}
