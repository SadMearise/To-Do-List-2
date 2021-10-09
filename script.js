const todo = document.querySelector('.todo')
const input = document.querySelector('.message')
const button = document.querySelector('.add')

todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

button.addEventListener('click', element => {
    if (input.value === '') return

    newToDo = {
        todo: input.value,
        important: false,
        checked: false
    }
    todoList.push(newToDo)

    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))
    input.value = ''
})


function displayMessages() {
    let displayMessage = '';

    if (todoList.length === 0) todo.innerHTML = ''

    todoList.forEach(function(item, index) {
        displayMessage += `
        <li>
            <input type="checkbox" id="item_${index}" ${item.checked ? 'checked' : ''}>
            <label for="item_${index}" class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `
        todo.innerHTML = displayMessage
    })
}

todo.addEventListener('change', function(event) {
    valueLabel = todo.querySelector(`[for='${event.target.id}']`).innerHTML
    
    todoList.forEach(function(item) {
        if (valueLabel === item.todo) {
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();

    todoList.forEach(function(item, index) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(index, 1)
                
            } else {
                item.important = !item.important
            }

            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})
