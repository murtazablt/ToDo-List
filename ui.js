class UI {
    constructor() {
        this.todosLists = document.getElementById("todos-lists")
        this.firstCardBody = document.querySelectorAll(".card-body")[0]
        this.todoInput = document.getElementById("todo")
        this.filterInput = document.getElementById("filter")
        this.listItems = document.getElementsByClassName("list-group-text-item")
        this.todoStatus = document.getElementsByClassName("status")
    }

    addTodoToUI(newTodo) {
        

        if (newTodo === "") {
            this.showError("Lütfen bir isim giriniz!", "danger")
        }
        else if (Storage.checkTodos(newTodo)) {
            this.showError("Todo zaten kayıtlı!", "warning")
        }
        else {
            let itemID = Date.now()

            const li = document.createElement("li")
            li.className = "list-group-item d-flex"
            li.innerHTML = `
                    <span class="list-group-text-item">${newTodo}</span> 
                                    
                                    <span class="ml-auto p-1">
                                        <select  class="status custom-select custom-select-sm" id=${itemID} onChange="Storage.changeStatusInStorage(${itemID})">
                                        <option  value="1" selected>Ready</option>
                                        <option  value="2">InProgress</option>
                                        <option  value="3">Done</option>
                                    </select>
                                    </span>
                                    
                                    <a href = "#" class ="delete-item p-2">
                                        <i class = "fa fa-remove"></i>
                                    </a>
                    `
            this.todosLists.appendChild(li)

            Storage.addTodoToStorage(newTodo, itemID)
        }

    }

    clearInput() {
        this.todoInput.value = ""
    }

    showError(message, type) {
        const div = document.createElement("div")
        div.className = `alert alert-${type}`
        div.textContent = message
        this.firstCardBody.appendChild(div)

        setTimeout(() => {
            div.remove()
        }, 2000);

    }

    loadTodosToUI() {
        let todos = Storage.getTodosFromStorage()        
        this.todosLists.innerHTML = ""

        todos.forEach(todo => {
            this.todosLists.innerHTML += `
            <li class="list-group-item d-flex ">
                    
                         <span class="list-group-text-item">${todo.name}</span> 
                         
                         <span class="ml-auto p-1">
                             <select  class="status custom-select custom-select-sm" id=${todo.id} onChange="Storage.changeStatusInStorage(${todo.id})">
                            <option  value="0" selected>Ready</option>
                            <option  value="1">InProgress</option>
                            <option  value="2">Done</option>
                          </select>
                        </span>
                        
                        <a href = "#" class ="delete-item p-2">
                            <i class = "fa fa-remove"></i>
                        </a>
                        </li>
            `
        });

        this.selectElements = document.getElementsByClassName("status")
        todos.forEach((todo, index) => {
            const selectItem = this.selectElements[index];
            selectItem.selectedIndex = todo.status
            console.log(todo.status,selectItem.selectedIndex);
          });
    }

    deleteTodoFromUI(e) {
        let todoElement = e.target.parentElement.parentElement
        let deleteIconClass = e.target.className

        if (deleteIconClass === "fa fa-remove") {
            todoElement.remove()
        }
    }

    clearTodosFromUI() {
        let todosLists = this.todosLists
        while (todosLists.firstElementChild !== null) {
            todosLists.removeChild(todosLists.firstElementChild)
        }
    }

    todosFilter(e) {
        let filterInput = e.target.value.toLowerCase()
        let todoListItems = this.listItems

        let listItemArray = Array.from(todoListItems)


        listItemArray.forEach(item => {
            let itemText = item.textContent.toLowerCase()
            if (itemText.indexOf(filterInput) === -1) {
                item.parentElement.setAttribute("style", "display : none !important")
            }
            else {
                item.parentElement.setAttribute("style", "display : flex")
            }
        });

    }

    changeTodos(request) {
        let status = this.todoStatus
        let statusArray = Array.from(status)
        

        statusArray.forEach(todo => {
            if (todo.value === request || request === "3") {
                
                todo.parentElement.parentElement.setAttribute("style", "display : flex")
            }
            else {
                todo.parentElement.parentElement.setAttribute("style", "display : none !important")
            }
        });

    }
}