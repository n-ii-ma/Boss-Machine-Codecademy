const express = require("express");
const meetingsRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require("../db");

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("meetings"));
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post("/", (req, res) => {
  res.status(201).send(addToDatabase("meetings", createMeeting()));
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete("/", (req, res) => {
  res.status(204).send(deleteAllFromDatabase("meetings"));
});

module.exports = meetingsRouter;
