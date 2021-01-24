const todoForm = document.querySelector('.js-todoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-todoList');

const CURRENTTODO_LS = 'TODO'

const todos = []; 

function deleteTodo(event) {
    console.log(event.target)
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