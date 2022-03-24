import {Task} from "./Task.js";
import {PopUp} from "./PopUp.js";
import {createTask} from "./functions.js";

export const tasksArray = [];

const tasksArea = document.querySelector('#tasks');
const taskButton = document.querySelector('#taskButton');
const taskButtonPlus = document.querySelector('#taskButtonPlus');
const taskInput = document.querySelector('#taskInput');

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

taskButton.addEventListener('click', function() {
  PopUp.createPopUp();
});

taskButtonPlus.addEventListener('click', function() {
  PopUp.createPopUp();
});

taskInput.addEventListener('keydown', function(event) {
  if (event.code == 'Enter') {
    const taskName = taskInput.value;

    createTask(taskName);
    taskInput.value = '';
  }
});