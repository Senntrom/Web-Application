document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = createTaskElement(taskText);
    document.getElementById('todo-list').appendChild(taskItem);

    saveTask(taskText);
    input.value = '';
}

function createTaskElement(taskText, isChecked = false) {
    const taskItem = document.createElement('li');
    taskItem.className = 'todo-item';

    const taskTextNode = document.createElement('span');
    taskTextNode.textContent = taskText;

    const checkIcon = document.createElement('img');
    checkIcon.src = isChecked ? 'assets/checked.png' : 'assets/unchecked.png';
    checkIcon.alt = isChecked ? 'Checked' : 'Unchecked';
    checkIcon.addEventListener('click', () => toggleCheck(checkIcon, taskText));

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete-icon';
    deleteIcon.textContent = 'X';
    deleteIcon.addEventListener('click', () => deleteTask(taskItem, taskText));

    taskItem.appendChild(taskTextNode);
    taskItem.appendChild(checkIcon);
    taskItem.appendChild(deleteIcon);

    return taskItem;
}

function toggleCheck(icon, taskText) {
    const tasks = getTasks();
    const task = tasks.find(t => t.text === taskText);
    task.isChecked = !task.isChecked;

    icon.src = task.isChecked ? 'assets/checked.png' : 'assets/unchecked.png';
    icon.alt = task.isChecked ? 'Checked' : 'Unchecked';

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskItem, taskText) {
    taskItem.remove();

    const tasks = getTasks().filter(t => t.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTask(taskText) {
    const tasks = getTasks();
    tasks.push({ text: taskText, isChecked: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.isChecked);
        document.getElementById('todo-list').appendChild(taskItem);
    });
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Redirect to Dino game
document.getElementById('dino-game-btn').addEventListener('click', () => {
    window.location.href = 'dino.html';
});