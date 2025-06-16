require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Task = require("../db/todo-db");




router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  res.render("todo/index", { tasks, today });
});

router.post("/", async (req, res) => {
  const { newTask } = req.body;
  if (newTask.trim() !== "") {
    await new Task({ name: newTask, completed: false }).save();
  }
  res.redirect("/todo");
});

router.post("/toggle", async (req, res) => {
  const task = await Task.findById(req.body.id);
  task.completed = !task.completed;
  await task.save();
  res.redirect("/todo");
});

router.post("/edit", async (req, res) => {
  await Task.findByIdAndUpdate(req.body.id, { name: req.body.updatedTask });
  res.redirect("/todo");
});

router.post("/delete", async (req, res) => {
  await Task.findByIdAndDelete(req.body.id);
  res.redirect("/todo");
});

module.exports = router;

// router.listen(process.env.PORT || 3000, () => console.log("Server running on port 3000"));
