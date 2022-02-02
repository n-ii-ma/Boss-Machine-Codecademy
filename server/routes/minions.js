const express = require("express");
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("../db");

// Set Parameter
minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send(`Minion with ID of ${id} Doesn't Exist!`);
  }
});

// GET /api/minions to get an array of all minions.
minionsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("minions"));
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get("/:minionId", (req, res) => {
  res.send(req.minion);
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post("/", (req, res) => {
  res.status(201).send(addToDatabase("minions", req.body));
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put("/:minionId", (req, res) => {
  res.send(updateInstanceInDatabase("minions", req.body));
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete("/:minionId", (req, res) => {
  res.status(204).send(deleteFromDatabasebyId("minions", req.minion.id));
});

module.exports = minionsRouter;
