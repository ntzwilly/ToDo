/* eslint-disable import/no-mutable-exports */
import moreIcon from './more.svg';
// eslint-disable-next-line import/no-cycle
import { todoList, todoTasks, elementGenerator } from './index.js';

function savedList() {
  localStorage.setItem('ToDo', JSON.stringify(todoTasks));
}

function listItem(elem) {
  const list = elementGenerator('li', 'task draggable', null, null);
  const flex = elementGenerator('div', 'flex', null, null);
  const oneTodo = elementGenerator('input', 'one-todo', null, null);
  oneTodo.type = 'checkbox';
  oneTodo.checked = elem.checked;

  const form = elementGenerator('form', 'edit', null, null);
  const input = elementGenerator('input', 'label', null, null);

  input.setAttribute('name', elem.id);

  input.addEventListener('blur', (e) => {
    image.src = moreIcon;
    e.preventDefault();
  });

  input.value = elem.description;
  const image = elementGenerator('img', 'more', null, null);
  image.src = moreIcon;

  statusUpdate(elem, input, oneTodo, todoTasks);

  form.appendChild(input);
  flex.appendChild(oneTodo);
  flex.appendChild(form);
  list.appendChild(flex);
  list.appendChild(image);

  todoList.appendChild(list);

  return list;
}

/* eslint-disable import/prefer-default-export */
export function display() {
  todoList.innerHTML = '';
  todoTasks.forEach((elem) => {
    const item = listItem(elem);
    todoList.appendChild(item);
  });
  savedList();
}

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
