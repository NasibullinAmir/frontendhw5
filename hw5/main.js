"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
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
    function updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    function addTodo(text) {
        const newTodo = {
            text: text,
            completed: false
        };
        todos.push(newTodo);
        renderTodos();
    }
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }
    function toggleTodoCompletion(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
    function handleSubmit(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodo(todoText);
            todoInput.value = '';
        }
    }
    function handleClick(event) {
        const target = event.target;
        if (target.classList.contains('todo-list__item__button')) {
            deleteTodo(parseInt(target.getAttribute('data-index')));
        }
        else if (target.classList.contains('todo-list__item__text')) {
            toggleTodoCompletion(parseInt(target.parentElement.getAttribute('data-index')));
        }
    }
    todoForm.addEventListener('submit', handleSubmit);
    todoList.addEventListener('click', handleClick);
    renderTodos();
});
