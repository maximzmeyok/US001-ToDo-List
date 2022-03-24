import {tasksArray, tasksArea} from "./script.js";

export class Task {
  constructor(obj) {
    this.id = `${Date.now()}`;
    this.isCompleted = false;
    
    Object.assign(this, obj);
  }


  createHtml() {
    return `
    <div id="${this.id}">
      <div>
        <p>Task: <span>${this.taskName}</span></p>
        <p>Creation date: <span>${this.creationDate}</span></p>
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
    const removedTaskIndex = tasksArray.findIndex(item => item.id === taskId);

    tasksArray.splice(removedTaskIndex, 1);
    document.getElementById(taskId).remove();
  }


  static completeTask(taskId) {
    const changedTaskIndex = tasksArray.findIndex(item => item.id === taskId);

    tasksArray[changedTaskIndex].isCompleted = !tasksArray[changedTaskIndex].isCompleted;
    document.getElementById(taskId).classList.toggle('line-through');
  }


  static showActiveTask(task) {
    if (task.isCompleted) {
      return;
    }

    tasksArea.innerHTML += task.createHtml();
  }


  static showCompletedTask(task) {
    if (!task.isCompleted) {
      return;
    }
    
    tasksArea.innerHTML += task.createHtml();
    document.getElementById(`${task.id}`).classList.toggle('line-through');
  }


  static showTask(task) {
    tasksArea.innerHTML += task.createHtml();

    if (!task.isCompleted) {
      return;
    }

    document.getElementById(`${task.id}`).classList.toggle('line-through');
  }
}