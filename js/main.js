document.addEventListener('DOMContentLoaded', () => {
    // Manejar el formulario de creación de tareas
    if (document.getElementById('task-form')) {
        document.getElementById('task-form').addEventListener('submit', function(event) {
            event.preventDefault();
            createTask();
            window.location.href = 'main.html'; // Redirige al panel principal después de crear una tarea
        });
    }

    // Cargar y mostrar las tareas en el main.html
    if (document.getElementById('task-view')) {
        displayTasks();
    }

    // Navegación al formulario de creación de tarea
    if (document.getElementById('create-task-button')) {
        document.getElementById('create-task-button').addEventListener('click', function() {
            window.location.href = 'taskform.html'; // Redirige al formulario de nueva tarea
        });
    }
});

// Función para crear una nueva tarea y guardarla en localStorage
function createTask() {
    const taskName = document.getElementById('task-name').value;
    const assignedPerson = document.getElementById('assigned-person').value;
    const dueDate = document.getElementById('due-date').value;
    const taskStatus = document.getElementById('task-status').value;

    const task = {
        name: taskName,
        person: assignedPerson,
        date: dueDate,
        status: taskStatus
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para mostrar las tareas guardadas en el main.html
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskView = document.getElementById('task-view');

    // Limpiar tareas anteriores
    taskView.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>Encargado: ${task.person}</p>
            <p>Fecha de entrega: ${task.date}</p>
            <p>Estado: ${task.status}</p>
            <button class="delete-task-button" data-index="${index}">Eliminar</button>
        `;
        taskView.appendChild(taskElement);
    });

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.delete-task-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteTask(index);
        });
    });
}

// Función para eliminar una tarea
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); // Volver a mostrar las tareas después de eliminar
}
