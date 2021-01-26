const todoForm = document.querySelector('.js-todoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-todoList');

const CURRENTTODO_LS = 'TODO'

let todos = []; 

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li)
    const cleanTodos = todos.filter(function(todo) {
        console.log(todo)
        return todo.id !== parseInt(li.id);
    })
    todos = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(CURRENTTODO_LS, JSON.stringify(todos));
}
function paintTodo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = todos.length + 1;
    
    delBtn.innerText = '삭제';
    delBtn.addEventListener('click', deleteTodo);
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
    li.id = newId;

    const todoObj = {
        text : text,
        id : newId
    };
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentTodo = todoInput.value;
    paintTodo(currentTodo);
    todoInput.value = "";
}
function loadTodo() {
    const loadTodos = localStorage.getItem(CURRENTTODO_LS);
    if(loadTodos !== null) {
        const parsedTodos = JSON.parse(loadTodos);
        parsedTodos.forEach(function(todos){
            paintTodo(todos.text)
        })
    }
}
function init() {
    loadTodo()
    todoForm.addEventListener('submit', handleSubmit)
}

init();