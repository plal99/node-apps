const mongoose = require("mongoose");

const notesConnection = mongoose.createConnection(process.env.MONGO_URI_NOTES);

notesConnection.on('connected', () => {
  console.log('Notes DB connected successfully');
});

notesConnection.on('error', (err) => {
  console.error('Notes DB connection error:', err);
});

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = notesConnection.model("Note", notesSchema);