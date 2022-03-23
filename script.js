import {Task} from "./Task.js";
import {PopUp} from "./PopUp.js";

export const tasksArray = [];

const tasksArea = document.querySelector('#tasks');
const addTaskButton = document.querySelector('#addTaskButton');

addTaskButton.addEventListener('click', function(event) {
  PopUp.createPopUp();
});

tasksArea.addEventListener('click', function(event) {
  const target = event.target;

  if (target.classList.contains('cross')) {
    Task.removeTask(target.id);
  } else if (target.classList.contains('checkbox')) {
    Task.completeTask(target.id);
  } else if (target.classList.contains('gear')) {
    PopUp.createPopUp(target.id);
  }
});

/*
3 параметра - передаётся объект
16 - 4ч
*/