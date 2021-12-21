import Record from "./Record"
import RecordModel from './RecordModel'
type ORMParams<E extends RecordModel> = {
    db: {name:string},
    model: new () => E
}
class ORM<E extends RecordModel> {
    private idCount: number
    private db: { name: string }
    private model: new () => E;
    constructor({ db, model }: ORMParams<E>) {
        this.model = model
        this.db = db
        this.idCount = this.getLatestId()
    }
    /**
     * Private
     */
    private incrementId(): void {
        this.idCount += 1;
    }
    private getLatestId(): number {
        const table = this.getTable()
        
        if (table.length === 0) return 0
        
        //配列内から完全に削除されている前提の記述. nullなどにする場合は追記が必要
        const latestRecord: Record = table[table.length - 1]
        return latestRecord.id
    }
    private getTableName(): string {
        return `${this.db.name}-${this.model.name}`
    }
    private getTable(): Record[] {
        const json = localStorage.getItem(this.getTableName())
        if (!json) {
            return []
        }
        const table: Record[] = JSON.parse(json) 
        return table;
    }
    private getPrimitiveObj(recordModel: E): Record {
        const props = Object.keys(recordModel)
        const obj: { [key: string]: any} = {}

        const isPrimitive = (data: any) => {
            return (
                typeof data === 'string' ||
                typeof data === 'boolean' ||
                typeof data === 'number'
            )
        }

        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            const data = recordModel[prop as keyof E]
            if (isPrimitive(data) && prop in obj) {
                obj[prop] = data;
            }
        }

        return obj as Record;
    }
    /**
     * Public
     */
    public new(obj?: { [key: string]: any }) {
        const recordModel = new this.model()
        if(!obj) return recordModel
        return recordModel.setProps(obj)
    }
    public create(obj?: { [key: string]: any }){
        /**
         * new
         */
        const recordModel = this.new(obj)

        /**
         * save
         */
        //add id
        this.incrementId()
        recordModel.id = this.idCount;

        //validate
        if (!recordModel.validate()) {
            throw new Error(`Validation error`)
        }

        //save
        const primitiveObj = this.getPrimitiveObj(recordModel)
        const table = this.getTable()
        table.push(primitiveObj)

        const json = JSON.stringify(table)
        localStorage.setItem(this.getTableName(), json)
        /**
         * return
         */
        return 
    }
    // public update(
    //     { where, data }: {
    //         where: {[key: string]:any}
    //         data: {[key: string]:any}
    //     })
    // {
        
        
    // }
    
    public findById(id:number) {
        const table = this.getTable()

        for (let i = 0; i < table.length; i++) {
            const record = table[i];
            if(record.id === id) return  
        }

        throw new Error(`Not found record by id:${id}`)
    }
    public all() {

    }
}

export default ORM 