import ORM from './ORM'
import RecordModel from './RecordModel'

type LsormClientParamas = {
    db: {
        name: string
    },
    models: (new ()=> RecordModel)[]
}

class LsormClient {
    public db: { name:string}
    public models: {[key:string]: ORM<RecordModel>}
    constructor({ db, models }: LsormClientParamas) {
        this.db = db;
        this.models = {};

        this.migrate(models)
    }
    private getTableName(modelName: string) {
        const dbName = this.db.name
        return `${dbName}-${modelName}`
    }
    public migrate(models: (new ()=> RecordModel)[]) {
        models.forEach(model => {
            const tableName = this.getTableName(model.name)
            const jsonData: string | null = localStorage.getItem(tableName)

            /**
             * init table
             */
            if (!jsonData) {
                localStorage.setItem(tableName, JSON.stringify([]))
                console.log(`
                ********************
                migrate ${model.name} as ${tableName} table.
                ********************
                `)
            }

            /**
             * init propaty
             */
            this.models[model.name] = new ORM({
                db: this.db,
                model: model
            })
        });
    }
    public drop() {
        Object.values(this.models).forEach(model => {
            const tableName = this.getTableName(model.constructor.name)
            localStorage.removeItem(tableName)
        });
    }
}

export default LsormClient;