import {Task} from "./Task.js";

export const tasksArray = [];

const tasksArea = document.querySelector('#tasks');
const addTaskButton = document.querySelector('#addTaskButton');

addTaskButton.addEventListener('click', makePopCreate);
tasksArea.addEventListener('click', function(event) {
  let target = event.target;

  if (target.classList.contains('cross')) {
    Task.removeTask(target.id);
  } else if (target.classList.contains('checkbox')) {
    Task.completeTask(target.id);
  } else if (target.classList.contains('gear')) {
    makePopChange(target.id);
  }
})

function makePopCreate() {
  let popCreated = document.createElement("section");
  popCreated.classList.add("pop");
  popCreated.innerHTML = `
  <div class="pop-container">
    <h2>Create a new task</h2>
    <input placeholder="Enter a task name" type="text" id="taskName" required value="111111111">
    <p>Expiration date:</p>
    <input type="date" id="expirationDate" required value="2022-03-22">
    <button class="button" id="addTaskButtonOk">Ok</button>
    <button class="button" id="addTaskButtonCancel">Cancel</button>
  </div>
  `;
  document.body.append(popCreated);
  document.querySelector('#addTaskButtonOk').addEventListener('click', function() {
    let taskName = document.querySelector('#taskName').value;
    let expirationDate = document.querySelector('#expirationDate').value;
    if (taskName && expirationDate) {
      let task = new Task(taskName, expirationDate);
      tasksArray.push(task);
      document.querySelector('#tasks').innerHTML += task.getInnerHtml();
      popCreated.remove();
    }
  });
  document.querySelector('#addTaskButtonCancel').addEventListener('click', function() {
    popCreated.remove();
  });
}

function makePopChange(id) {
  let popChange = document.createElement("section");
  popChange.classList.add("pop");
  let elem = tasksArray.find(item => item.id === id);
  popChange.innerHTML = ` 
  <div class="pop-container">
    <h2>Change a task</h2>
    <input placeholder="Enter a task name" type="text" id="taskName" value="${elem.taskName}" required>
    <p>Expiration date:</p>
    <input type="date" id="expirationDate" value="${elem.expirationDate}" required>
    <button class="button" id="addTaskButtonSave">Save</button>
    <button class="button" id="addTaskButtonCancel">Cancel</button>
  </div>
  `;
  document.body.append(popChange);
  document.querySelector('#addTaskButtonSave').addEventListener('click', function() {
    let taskName = document.querySelector('#taskName').value;
    let expirationDate = document.querySelector('#expirationDate').value;
    if (taskName && expirationDate) {
      elem.taskName = taskName;
      elem.expirationDate = expirationDate;
      document.getElementById(`${id}`).firstElementChild.firstElementChild.firstElementChild.innerHTML = `${taskName}`;
      document.getElementById(`${id}`).firstElementChild.lastElementChild.firstElementChild.innerHTML = `${expirationDate}`;
      popChange.remove();
    }
  });
  document.querySelector('#addTaskButtonCancel').addEventListener('click', function() {
    popChange.remove();
  });
}