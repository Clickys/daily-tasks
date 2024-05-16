const router = require('express').Router();
const taskController = require('../controller/tasks.controller.js');

router.get('/', taskController.getAllTasks);

router.get('/filter-tasks/:title', taskController.filterTasksByTitle);

router.post('/new-task', taskController.createTask);

router.get('/find-task/:id', taskController.findTaskById);

router.post('/edit-task/:id', taskController.editTaskById);

router.get('/delete-task/:id', taskController.deleteTaskById);

router.post('/mark-task-complete/:id', taskController.toggleCompleteTask);

module.exports = router;
