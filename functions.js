import {Task} from "./Task.js";
import {tasksArray, REGEXP, tasksArea, windowState} from "./script.js";


export function createTask(taskName) {
  const currentDate = new Date();
  const creationDate = transformDateForInput(getCreationDate(currentDate));
  const expirationDate = transformDateForInput(getExpirationDate(currentDate));
  const task = new Task({taskName, creationDate, expirationDate});

  tasksArray.push(task);
  tasksArea.innerHTML += task.createHtml();
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
  const lastDayOfYear = day === daysCount && month + 1 === monthsCount;
  const lastDayOfMonth = day === daysCount;


  if (lastDayOfYear) {
    year++;
    month = 1;
    day = 1;
  } else if (lastDayOfMonth) {
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

export function showActiveTasks() {
  tasksArea.innerHTML = '';
  tasksArray.forEach(item => Task.showActiveTask(item));
}

export function showCompletedTasks() {
  tasksArea.innerHTML = '';
  tasksArray.forEach(item => Task.showCompletedTask(item));
  document.querySelectorAll('.checkbox').forEach(item => item.checked = true);
}

export function showAllTasks() {
  tasksArea.innerHTML = '';
  tasksArray.forEach(item => Task.showTask(item));
  document.querySelectorAll('.checkbox').forEach(checkbox => {
    const currentTask = tasksArray.find(task => task.id == checkbox.id);

    if (!currentTask.isCompleted) {
      return;
    }

    checkbox.checked = true;
  });
}

export function showTasks(windowState) {
  switch (windowState) {
    case 'All':
      showAllTasks();
      break;
    case 'Active':
      showActiveTasks();
      break;
    case 'Completed':
      showCompletedTasks();
  }
}

export function sortTasksByText() {
  tasksArray.sort((a, b) => {
    if (a.taskName > b.taskName) {
      return 1;
    } else if (a.taskName < b.taskName) {
      return -1;
    } else {
      return 0;
    }
  });

  showTasks(windowState);
}

export function sortTasksByDate() {
  tasksArray.sort((a, b) => Date.parse(a.expirationDate) - Date.parse(b.expirationDate));
  console.log(tasksArray);
  showTasks(windowState);
}