document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    function fetchTasks() {
        fetch("/api/tasks")
            .then(res => res.json())
            .then(data => {
                taskList.innerHTML = "";
                data.tasks.forEach(task => {
                    let li = document.createElement("li");
                    li.textContent = task.description;
                    
                    if (task.completed) {
                        li.style.textDecoration = "line-through";
                    }

                    li.addEventListener("click", () => completeTask(task.id));
                    taskList.appendChild(li);
                });
            });
    }

    function addTask() {
        fetch("/api/task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: taskInput.value })
        }).then(() => {
            taskInput.value = "";
            fetchTasks();
        });
    }

    function completeTask(id) {
        fetch(`/api/task/${id}`, { method: "PUT" })
            .then(() => fetchTasks());
    }

    addTaskBtn.addEventListener("click", addTask);
    fetchTasks();
});
