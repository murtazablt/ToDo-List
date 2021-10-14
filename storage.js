class Storage {

    static getTodosFromStorage() {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = []
        }
        else {
            todos = JSON.parse(localStorage.getItem("todos"))
        }
        return todos
    }

    static addTodoToStorage(newTodo,itemID) {
        let itemStatus = document.getElementById(itemID)
        
        let anewTodo = {
            "name": newTodo,
            "status": itemStatus.selectedIndex,
            "id": itemID
        }
        let todos = this.getTodosFromStorage()

        todos.push(anewTodo)
        localStorage.setItem("todos", JSON.stringify(todos))

    }

    static deleteTodoFromStorage(e) {
        let todos = this.getTodosFromStorage()
        let deleteIconClass = e.target.className
        
        

        if(deleteIconClass === "fa fa-remove"){
            let todoListText = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
            todos.forEach((todo,index) => {
                if (todo.name === todoListText) {
                    todos.splice(index,1)
                }
               
            });
        }

        localStorage.setItem("todos",JSON.stringify(todos))
    }

    static checkTodos(newTodo){
        let todos = Storage.getTodosFromStorage()
        let result;
        todos.forEach(todo => {
            if (newTodo === todo.name) {
                result = true
                return result
            }
            else{
                result = false
                return result
            }
        })
        return result
    }

    static clearTodosFromStorage(){
        localStorage.removeItem("todos")
    }


    static changeStatusInStorage(itemID){
        
        
        let todos = this.getTodosFromStorage()
        let item = document.getElementById(itemID)

        todos.forEach(todo => {
            if (todo.id === Number(itemID)) {
                todo.status = item.selectedIndex
                
            }
        });
        
        localStorage.setItem("todos",JSON.stringify(todos))
    }
}