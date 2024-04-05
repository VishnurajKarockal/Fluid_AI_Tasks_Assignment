const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duedate: {
      type: Date,
      required: true,
    },
    priority: {
      type: Number,
      enum: [1, 2, 3],
      default: 3,
    },
    status: {
      type: String,
      enum: ["pending", "working", "done"],
      default: "pending",
    },
    userID: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = { taskModel };
