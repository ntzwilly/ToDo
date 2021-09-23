import './style.css';
import moreIcon from './more.svg';
import Icon from './enter.svg';
import recycle from './recycle.svg';
import elementGenerator from './status';

let todoTasks = [
  {
    description: 'Read the last chapiter of Ruby book',
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

const savedList = () => {
  localStorage.setItem('ToDo', JSON.stringify(todoTasks));
};

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

const todoList = elementGenerator('ul', 'to-do-list', null, null);

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

function display() {
  todoList.innerHTML = '';

  function listItem(elem) {
    const list = elementGenerator('li', 'task', null, null);
    const flex = elementGenerator('div', 'flex', null, null);
    const oneTodo = elementGenerator('input', 'one-todo', null, null);
    oneTodo.type = 'checkbox';
    oneTodo.checked = elem.checked;
    const form = elementGenerator('form', 'edit', null, null);
    const input = elementGenerator('input', 'label', null, null);
    input.setAttribute('name', elem.id);
    const image = elementGenerator('img', 'more', null, null);
    image.src = moreIcon;

    input.addEventListener('blur', (e) => {
      image.src = moreIcon;
      e.preventDefault();
    });
    input.value = elem.description;

    function statusUpdate(item, input, oneTodo, todoTasks) {
      if (item.checked) {
        input.classList.add('line-through');
      } else {
        input.classList.remove('line-through');
      }
      oneTodo.addEventListener('change', () => {
        const todo = todoTasks[item.id];
        todo.checked = !item.checked;
        todo.completed = !item.completed;
        display();
      });
    }

    statusUpdate(elem, input, oneTodo, todoTasks);
    form.appendChild(input);
    flex.appendChild(oneTodo);
    flex.appendChild(form);
    list.appendChild(flex);
    list.appendChild(image);
    todoList.appendChild(list);
    return list;
  }

  todoTasks.forEach((elem) => {
    const item = listItem(elem);
    todoList.appendChild(item);
  });
  savedList();
}

window.addEventListener('load', () => {
  const result = localStorage.getItem('ToDo');
  if (result) {
    todoTasks = JSON.parse(result);
  }
  display();
});