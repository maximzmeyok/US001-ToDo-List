import {Task} from "./Task.js";
import {PopUp} from "./PopUp.js";
import {createTask, showTasks, isValidTaskName, showWrongInput, showDefaultInput, showActiveTasks, showCompletedTasks, showAllTasks} from "./functions.js";
import { SortBlock } from "./SortBlock.js";

export const REGEXP = new RegExp("^[a-zA-Z0-9а-яА-ЯёЁ ]+$");
export let tasksArray = [];

export let windowState = 'All';

export const tasksArea = document.querySelector('#tasks');
const taskButtonPlus = document.querySelector('#taskButtonPlus');
const sortBlockButton = document.querySelector('#sortBlockButton');
const taskInput = document.querySelector('#taskInput');
const activeTasksButton = document.querySelector('#activeTasksButton');
const completedTasksButton = document.querySelector('#completedTasksButton');
const clearCompletedTasksButton = document.querySelector('#clearCompletedTasksButton');
const allTasksButton = document.querySelector('#allTasksButton');

tasksArea.addEventListener('click', function(event) {
  const target = event.target;

  if (target.classList.contains('cross')) {
    Task.removeTask(target.id);
  } else if (target.classList.contains('checkbox')) {
    Task.completeTask(target.id);
    showTasks(windowState);
  } else if (target.classList.contains('gear')) {
    PopUp.createPopUp(target.id);
  }
});

taskButtonPlus.addEventListener('click', function() {
  PopUp.createPopUp();
});

taskInput.addEventListener('keydown', function(event) {
  showDefaultInput(taskInput);
  
  if (event.code == 'Enter' && isValidTaskName(taskInput.value)) {
    const taskName = taskInput.value;

    createTask(taskName);
    taskInput.value = '';
  } else if (event.code == 'Enter' && !isValidTaskName(taskInput.value)) {
    showWrongInput(taskInput);
  }
});

activeTasksButton.addEventListener('click', function() {
  windowState = 'Active';
  showActiveTasks();
});

completedTasksButton.addEventListener('click', function() {
  windowState = 'Completed';
  showCompletedTasks();
});

allTasksButton.addEventListener('click', function() {
  windowState = 'All';
  showAllTasks();
});

clearCompletedTasksButton.addEventListener('click', function() {
  tasksArray = tasksArray.filter(item => item.isCompleted === false);
  showTasks(windowState);
});

sortBlockButton.addEventListener('click', function() {
  SortBlock.createSortBlock();
})