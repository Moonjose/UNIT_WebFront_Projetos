document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromStorage();
});

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  const task = {
    id: `task-${Date.now()}`,
    content: text,
    column: 'em-aberto'
  };

  createTaskCard(task);
  saveTaskToStorage(task);
  input.value = '';
}

function createTaskCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card';
  card.id = task.id;
  card.draggable = true;
  card.ondragstart = drag;

  const text = document.createElement('span');
  text.innerText = task.content;

  const removeBtn = document.createElement('button');
  removeBtn.innerText = '✖';
  removeBtn.onclick = () => removeTask(task.id);

  card.appendChild(text);
  card.appendChild(removeBtn);

  document.getElementById(task.column).appendChild(card);
}

function removeTask(id) {
  document.getElementById(id)?.remove();
  const tasks = getTasksFromStorage().filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  const newColumn = ev.currentTarget.id;

  ev.currentTarget.appendChild(card);

  const tasks = getTasksFromStorage();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.column = newColumn;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasksFromStorage() {
  getTasksFromStorage().forEach(createTaskCard);
}
