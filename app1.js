const form = document.getElementById("todo-form")
const todoInput = document.getElementById("todo")
const todoListsCardBody = document.querySelectorAll(".card-body")[1]
const clearButton = document.getElementById("clear-todos")
const filterInput = document.getElementById("filter")
const allButton = document.getElementById("filter-all")
const readyButton = document.getElementById("filter-ready")
const inProgressButton = document.getElementById("filter-inprogress")
const doneButton = document.getElementById("filter-done")

const ui = new UI()



eventListeners()



function eventListeners() {
    form.addEventListener("submit", addTodo)
    window.addEventListener("DOMContentLoaded", loadTodos)
    todoListsCardBody.addEventListener("click", deleteTodo)
    clearButton.addEventListener("click",clearAllTodos)
    filterInput.addEventListener("keyup",filterTodos)
    allButton.addEventListener("click",showAllTodos)
    readyButton.addEventListener("click",showReadyTodos)
    inProgressButton.addEventListener("click",showinProgressTodos)
    doneButton.addEventListener("click",showDoneTodos)
  
}


function addTodo(e) {
    const newTodo = todoInput.value.trim()

    ui.addTodoToUI(newTodo)


    ui.clearInput()
    e.preventDefault()
}

function loadTodos() {
    ui.loadTodosToUI()
}

function deleteTodo(e) {
    
    ui.deleteTodoFromUI(e)
    Storage.deleteTodoFromStorage(e)
}

function clearAllTodos(){
    ui.clearTodosFromUI()
    Storage.clearTodosFromStorage()
    
}

function filterTodos(e){
    ui.todosFilter(e)
}

function showAllTodos(){
    let all = "3"
    ui.changeTodos(all)
}

function showReadyTodos(){
    let ready = "0"
    ui.changeTodos(ready)
}

function showinProgressTodos(){
    let inProgress = "1"
    ui.changeTodos(inProgress)
}

function showDoneTodos(){
    let done = "2"
    ui.changeTodos(done)
}