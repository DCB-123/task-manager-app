const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
