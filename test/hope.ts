import { RecordModel } from "../src"
import ORM from "../src/ORM"

class AssociationBuilder<E> {
    public fromORM: ORM<any>
    public toORM: ORM<any>

    public callback: Function
    public selfId: number

    constructor(
        { from, to, db, callback, selfId }: {
            from: (new () => RecordModel),
            to: (new () => RecordModel),
            db: { name: string },
            callback: Function,
            selfId: number
    }) {
        this.fromORM = new ORM({db: db, model: from})
        this.toORM = new ORM({ db:db, model:to })
        this.callback = callback
        this.selfId = selfId;
    }

    public activate() {
        return () => {
            this.callback
            // do something
        }
    }
}
class Association{
    static hasMany<E>({ foreignKey }): Function {
        return (): AssociationBuilder<E> => {
            return new AssociationBuilder<E>()
        }
    }
    static belongsTo<E>({ foreignKey }): Function {
        return (): AssociationBuilder<E> => {
            return new AssociationBuilder<E>()
        }
    }
}


/**
 * Hope settnig image ↓
 */

class Book extends RecordModel{
    public id: number
    public name: string | null
    public user_id: number
    public user: Function
    constructor() {
        super()
        this.name = null
        this.user = Association.belongsTo<User>({foreignKey: "user_id",})
    }
    public validate(): boolean {
        return true
    }
}
class User extends RecordModel{
    public id: number
    public name: string
    public books: Function
    constructor() {
        super()
        this.name = ""
        this.books = Association.hasMany<Book>({foreignKey: "user_id"})
    }
    public validate(): boolean {
        return (
            this.name !== null
        );
    }
}

const book = new Book()
const user = new User()

/**
 * Need Nullable for before saved
 */
class BookNullable {
    public id: number | null
    public name: string | null
    public user_id: number | null
    public user: AssociationBuilder<User> | null
    constructor() {
        this.name = null
        this.user = book.user()
    }
    public validate(): boolean {
        return book.validate()
    }
}
class UserNullable {
    public id: number | null
    public name: string | null
    public books: AssociationBuilder<Book> | null

    constructor() {
        this.name = ""
        this.books = user.books()
    }
    public validate(): boolean {
        return user.validate()
    }
}

const bookNullable = new BookNullable()
const userNullable = new UserNullable()
/**
 * Need Unnullable for after saved
 */
class BookRecord {
    public id: number | null
    public name: string | null
    public user_id: number | null
    public user: Function | null
    constructor() {
        this.name = null
        this.user = bookNullable.user.activate()
    }

    // there is no methods like validate() save() new()
    // but there is mthods like findById() all() where()
}
class UserRecord {
    public id: number
    public name: string
    public books: Function | null

    constructor() {
        this.name = ""
        this.books = userNullable.books.activate()
    }

    // there is no methods like validate() save() new()
    // but there is mthods like findById() all() where()
}


// DataStore = (name?: string) => {
//   if (!name) {
//     throw new Error('Please set the className')
//   }
//   return class Data extends DataStore {
//     static ncmb = this
//     constructor(fields?: object) {
//       super(Data.ncmb, fields)
//       this.className = name
//     }
//   }
// }