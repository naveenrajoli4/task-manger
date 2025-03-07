const dbcreds = require('./DbConfig');
const mysql = require('mysql2'); // Using mysql2

// Database Connection
const con = mysql.createConnection({
    host: process.env.DB_HOST || dbcreds.DB_HOST,
    user: process.env.DB_USER || dbcreds.DB_USER,
    password: process.env.DB_PWD || dbcreds.DB_PWD,
    database: process.env.DB_DATABASE || dbcreds.DB_DATABASE
});

// ADD TASK
function addTask(title, description, status, callback) {
    var sql = `INSERT INTO tasks (title, description, status) VALUES ('${title}', '${description}', '${status}')`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error adding task:", err);
            return callback(false);
        }
        console.log(`Task '${title}' added successfully`);
        callback(true);
    });
}

// GET ALL TASKS
function getAllTasks(callback) {
    var sql = "SELECT * FROM tasks";
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

// UPDATE TASK STATUS
function updateTaskStatus(taskId, status, callback) {
    var sql = `UPDATE tasks SET status = '${status}' WHERE id = ${taskId}`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error updating task status:", err);
            return callback(false);
        }
        console.log(`Task ID ${taskId} updated to status '${status}'`);
        callback(true);
    });
}

// DELETE TASK BY ID
function deleteTaskById(id, callback) {
    var sql = `DELETE FROM tasks WHERE id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Deleted task with ID ${id}`);
        callback(result);
    });
}

// GET TASK BY ID
function getTaskById(id, callback) {
    var sql = `SELECT * FROM tasks WHERE id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

module.exports = {
    addTask,
    getAllTasks,
    updateTaskStatus,
    deleteTaskById,
    getTaskById
};
