const express = require("express");
const apiRouter = express.Router();

// Routes
const minionsRouter = require("./routes/minions");

apiRouter.use("/minions", minionsRouter);

module.exports = apiRouter;
