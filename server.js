const express = require("express");
const mongoose = require("mongoose");

// Import models
const Author = require("./models/author");
const Book = require("./models/book");

// Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connecton error", err);
});

// Routes for Author

// Create a new author
app.post("/authors", async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all authors
app.get("/authors", async (req, res) => {
  try {
    const author = await Author.find();
    res.send(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get an author by ID
app.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id); // Retrieves id parameter from the request URL
    if (!author) {
      return res.send(author);
    }
  } catch (error) {
    console.error(500).send(error);
  }
});

// Update author by ID
app.put("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!author) {
      return res.status(404).send();
    }
    res.send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an author by ID
app.delete("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).send();
    }
    res.send(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for books

// Create a new book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author"); // Populate author data
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("author");
    if (!book) {
      return res.status(400).send();
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
