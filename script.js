let tasksObj = [];

const tasksArea = document.querySelector('#tasks');
const addTaskButton = document.querySelector('#addTaskButton');

addTaskButton.addEventListener('click', makePopCreate);
tasksArea.addEventListener('click', function(event) {
  let target = event.target;

  if (target.classList.contains('cross')) {
    Task.removeTask(tasksObj.find(item => item.paragraphId === target.id).id);
    //Task.removeTask(target.id);
    //target.parentElement.parentElement.remove();
  } else if (target.type == 'checkbox') {

  } else if (target.classList.contains('gear')) {
    makePopChange();
  }
})

class Task {
  constructor(taskName, expirationDate) {
    this.taskName = taskName;
    this.expirationDate = expirationDate;
    this.isCompleted = false;
    this.id = `${Date.now()}`;
    this.textId = `textId${this.id}`;
    this.dateId = `dateId${this.id}`;
    this.gearId = `gearId${this.id}`
    this.checkBoxId = `checkbox${this.id}`;
    this.divId = `divId${this.id}`;
    this.paragraphId = `paragraphId${this.id}`;
  }
  getInnerHtml() {
    return `
    <div id="${this.id}">
      <div>
      <p>Task: <span>${this.taskName}</span></p>
      <p>Expiration date: <span>${this.expirationDate}</span></p>
      </div>
      <div>
      <p>&#9744;</p>
      <p class="gear">&#9881;</p>
      <p class="cross" id="${this.id}">&#9746;</p>
      </div>
    </div>
    `;
  }
  static removeTask(removedTask) {
    //document.getElementById(removedTask).parentNode.removeChild(document.getElementById(removedTask));
    document.getElementById(removedTask).remove();
    const removeElemIndex = tasksObj.findIndex(item => item.id === removedTask);
    tasksObj.splice(removeElemIndex, 1);
  }
}

function makePopCreate() {
  let popCreated = document.createElement("section");
  popCreated.classList.add("pop");
  popCreated.innerHTML = `
  <div class="pop-container">
    <h2>Create a new task</h2>
    <input placeholder="Enter a task name" type="text" id="taskName" value="Make a task" required>
    <p>Expiration date:</p>
    <input type="date" id="expirationDate" value="2022-03-21" required>
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
      tasksObj.push(task);
      document.querySelector('#tasks').innerHTML += task.getInnerHtml();
      popCreated.remove();
    }
  });
  document.querySelector('#addTaskButtonCancel').addEventListener('click', function() {
    popCreated.remove();
  });
}

function makePopChange() {
  let popChange = document.createElement("section");
  popChange.classList.add("pop");
  popChange.innerHTML = `
  <div class="pop-container">
    <h2>Change a task</h2>
    <input placeholder="Enter a task name" type="text" id="taskName" value="Make a task" required>
    <p>Expiration date:</p>
    <input type="date" id="expirationDate" value="2022-03-21" required>
    <button class="button" id="addTaskButtonOk">Ok</button>
    <button class="button" id="addTaskButtonCancel">Cancel</button>
  </div>
  `;
  document.body.append(popChange);
  document.querySelector('#addTaskButtonOk').addEventListener('click', function() {
    let taskName = document.querySelector('#taskName').value;
    let expirationDate = document.querySelector('#expirationDate').value;
    if (taskName && expirationDate) {
      let task = new Task(taskName, expirationDate);
      tasksObj.push(task);
      tasksArea.innerHTML += task.getInnerHtml();
      popChange.remove();
    }
  });
  document.querySelector('#addTaskButtonCancel').addEventListener('click', function() {
    popChange.remove();
  });
}