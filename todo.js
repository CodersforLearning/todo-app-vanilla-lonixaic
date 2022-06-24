window.addEventListener('load',() => {
    //set global variable todos, and get the todos from the local storage
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const name = document.querySelector('#name');
    const addTodoForm = document.querySelector('#addTodoForm');

    const username = localStorage.getItem('username') || '';

    //Set the value of the name to username
    name.value = username;
    //When the user type other name, save it to the local storage
    name.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    //Set the value of the name to username
    addTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = {
            todoContent: e.target.elements.todoContent.value,
            cat: e.target.elements.category.value,
            done:false
        }
        //Add todo item to todos array
        todos.push(todo);

        //Convert todos as JS object to string and add it to local storage
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        ShowTodos();
    })
    ShowTodos();
})

function ShowTodos(){
    const todoList1 = document.querySelector('#todoList-1')
    const todoList2 = document.querySelector('#todoList-2')
    const todoList3 = document.querySelector('#todoList-3')
    todoList1.innerHTML = "";
    todoList2.innerHTML = "";
    todoList3.innerHTML = "";

    //Loop through every todo in todos
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todoItem')

        const input = document.createElement('input');
        const label = document.createElement('label');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const editButton = document.createElement('button');
        const delButton = document.createElement('button');

        //Mark the task as done when the checkbox is clicked
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        //Bubble color
        if(todo.cat == 'Important'){
            span.classList.add('important');
        } else if(todo.cat == 'Fun'){
            span.classList.add('fun');
        }

        content.classList.add('todoContent');
        editButton.classList.add('edit');
        delButton.classList.add('delete');

        //Set thet todo Content to read only one it is on the list
        content.innerHTML = `<input type="text" value="${todo.todoContent}" readonly>`;
		editButton.innerHTML = 'Edit';
		delButton.innerHTML = 'Delete';

        label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(editButton);
		actions.appendChild(delButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

        //Add the todoItem based on the category
        if(todo.cat == 'Urgent'){
            todoList1.appendChild(todoItem);
        }else if(todo.cat == 'Important'){
            todoList2.appendChild(todoItem);
        }else{
            todoList3.appendChild(todoItem);
        }

        //Strike through the task when the todoItem is marked as done
        if (todo.done){
            todoItem.classList.add('done');
        }

        input.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
        })

        input.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add('done');
            } else{
                todoItem.classList.remove('done');
            }
            ShowTodos();
        })

        editButton.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            //set the event to focus
            input.focus();
            //when the user has done editing, set the attribute to read only
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                ShowTodos()
            })
        })

        delButton.addEventListener('click', (e) => {
            //delete todo item that is equal to the todo selected
            todos = todos.filter(t => t!= todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            ShowTodos()
        })

    })
}