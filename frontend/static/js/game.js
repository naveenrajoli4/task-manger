document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="complete-task">✔</button>
            <button class="delete-task">✖</button>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = "";
        playSound("static/media/add-sound.mp3");

        // Add event listeners to buttons
        taskItem.querySelector(".complete-task").addEventListener("click", () => completeTask(taskItem));
        taskItem.querySelector(".delete-task").addEventListener("click", () => deleteTask(taskItem));
    }

    function completeTask(taskItem) {
        taskItem.classList.toggle("completed");
        playSound("static/media/complete-sound.mp3");
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        playSound("static/media/delete-sound.mp3");
    }

    function playSound(file) {
        let sound = new Audio(file);
        sound.play();
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
});
