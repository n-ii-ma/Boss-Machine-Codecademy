const express = require("express");
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

// Parameter Mapping
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

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put("/:minionId", (req, res) => {
  res.send(updateInstanceInDatabase("minions", req.body));
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post("/", (req, res) => {
  res.status(201).send(addToDatabase("minions", req.body));
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete("/:minionId", (req, res) => {
  res.status(204).send(deleteFromDatabasebyId("minions", req.minion.id));
});

// Parameter Mapping
minionsRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send(`Work with ID of ${id} Doesn't Exist!`);
  }
});

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
minionsRouter.get("/:minionId/work", (req, res) => {
  const getWork = getAllFromDatabase("work").filter(
    (workId) => workId.minionId === req.params.minionId
  );
  res.send(getWork);
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsRouter.put("/:minionId/work/:workId", (req, res) => {
  if (req.params.minionId === req.body.minionId) {
    res.send(updateInstanceInDatabase("work", req.body));
  } else {
    res.status(400).send();
  }
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionsRouter.post("/:minionId/work", (req, res) => {
  req.body.minionId = req.params.minionId;
  res.status(201).send(addToDatabase("work", req.body));
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionsRouter.delete("/:minionId/work/:workId", (req, res) => {
  res.status(204).send(deleteFromDatabasebyId("work", req.params.workId));
});

module.exports = minionsRouter;
