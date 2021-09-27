import './style.css';
import moreIcon from './more.svg';
import Icon from './enter.svg';
import recycle from './recycle.svg';
import deleteIcon from './delete.svg';
import elementGenerator from './status';
// eslint-disable-next-line import/no-cycle
import {
  createTask, deleteTask, clearTasks, editTask,
} from './crud';

const todo = elementGenerator('div', 'container');
const todoHeader = elementGenerator('div', 'title');
const header = elementGenerator('div', 'to-do-title');
header.textContent = "Today's To Do";
todoHeader.appendChild(header);

const myRecycle = new Image();
myRecycle.src = recycle;
myRecycle.classList.add('recycle');
todoHeader.appendChild(myRecycle);

const form = elementGenerator('form', 'to-do');
export const taskInput = elementGenerator('input', 'add-to-do');
taskInput.placeholder = 'Add to your list...';
form.appendChild(taskInput);

const enterIcon = new Image();
enterIcon.src = Icon;
enterIcon.classList.add('enter-icon');

form.appendChild(enterIcon);

const todoList = elementGenerator('ul', 'to-do-list');

const divClear = elementGenerator('div', 'div-clear');
export const btnClear = elementGenerator('button', 'clear');
btnClear.type = 'button';
btnClear.textContent = 'Clear All completed';
divClear.appendChild(btnClear);

todo.append(todoHeader, form, todoList, divClear);

const toDoContainer = document.getElementById('todo-container');
toDoContainer.appendChild(todo);

// eslint-disable-next-line import/no-mutable-exports
export let todoTasks = [];

export default function savedList() {
  localStorage.setItem('ToDo', JSON.stringify(todoTasks));
}

function display() {
  todoList.innerHTML = '';

  function listItem(elem) {
    const list = elementGenerator('li', 'task');
    const flex = elementGenerator('div', 'flex');
    const oneTodo = elementGenerator('input', 'one-todo');
    oneTodo.type = 'checkbox';
    oneTodo.checked = elem.checked;
    const form = elementGenerator('form', 'edit');
    const image = elementGenerator('img', 'more');
    image.src = moreIcon;
    const input = elementGenerator('input', 'label');
    input.setAttribute('name', elem.id);
    input.addEventListener('click', () => {
      image.src = deleteIcon;
      image.addEventListener('click', () => {
        deleteTask(elem.id);
        window.location.reload();
      });
    });

    editTask(input, elem, form);

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
    flex.append(oneTodo, form);
    list.append(flex, image);
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
  createTask();
  clearTasks();
  editTask();
});