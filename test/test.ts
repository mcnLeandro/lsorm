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

class UserCopy {
    public id: number
    public name: string
    public books: Function
    public user: User

    public validate(): boolean {
        return (
            this.name !== null
        );
    }
}
// モデルもクラスである必要はない？
// Belongs_to??
// 


//↓


//プロトタイプはクラスである必要はない？
class UserPrototype{
    public id: number | null
    public name: string | null
    public books: Function | null
    public user: User | null
    constructor() {
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