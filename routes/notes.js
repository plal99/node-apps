const express = require("express");
const router = express.Router();
const Note = require("../db/notes-db");

// Home page to list notes
router.get("/", async (req, res) => {
  const search = req.query.search || "";
  const filter = search
    ? { $or: [{ title: { $regex: search, $options: "i" } }, { tags: search }] }
    : {};
  const notes = await Note.find(filter).sort({ createdAt: -1 });
  res.render("notes/index", { notes, search });
});

// Create note
router.post("/", async (req, res) => {
  const { title, content, tags } = req.body;
  const tagsArray = tags ? tags.split(",").map(tag => tag.trim()) : [];
  await new Note({ title, content, tags: tagsArray }).save();
  res.redirect("/notes");
});

// Edit form
router.get("/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit", { note });
});

// Update note
router.post("/edit/:id", async (req, res) => {
  const { title, content, tags } = req.body;
  const tagsArray = tags ? tags.split(",").map(tag => tag.trim()) : [];
  await Note.findByIdAndUpdate(req.params.id, { title, content, tags: tagsArray });
  res.redirect("/notes");
});

// Delete note
router.post("/delete/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect("/notes");
});

module.exports = router;
