const addTaskButton = document.querySelector('#addTaskButton');
addTaskButton.addEventListener('click', makePopCreate);

function makePopCreate() {
  let popCreate = document.createElement("section");
  popCreate.classList.add("pop");
  popCreate.innerHTML = `
  <div class="pop-container">
    <h2>Create a new task</h2>
    <input placeholder="Enter a task name" type="text" required>
    <p>Creation date:</p>
    <input type="date" required>
    <p>Expiration date:</p>
    <input type="date" required>
    <button class="button" id="addTaskButtonOk">Ok</button>
    <button class="button" id="addTaskButtonCancel">Cancel</button>
  </div>
  `;
  document.body.append(popCreate);
  document.querySelector('#addTaskButtonOk').addEventListener('click', function() {
    popCreate.remove();
  });
  document.querySelector('#addTaskButtonCancel').addEventListener('click', function() {
    popCreate.remove();
  });
}