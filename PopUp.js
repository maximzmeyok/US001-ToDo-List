import {tasksArray, tasksArea} from "./script.js";
import {Task} from "./Task.js";

export class PopUp {
  constructor(obj) {
    Object.assign(this, obj);
  }


  createHtml() {
    return `
    <div class="pop-container">
      <h2>${this.popUpType} the task</h2>
      <input placeholder="Enter the task name" type="text" id="taskName" value="${this.taskName}">
      <p>Creation date:</p>
      <input type="date" id="creationDate" value="${this.creationDate}">
      <p>Expiration date:</p>
      <input type="date" id="expirationDate" value="${this.expirationDate}">
      <button class="button" id="taskButtonOk">Ok</button>
      <button class="button" id="taskButtonCancel">Cancel</button>
    </div>
    `;
  }


  static addListeners(element) {
    if (element) {
      PopUp.addListenerChangePopUp(element);
    } else {
      PopUp.addListenerCreatePopUp();
    }

    document.querySelector("#taskButtonCancel").addEventListener("click", function () {
      PopUp.removePopUp();
    });
  }


  static addListenerCreatePopUp() {
    document.querySelector("#taskButtonOk").addEventListener("click", function () {
      const taskName = document.querySelector("#taskName").value;
      const creationDate = document.querySelector("#creationDate").value;
      const expirationDate = document.querySelector("#expirationDate").value;
      const areFilledInputs = taskName && creationDate && expirationDate;
      
      if (!areFilledInputs) {
        return;
      }

      const task = new Task({taskName, creationDate, expirationDate});

      tasksArray.push(task);
      tasksArea.innerHTML += task.createHtml();
      PopUp.removePopUp();
    });
  }


  static addListenerChangePopUp(element) {
    document.querySelector("#taskButtonOk").addEventListener("click", function () {
      const taskName = document.querySelector("#taskName").value;
      const creationDate = document.querySelector("#creationDate").value;
      const expirationDate = document.querySelector("#expirationDate").value;
      const areFilledInputs = taskName && creationDate && expirationDate;

      if (!areFilledInputs) {
        return;
      }

      element.taskName = taskName;
      element.creationDate = creationDate;
      element.expirationDate = expirationDate;
      document.getElementById(`${element.id}`).firstElementChild.firstElementChild.firstElementChild.innerHTML = `${taskName}`;
      document.getElementById(`${element.id}`).firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerHTML = `${creationDate}`;
      document.getElementById(`${element.id}`).firstElementChild.lastElementChild.firstElementChild.innerHTML = `${expirationDate}`;
      PopUp.removePopUp();
    });
  }


  static createPopUp(id) {
    const sectionPopUp = PopUp.createSectionPopUp();
    const element = tasksArray.find((item) => item.id === id);
    const popUp = new PopUp({
      popUpType: id ? 'Change' : 'Create',
      taskName: id ? element.taskName : '',
      creationDate: id ? element.creationDate : '',
      expirationDate: id ? element.expirationDate : '',
    });

    sectionPopUp.innerHTML = popUp.createHtml();
    document.body.append(sectionPopUp);
    PopUp.addListeners(element);
  }


  static removePopUp() {
    document.querySelector('.pop').remove();
  }

  
  static createSectionPopUp() {
    const sectionPopUp = document.createElement("section");

    sectionPopUp.classList.add("pop");
    return sectionPopUp;
  }
}