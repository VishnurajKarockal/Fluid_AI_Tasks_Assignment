const express = require("express");
const { connection, connectDB } = require("./config/db");
const { userRouter } = require("./Routes/users.routes");
const { taskRouter } = require("./Routes/tasks.routes");
var cron = require("node-cron");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

// Cron job to update priority based on duedate
cron.schedule("0 0 * * *", async () => {
  // Run every day at midnight
  try {
    const tasks = await taskModel.find();
    const today = new Date();

    tasks.forEach(async (task) => {
      const dueDate = new Date(task.duedate);
      const differenceInDays = Math.floor(
        (dueDate - today) / (1000 * 60 * 60 * 24)
      );

      if (differenceInDays < 2) {
        task.priority = 1;
      } else if (differenceInDays >= 2 && differenceInDays < 5) {
        task.priority = 2;
      }

      await task.save();
    });

    console.log("Priority updated for tasks based on duedate");
  } catch (error) {
    console.error("Error updating priority:", error);
  }
});

const PORT = process.env.PORT || 8080;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error starting server:", err));

module.exports = { app };