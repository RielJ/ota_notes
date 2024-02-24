import express from "express";

// Note Routes
const router = express.Router();

// Get all notes
router.get("/", (req, res) => {
  res.send("GET /notes");
});

// Get a note by id
router.get("/:id", (req, res) => {
  res.send("GET /notes/:id");
});

// Create a new note
router.post("/", (req, res) => {
  res.send("POST /notes");
});

// Update a note by id
router.put("/:id", (req, res) => {
  res.send("PUT /notes/:id");
});

// Delete a note by id
router.delete("/:id", (req, res) => {
  res.send("DELETE /notes/:id");
});

export default router;
