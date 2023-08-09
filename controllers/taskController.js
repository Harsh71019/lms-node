import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js'; // Import your Task model
// import any other necessary modules

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, priority, description, details, duration, company, status } =
    req.body;

  const task = await Task.create({
    user: req.user._id,
    title,
    priority,
    description,
    details,
    duration,
    company,
    status,
  });

  if (task) {
    res.status(201).json(task);
  } else {
    res.status(400);
    throw new Error('Invalid task data');
  }
});

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({}).populate('user'); // You might need to adjust the population based on your schema

  res.json(tasks);
});

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('user'); // You might need to adjust the population based on your schema

  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, priority, description, details, duration, company, status } =
    req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = title;
    task.priority = priority;
    task.description = description;
    task.details = details;
    task.duration = duration;
    task.company = company;
    task.status = status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.remove();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
