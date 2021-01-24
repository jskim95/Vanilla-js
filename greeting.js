const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');

const LS_USERNAME = 'currentName';
const SHOWING_CN = 'showing';

function saveName(text) {
    localStorage.setItem(LS_USERNAME, text)
}
function handleSubmit(event) {
    event.preventDefault();
    
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}
function loadName() {
    const currentUser = localStorage.getItem(LS_USERNAME);
    if(currentUser === null) {
        form.classList.add(SHOWING_CN);
        form.addEventListener('submit', handleSubmit)
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init()