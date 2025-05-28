function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const container = document.querySelector('.tasks-container');
    container.innerHTML = '';
    getTasks().forEach((taskText, index) => {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = `
            <h3>${taskText}</h3>
            <button class="remove-bt">Remover Tarefa</button>
        `;
        // Listeners para botão
        task.querySelector('.remove-bt').addEventListener('click', function() {
            const tasks = getTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        });
        container.appendChild(task);
    });
}

document.querySelector('.input-container').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.querySelector('.input');
    const value = input.value.trim();
    if (!value) return;
    const tasks = getTasks();
    tasks.push(value);
    saveTasks(tasks);
    input.value = '';
    renderTasks();
});

renderTasks();