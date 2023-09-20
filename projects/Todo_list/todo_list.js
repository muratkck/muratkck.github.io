const todoList = [];

renderTodoList();

document.querySelector('.js_add_button').addEventListener('click', () => {
  addTodo();
});


function renderTodoList(){
  let todoListHTML = '';
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;

    // Generating the html technique.
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class="delete_button js_delete_button">Delete</button>
    `;
    todoListHTML += html;
  });
  document.querySelector('.js_todo_list').innerHTML = todoListHTML;

  // querySelectorALl returns the list of all elements that has the given class name.
  document.querySelectorAll('.js_delete_button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    }); 
}


function addTodo(){
  const inputElement = document.querySelector('.js_name_input');
  const dateInputElement = document.querySelector('.js_due_date_input');

  const name = inputElement.value;
  const dueDate = dateInputElement.value;

  todoList.push({
    name: name,
    dueDate: dueDate,
  });

  inputElement.value = '';

  renderTodoList();
}
