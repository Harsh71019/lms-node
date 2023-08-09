import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: String,
    priority: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      default: 'Medium',
    },
    description: String,
    details: String,
    duration: {
      type: Date,
      default: Date.now,
    },
    company: {
      type: String,
      enum: ['Contentstack', 'IBM', 'Capgemini', 'Google', 'Apple'],
      default: 'Capgemini',
    },
    status: {
      type: String,
      enum: ['Done', 'InProgress', 'Blocked', 'QA', 'Todo'],
      default: 'Todo',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
