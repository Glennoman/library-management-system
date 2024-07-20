const mongoose = require("mongoose");

// Defining schema for book
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // Reference to author
    ref: "Author",
    required: true,
  },
});

// Create  model from schema and export
const Book = mongoose.model("nook", bookSchema);

module.exports = Book;
