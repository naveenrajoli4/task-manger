const taskService = require('./TaskService'); // Updated service name
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ROUTES FOR OUR API
// =======================================================

// Health Check
app.get('/health', (req, res) => {
    res.json("This is the health check");
});

// ADD TASK
app.post('/task', (req, res) => {
    try {
        t = moment().unix();
        console.log(`{ "timestamp": ${t}, "msg": "Adding Task", "title": "${req.body.title}" }`);
        taskService.addTask(req.body.title, req.body.description, req.body.status, function (success) {
            if (success) {
                res.json({ message: 'Task added successfully' });
            } else {
                res.status(400).json({ message: 'Could not add task' });
            }
        });
    } catch (err) {
        res.json({ message: 'Something went wrong', error: err.message });
    }
});

// GET ALL TASKS
app.get('/tasks', (req, res) => {
    try {
        taskService.getAllTasks(function (results) {
            res.status(200).json({ tasks: results });
        });
    } catch (err) {
        res.json({ message: "Could not get all tasks", error: err.message });
    }
});

// UPDATE TASK STATUS
app.put('/task/:id', (req, res) => {
    try {
        t = moment().unix();
        console.log(`{ "timestamp": ${t}, "msg": "Updating Task", "task_id": ${req.params.id}, "status": "${req.body.status}" }`);
        taskService.updateTaskStatus(req.params.id, req.body.status, function (success) {
            if (success) {
                res.json({ message: 'Task updated successfully' });
            } else {
                res.status(400).json({ message: 'Could not update task' });
            }
        });
    } catch (err) {
        res.json({ message: 'Something went wrong', error: err.message });
    }
});

// DELETE TASK BY ID
app.delete('/task/:id', (req, res) => {
    try {
        taskService.deleteTaskById(req.params.id, function (result) {
            res.status(200).json({ message: `Task with ID ${req.params.id} deleted successfully.` });
        });
    } catch (err) {
        res.json({ message: "Error deleting task", error: err.message });
    }
});

// GET TASK BY ID
app.get('/task/:id', (req, res) => {
    try {
        taskService.getTaskById(req.params.id, function (result) {
            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        });
    } catch (err) {
        res.json({ message: "Error retrieving task", error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    t = moment().unix();
    console.log(`{ "timestamp": ${t}, "msg": "Task Manager App Started on Port ${port}" }`);
});
