document.addEventListener('DOMContentLoaded', () => {
    const todoForm: HTMLFormElement = document.getElementById('todo-form') as HTMLFormElement;
    const todoInput: HTMLInputElement = document.getElementById('todo-input') as HTMLInputElement;
    const todoList: HTMLUListElement = document.getElementById('todo-list') as HTMLUListElement;

    let todos: { text: string; completed: boolean }[] = JSON.parse(localStorage.getItem('todos')!) || [];

    function renderTodos(): void {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem: HTMLLIElement = document.createElement('li');
            todoItem.classList.add('todo-list__item');
            todoItem.innerHTML = `
                <span class="todo-list__item__text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="todo-list__item__button" data-index="${index}">Delete</button>
                <button class="todo-list__item__button" data-index="${index}">${todo.completed ? 'Undo' : 'Complete'}</button>
            `;
            todoList.appendChild(todoItem);
        });

        updateLocalStorage();
    }

    function updateLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo(text: string): void {
        const newTodo = {
            text: text,
            completed: false
        };
        todos.push(newTodo);
        renderTodos();
    }

    function deleteTodo(index: number): void {
        todos.splice(index, 1);
        renderTodos();
    }

    function toggleTodoCompletion(index: number): void {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    function handleSubmit(event: Event): void {
        event.preventDefault();
        const todoText: string = todoInput.value.trim();
        if (todoText !== '') {
            addTodo(todoText);
            todoInput.value = '';
        }
    }

    function handleClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (target.classList.contains('todo-list__item__button')) {
            deleteTodo(parseInt(target.getAttribute('data-index')!));
        } else if (target.classList.contains('todo-list__item__text')) {
            toggleTodoCompletion(parseInt(target.parentElement!.getAttribute('data-index')!));
        }
    }

    todoForm.addEventListener('submit', handleSubmit);
    todoList.addEventListener('click', handleClick);

    renderTodos();
});
