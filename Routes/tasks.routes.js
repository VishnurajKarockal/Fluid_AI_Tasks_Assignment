const express = require("express");
const { auth } = require("../Middlewares/auth.middleware");
const { taskModel } = require("../Model/tasks.model");

const taskRouter = express.Router();
taskRouter.use(express.json());

// Add new task
//duedate format -> 2024-04-10T12:00:00Z
taskRouter.post("/create", auth, async (req, res) => {
  try {
    const { title, description, duedate } = req.body;
    if (!title || !description || !duedate) {
      return res
        .status(400)
        .json({ error: "Title, description, and duedate are required" });
    }
    const task = new taskModel({ title, description, duedate });
    await task.save();
    const { username } = req.body;
    res.status(200).json({ msg: `New task has been created by ${username}` });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

//To Get All tasks
taskRouter.get("/", auth, async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({ msg: "All tasks from database", tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// To get single task
taskRouter.get("/:taskID", auth, async (req, res) => {
  const { taskID } = req.params;

  try {
    const task = await taskModel.findOne({ _id: taskID });
    res
      .status(200)
      .json({ msg: "Here is the task that you are looking for", task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// To update a task
taskRouter.patch("/:taskID", auth, async (req, res) => {
  const { taskID } = req.params;
  const payload = req.body;
  try {
    const task = await taskModel.findByIdAndUpdate(taskID, payload);
    res.status(200).json({ msg: `Task has been updated successfully` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// To delete a task
taskRouter.delete("/:taskID", auth, async (req, res) => {
  const { taskID } = req.params;
  try {
    await taskModel.findByIdAndDelete(taskID);
    res.status(200).json({ msg: `Task has been deleted successfully` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = { taskRouter };
