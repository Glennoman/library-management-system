const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  birthdate: {
    type: Date,
    required: true,
  },
  bio: {
    type: String,
  },
});

// Creating model from the schema and export
const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
