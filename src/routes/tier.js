const express = require("express");
const tierController = require("../controllers/tierController");
const authverify = require("../middlewares/authverify")
const tierRoute = express.Router();

tierRoute.use(authverify);

tierRoute.post("/", tierController.createTier);

tierRoute
  .route("/single/:id")
  .get(tierController.getTier)
  .delete(tierController.deleteTier);

tierRoute.get("/list", tierController.getAllTier);
tierRoute.put("/single/:action/:id", tierController.updateTier);

module.exports = tierRoute;