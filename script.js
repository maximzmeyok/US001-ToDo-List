let tasksObj = [];

const addTaskButton = document.querySelector('#addTaskButton');
addTaskButton.addEventListener('click', makePopCreate);

class Task {
  constructor(taskName, expirationDate) {
    this.taskName = taskName;
    this.expirationDate = expirationDate;
  }
  getInnerHtml() {
    return `
    <div>
      <p>Task: <span>${this.taskName}</span></p>
      <p>Expiration date: <span>${this.expirationDate}</span></p>
    </div>
    `;
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