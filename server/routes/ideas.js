const express = require("express");
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

const checkMillionDollarIdea = require("../checkMillionDollarIdea");

// Parameter Mapping
ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send(`Idea with ID of ${id} Doesn't Exist!`);
  }
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("ideas"));
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get("/:ideaId", (req, res) => {
  res.send(req.idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res) => {
  res.send(updateInstanceInDatabase("ideas", req.body));
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post("/", checkMillionDollarIdea, (req, res) => {
  res.status(201).send(addToDatabase("ideas", req.body));
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete("/:ideaId", (req, res) => {
  res.status(204).send(deleteFromDatabasebyId("ideas", req.idea.id));
});

module.exports = ideasRouter;
