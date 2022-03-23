import {tasksArray} from "./script.js";
import {Task} from "./Task.js";

export class Pop {
  constructor(popType, taskName, expirationDate) {
    this.popType = popType;
    this.taskName = taskName;
    this.expirationDate = expirationDate;
  }

  createHtml() {
    return `
    <div class="pop-container">
    <h2>${this.popType} the task</h2>
    <input placeholder="Enter a task name" type="text" id="taskName" required value="${this.taskName}">
    <p>Expiration date:</p>
    <input type="date" id="expirationDate" required value="${this.expirationDate}">
    <button class="button" id="addTaskButtonOk">Ok</button>
    <button class="button" id="addTaskButtonCancel">Cancel</button>
    </div>
    `;
  }

  static addListeners(elem) {
    document.querySelector("#addTaskButtonCancel").addEventListener("click", function () {
      Pop.removePop();
    });
    if (elem) {
      document.querySelector("#addTaskButtonOk").addEventListener("click", function () {
        let taskName = document.querySelector("#taskName").value;
        let expirationDate = document.querySelector("#expirationDate").value;
        if (taskName && expirationDate) {
          elem.taskName = taskName;
          elem.expirationDate = expirationDate;
          document.getElementById(`${elem.id}`).firstElementChild.firstElementChild.firstElementChild.innerHTML = `${taskName}`;
          document.getElementById(`${elem.id}`).firstElementChild.lastElementChild.firstElementChild.innerHTML = `${expirationDate}`;
          Pop.removePop();
        }
      });
    } else {
      document.querySelector("#addTaskButtonOk").addEventListener("click", function () {
        let taskName = document.querySelector("#taskName").value;
        let expirationDate = document.querySelector("#expirationDate").value;
        if (taskName && expirationDate) {
          let task = new Task(taskName, expirationDate);
          tasksArray.push(task);
          document.querySelector("#tasks").innerHTML += task.createHtml();
          Pop.removePop();
        }
      });
    }
  }

  static createPop(id) {
    let sectionPop = Pop.createSectionPop();
    let elem = tasksArray.find((item) => item.id === id);
    let pop = id ? new Pop('Change', elem.taskName, elem.expirationDate) : new Pop('Create', '', '');
    sectionPop.innerHTML = pop.createHtml();
    document.body.append(sectionPop);
    Pop.addListeners(elem);
  }

  static removePop() {
    document.querySelector('.pop').remove();
  }

  static createSectionPop() {
    let popChange = document.createElement("section");
    popChange.classList.add("pop");
    return popChange;
  }
}