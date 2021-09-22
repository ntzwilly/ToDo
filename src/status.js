import { todoTasks, todoList } from './index';

export default function statusUpdate() {
  const check = document.querySelectorAll('.one-todo');
  const input = document.querySelectorAll('.label');

  check.forEach((item, i) => {
    item.addEventListener('change', () => {
      if(item.checked) {
        input[i].classList.add('line-through');
      }else {
        input[i].classList.remove('line-through');
      }
    });
  });



  // if (checkBox.checked) {
  //   input.classList.add('line-through');
  // } else {
  //   input.classList.remove('line-through');
  // }

  // checkBox.addEventListener('change', () => {
  //   const todo = todoTasks[checkBox.id];
  //   todo.checked = !checkBox.checked;
  //   todo.completed = !checkBox.completed;
  // });
}