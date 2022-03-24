import {Task} from "./Task.js";
import {tasksArray, REGEXP} from "./script.js";


export function createTask(taskName) {
  const currentDate = new Date();
  const creationDate = transformDateForInput(getCreationDate(currentDate));
  const expirationDate = transformDateForInput(getExpirationDate(currentDate));
  const task = new Task({taskName, creationDate, expirationDate});

  tasksArray.push(task);
  document.querySelector("#tasks").innerHTML += task.createHtml();
}

export function transformDateForInput(date) {
  return date.split('-').map(item => item.length === 1 ? `0${item}` : item).join('-');
}


export function getCreationDate(currentDate) {
  return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
}


export function getExpirationDate(currentDate) {
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let day = currentDate.getDate();
  const monthsCount = 12;
  const daysCount = getDaysCountInMonth(month, year);

  if (day === daysCount && month + 1 === monthsCount) {
    year++;
    month = 1;
    day = 1;
  } else if (day === daysCount) {
    month++;
    day = 1;
  } else {
    day++;
  }

  return `${year}-${month + 1}-${day}`;
}


export function getDaysCountInMonth(month, year) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 1);
  const daysCount = (lastDay - firstDay) / 86400000;

  return daysCount;
}


export function isValidTaskName(taskName) {
  return taskName.match(REGEXP);
}


export function showWrongInput(input) {
  input.classList.add('rejected');
}

export function showDefaultInput(input) {
  input.classList.remove('rejected');
}