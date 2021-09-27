// eslint-disable-next-line import/no-cycle
import savedList, { todoTasks, taskInput, btnClear } from './index';

export const createTask = () => {
  const form = document.querySelector('.to-do');

  form.addEventListener('submit', () => {
    const newToDo = taskInput.value;
    if (newToDo) {
      todoTasks.push({
        description: newToDo,
        completed: false,
        index: todoTasks.length + 1,
        checked: false,
      });
      savedList();
    }
  });
}

export const editTask = (input, elem, form) => {
  let newValue = '';
  input.setAttribute('name', elem.id);
  input.addEventListener('input', (e) => {
    newValue = e.target.value;
    e.preventDefault();
  });

  form.addEventListener('submit', (e) => {
    const p = e.target[0].name;

    todoTasks[p].description = newValue;
    savedList();
  });
}

export const deleteTask = (elt) => {
  todoTasks.splice(elt, 1);
  for (let i = 0; i < todoTasks.length; i++) {
    todoTasks[i].id = i;
    todoTasks[i].index = i + 1;
  }
  localStorage.clear();
  localStorage.setItem('ToDo', JSON.stringify(todoTasks));
}

export const clearTasks = () => {
  btnClear.addEventListener('click', () => {
    const pendingTasks = todoTasks.filter((item) => item.checked !== true);
    for (let i = 0; i < pendingTasks.length; i += 1) {
      pendingTasks[i].id = i;
      pendingTasks[i].index = i + 1;
    }
    localStorage.setItem('ToDo', JSON.stringify(pendingTasks));
    window.location.reload();
  });
}