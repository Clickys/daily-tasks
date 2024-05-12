const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        dueDate: {
            type: Date,
            required: false,
        },
        priority: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
