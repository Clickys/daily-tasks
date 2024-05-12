const router = require('express').Router();
const taskController = require('../controller/tasks.controller.js');

router.get('/', taskController.getAllTasks);

router.post('/new-task', taskController.createTask);

router.get('/find-task/:id', taskController.findTaskById);

router.put('/edit-task/:id', taskController.editTaskById);

router.delete('/delete-task/:id', taskController.deleteTaskById);

router.post('/mark-task-complete/:id', taskController.toggleCompleteTask);


module.exports = router;
