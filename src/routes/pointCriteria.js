const express = require("express");
const pointCriteriaController = require("../controllers/pointCriteriaController");
const authverify = require("../middlewares/authverify")
const pointCriteriaRoute = express.Router();

pointCriteriaRoute.use(authverify);

pointCriteriaRoute.post("/", pointCriteriaController.createPoint);

pointCriteriaRoute
  .route("/single/:id")
  .get(pointCriteriaController.getPoint)
  .delete(pointCriteriaController.deletePoint)
  .put(pointCriteriaController.updatePoint)

pointCriteriaRoute.get("/list", pointCriteriaController.getAllPoints);

module.exports = pointCriteriaRoute;