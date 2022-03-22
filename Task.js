import {tasksArray} from "./script.js";

export class Task {
  constructor(taskName, expirationDate) {
    this.taskName = taskName;
    this.expirationDate = expirationDate;
    this.isCompleted = false;
    this.id = `${Date.now()}`;
  }

  getInnerHtml() {
    return `
    <div id="${this.id}">
      <div>
      <p>Task: <span>${this.taskName}</span></p>
      <p>Expiration date: <span>${this.expirationDate}</span></p>
      </div>
      <div>
      <input type="checkbox" class="checkbox" id="${this.id}">
      <p class="gear" id="${this.id}">&#9881;</p>
      <p class="cross" id="${this.id}">&#9746;</p>
      </div>
    </div>
    `;
  }

  static removeTask(taskId) {
    document.getElementById(taskId).remove();
    const removedElementIndex = tasksArray.findIndex(item => item.id === taskId);
    tasksArray.splice(removedElementIndex, 1);
  }

  static completeTask(taskId) {
    document.getElementById(taskId).classList.toggle('line-through');
    const changedElementIndex = tasksArray.findIndex(item => item.id === taskId);
    tasksArray[changedElementIndex].isCompleted = !tasksArray[changedElementIndex].isCompleted;
  }
}