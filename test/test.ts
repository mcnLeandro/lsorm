import LsormClient, { RecordModel } from "../src/index"

class User extends RecordModel{

    public name: string | null
    public books: Function | null
    public user: User | null
    constructor() {
        super()
        this.name = null
        this.books = null
        this.user = null
    }
    public validate(): boolean {
        return (
            this.name !== null
        );
    }

}


// const lsorm = new LsormClient({
//     db:{ name:"test" },
//     models: [
//         User
//     ]
// })




// console.log(lsorm.models.User.update({
//     where: { id: 1 },
//     data: { name: "hey" }
// }))

const testFunc = (Class: typeof RecordModel) => {

    interface NewClass extends typeof Class {

    }

    const original = new Class()
    Object.keys(original).forEach(prop => {
        const type = original[prop]
        interface NewClass {
            [prop]: typeof type
        }
    });
    

    return class newClass extends Class  {

    }
}



const newClass = testFunc(User)
const newClassIn = new newClass()

console.log(newClassIn)