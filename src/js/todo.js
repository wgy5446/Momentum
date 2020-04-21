// state

let todos = [];
let todoState = 'all';

const $todolistBody = document.querySelector('.todolist-body');
const $todolistMenu = document.querySelector('.todolist-menu');

const render = () => {
  const _todos = todos.filter(({completed}) => (todoState === 'all' ? true : todoState === 'active' ? !completed : completed));
  let html = '';
  _todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}">
    <label for="added-${id}">
      <i class="icon-check-empty"></i>
      <input type="checkbox" id="added-${id}" ${completed ? 'checked' : ''}>
      <span class="added-todo-text">${content}</span>
      <i class="icon-cancel"></i>
    </label>
  </li>`
  });
  $todolistBody.innerHTML = html;
};

const getTodo = () => {
  fetch('/todos', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(_todo => {todos = _todo; })
    .catch(new Error('Error'))
    .then(render);
};

const addTodo = content => {
  fetch('/todos', {
    method: 'POST',
    headers: {'content-type' : 'application/json'},
    body: JSON.stringify({id: generateId(), content, completed: false})
  })
    .then(res => res.json())
    .then(_todo => { todos = _todo; })
    .catch(new Error('Error'))
    .then(render);
};

const toggleCompleted = () => {
  const completed = todos.map(todo => (todo.id === +id ? {...todo, completed: false} : todo))
  fetch('/todos/completed', {
    method:'PATCH',
    Headers: {'content-type' : 'application.json'},
    body: JSON.stringify({completed})
  })
    .then(res => res.json())
    .then(_todo => todos = _todo)
    .then(render)
}

const removeTodo = () => {
 const id = e.target.id
  fetch(`/todos/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(_todo => todos = _todo )
    .then(render)
};

// const generateId = () => {
//   return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
// }

const changeList = (id) => {
  [...$todolistMenu.children].forEach($todoList => {
    $todoList.classList.toggle('active', $todoList.id === id)
  })
 todoState = id;
};


export { render, getTodo, addTodo, removeTodo, toggleCompleted, changeList };
