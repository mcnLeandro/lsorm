import LsormClient, { RecordModel } from "../src/index"

class User extends RecordModel{

    public name: string | null

    constructor() {
        super()
        this.name = null
    }
    public validate(): boolean {
        return (
            this.name !== null
        );
    }

}

const lsorm = new LsormClient({
    db:{ name:"test" },
    models: [
        User
    ]
})

document.querySelector('.user-create-button')?.addEventListener('click', () => {
    const input: HTMLInputElement | null = document.querySelector('.user-name-input')
    const user = lsorm.models.User.create({ name: input?.value })
    console.log(user)
})
document.querySelector('.user-find-button')?.addEventListener('click', () => {
    const input: HTMLInputElement | null = document.querySelector('.user-find-input')
    if (!input) return;

    const user = lsorm.models.User.findById(parseInt(input?.value))
    console.log(user)
})
document.querySelector('.drop-button')?.addEventListener('click', () => {
    lsorm.drop()
})
document.querySelector('.show-table-button')?.addEventListener('click', () => {
    lsorm.models.User.showTable()
    
})


// console.log(lsorm.models.User.update({
//     where: { id: 1 },
//     data: { name: "hey" }
// }))