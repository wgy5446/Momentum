let todos = [];

const $todolist = document.querySelector('.todo-list');

const render = () => {
  let html = '';
  todos.forEach(({id, content, completed}) => {
    html += `<li id="${id}" class="todo-item">
    <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
    <label for="ck-${id}" class="todo-content">${content}</label>
    <div class="btn-todo">
      <i class="icon-cancel"></i><i class="icon-cancel-circled"></i>
    </div>
  </li>`
  });
  $todolist.innerHTML = html;
};

const getTodo = () => {
  fetch('/todos', {
    method: 'GET'
  })
  .then(res => res.json())
  .then(_todo => todos = _todo)
  .catch(new Error('Error'))
  .then(render)
};

window.onload = getTodo;