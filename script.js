import {Task} from "./Task.js";
import {Pop} from "./Pop.js";

export const tasksArray = [];

const tasksArea = document.querySelector('#tasks');
const addTaskButton = document.querySelector('#addTaskButton');

addTaskButton.addEventListener('click', function(event) {
  Pop.createPop();
})

tasksArea.addEventListener('click', function(event) {
  const target = event.target;

  if (target.classList.contains('cross')) {
    Task.removeTask(target.id);
  } else if (target.classList.contains('checkbox')) {
    Task.completeTask(target.id);
  } else if (target.classList.contains('gear')) {
    Pop.createPop(target.id);
  }
})