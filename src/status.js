export default function elementGenerator(typeName, className) {
  const element = document.createElement(typeName);
  if (className) {
    element.className = className;
  }
  return element;
}

export function statusUpdate(item, input, oneTodo, todoTasks) {
  if (item.checked) {
    input.classList.add('line-through');
  } else {
    input.classList.remove('line-through');
  }

  oneTodo.addEventListener('change', () => {
    const todo = todoTasks[item.id];
    todo.checked = !item.checked;
    todo.completed = !item.completed;
  });
}
