let todolist = []
const add_name = document.querySelector(".add-name")
const now = new Date
const todoL = document.querySelector(".todo-list")
const gettime = () => {
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    return (year * 10000) + (month * 100) + day
}
function show(){
    let html = todolist.map(i => `
        <div class="todo">
            <span>
                <input type="checkbox" class="did" id="${i.name}">
                <div class="todo-name">${i.name}</div>
            </span>
            <div class="del">del</div>
        </div>`).join('')
    todoL.innerHTML = html
}
function add(){
    todolist.push({
        name: add_name.value,
        isDid: false,
        lastTime: gettime()
    })
    show()
}
