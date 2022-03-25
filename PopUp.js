import {tasksArray, tasksArea} from "./script.js";
import {Task} from "./Task.js";
import {showWrongInput, isValidTaskName, showDefaultInput} from "./functions.js"

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
    const taskNameInput = document.querySelector("#taskName");
    const creationDateInput = document.querySelector("#creationDate");
    const expirationDateInput = document.querySelector("#expirationDate");

    taskNameInput.addEventListener('keydown', function() {
      showDefaultInput(taskNameInput);
      showDefaultInput(creationDateInput);
      showDefaultInput(expirationDateInput);
    });

    creationDateInput.addEventListener('click', function() {
      showDefaultInput(taskNameInput);
      showDefaultInput(creationDateInput);
      showDefaultInput(expirationDateInput);
    });

    expirationDateInput.addEventListener('click', function() {
      showDefaultInput(taskNameInput);
      showDefaultInput(creationDateInput);
      showDefaultInput(expirationDateInput);
    });

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
      const taskNameInput = document.querySelector("#taskName");
      const creationDateInput = document.querySelector("#creationDate");
      const expirationDateInput = document.querySelector("#expirationDate");
      const taskName = taskNameInput.value;
      const creationDate = creationDateInput.value;
      const expirationDate = expirationDateInput.value;
      const isValidDate = Date.parse(expirationDate) >= Date.parse(creationDate);
      const areFilledInputs = isValidTaskName(taskName) && isValidDate;

      if (!areFilledInputs) {
        showWrongInput(taskNameInput);
        showWrongInput(creationDateInput);
        showWrongInput(expirationDateInput);

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
      const taskNameInput = document.querySelector("#taskName");
      const creationDateInput = document.querySelector("#creationDate");
      const expirationDateInput = document.querySelector("#expirationDate");
      const taskName = taskNameInput.value;
      const creationDate = creationDateInput.value;
      const expirationDate = expirationDateInput.value;
      const isValidDate = Date.parse(expirationDate) >= Date.parse(creationDate);
      const areFilledInputs = isValidTaskName(taskName) && isValidDate;

      if (!areFilledInputs) {
        showWrongInput(taskNameInput);
        showWrongInput(creationDateInput);
        showWrongInput(expirationDateInput);

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