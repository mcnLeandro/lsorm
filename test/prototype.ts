class UserCopy {
    public id: number
    public name: string
    public books: Function
    public user: UserCopy

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
    public user: UserCopy | null
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