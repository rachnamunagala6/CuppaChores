let taskList = [];
document.getElementById('taskInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskListContainer = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();
        taskList.push({ text: taskText, completed: false });

        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => handleCheckboxChange(taskText));

        const label = document.createElement('label');
        label.textContent = taskText;        

        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(taskText));
        taskListContainer.appendChild(listItem);

        taskInput.value = '';
    }
};
function handleCheckboxChange(taskText) {
    const index = taskList.findIndex(task => task.text === taskText);

    if (index !== -1) {
        taskList[index].completed = !taskList[index].completed;

        const listItem = document.querySelector(`li:contains('${taskText}')`);
        if (listItem) {
            listItem.classList.toggle('completed', taskList[index].completed);
            if (taskList[index].completed) {
                const parent = listItem.parentNode;
                const lastChild = parent.lastChild;

                if (lastChild !== listItem) {
                    parent.insertBefore(listItem, null);
                }
            }
        }
    }
};

const { ipcRenderer } = require('electron');

ipcRenderer.on('new-task-added', (event, taskText) => {
    const taskListContainer = document.getElementById('taskList');

    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => handleCheckboxChange(taskText));

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(taskText));
    taskListContainer.appendChild(listItem);
});
function closeWindow() {
    ipcRenderer.send('close-window');
}
function minimizeWindow() {
    ipcRenderer.send('minimize-window');
};

function maximizeWindow() {
    ipcRenderer.send('maximize-window');
};
