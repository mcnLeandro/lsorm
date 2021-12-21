class RecordModel {
    public id: number | null
    constructor() {
        this.id = null
    }
    public setProps(obj: { [key: string]: any }) {
        const props = Object.keys(obj)

        for (let i = 0; i < props.length; i++) {
            const prop = props[i] as keyof RecordModel;
            if (prop in this) {
                this[prop] = obj[prop]
            }
        }

        return this;
    }
    public validate(): boolean {
        return true;
    }
}

export default RecordModel 