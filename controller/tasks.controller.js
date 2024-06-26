const { create } = require('hbs');
const Task = require('../models/Task.js');

getAllTasks = (req, res) => {
    Task.find()
        .sort({ createdAt: -1 })
        .then((tasks) => {
            res.render('index.hbs', { tasks }); // render the tasks view with the tasks data
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occurred while retrieving tasks',
            });
        });
};

createTask = (req, res) => {
    const { title, description, completed, dueDate, priority, category } =
        req.body;
    const task = new Task({
        title,
        description,
        completed,
        dueDate,
        priority,
        category,
    });

    task.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Error occurred while creating the Task',
            });
        });
};

findTaskById = (req, res) => {
    const id = req.params.id;
    Task.findById(id)
        .then((task) => {
            if (!task) {
                return res.status(404).send({
                    message: 'Task not found with id ' + id,
                });
            }
            res.status(200).send(task);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Task not found with id ' + id,
                });
            }
            return res.status(500).send({
                message: 'Error retrieving task with id ' + id,
            });
        });
};

editTaskById = (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    Task.findByIdAndUpdate(id, req.body)
        .then((task) => {
            return res.status(200).redirect('/tasks');
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Task not found with id ' + id,
                });
            }
            return res.status(500).send({
                message: 'Error updating task with id ' + id,
            });
        });
};

deleteTaskById = (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then((task) => {
            return res.status(200).redirect('/tasks');
        })
        .catch((err) => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Task not found with id ' + id,
                });
            }
            return res.status(500).send({
                message: 'Error deleting task with id ' + id,
            });
        });
};

toggleCompleteTask = (req, res) => {
    const id = req.params.id;
    Task.findById(id)
        .then((task) => {
            task.completed = !task.completed;
            task.save()
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || 'Error occurred while updating task',
                    });
                });
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Task not found with id ' + id,
                });
            }
            return res.status(500).send({
                message: 'Error updating task with id ' + id,
            });
        });
};

filterTasksByTitle = (req, res) => {
    let userQuery = req.query.q;
    let queryTasks = Task.find({ title: { $regex: userQuery, $options: 'i' } })
        .then((tasks) => {
            console.log(tasks);
            res.render('index.hbs', { tasks });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occurred while filtering tasks',
            });
        });
};

module.exports = {
    createTask,
    getAllTasks,
    findTaskById,
    editTaskById,
    deleteTaskById,
    toggleCompleteTask,
    filterTasksByTitle,
};
