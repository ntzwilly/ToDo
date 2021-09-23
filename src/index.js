/* eslint-disable import/no-cycle */
import './style.css';
import Icon from './enter.svg';
import recycle from './recycle.svg';
import { display } from './status';

export const elementGenerator = (typeName, className, content, idName) => {
  const element = document.createElement(typeName);
  if (className) {
    element.className = className;
  }
  if (content) {
    element.textContent = content;
  }
  if (idName) {
    element.id = idName;
  }
  return element;
};

// eslint-disable-next-line import/no-mutable-exports
export let todoTasks = [
  {
    description: 'Solve one coding challenge',
    completed: false,
    id: 0,
    checked: false,
  },
  {
    description: 'Grab a cup of coffee',
    completed: false,
    id: 1,
    checked: false,
  },
  {
    description: 'Go to the marked',
    completed: false,
    id: 2,
    checked: false,
  },
];

const todo = elementGenerator('div', 'container', null, null);
const todoHeader = elementGenerator('div', 'title', null, null);
const header = elementGenerator('div', 'to-do-title', null, null);
header.textContent = "Today's To Do";
todoHeader.appendChild(header);

const myRecycle = new Image();
myRecycle.src = recycle;
myRecycle.classList.add('recycle');
todoHeader.appendChild(myRecycle);

const form = elementGenerator('form', 'to-do', null, null);
const taskInput = elementGenerator('input', 'add-to-do', null, null);
taskInput.placeholder = 'Add to your list...';
form.appendChild(taskInput);

const enterIcon = new Image();
enterIcon.src = Icon;
enterIcon.classList.add('enter-icon');

form.appendChild(enterIcon);

export const todoList = elementGenerator('ul', 'to-do-list', null, null);

const divClear = elementGenerator('div', 'div-clear', null, null);
const btnClear = elementGenerator('button', 'clear', null, null);
btnClear.type = 'button';
btnClear.textContent = 'Clear All completed';
divClear.appendChild(btnClear);

todo.appendChild(todoHeader);
todo.appendChild(form);
todo.appendChild(todoList);
todo.appendChild(divClear);

const toDoContainer = document.getElementById('todo-container');
toDoContainer.appendChild(todo);

window.addEventListener('load', () => {
  const result = localStorage.getItem('ToDo');
  if (result) {
    todoTasks = JSON.parse(result);
  }
  display();
});