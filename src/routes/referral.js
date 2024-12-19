const express = require("express");
const referralController = require("../controllers/referralController");
const authverify = require("../middlewares/authverify")
const referralRoute = express.Router();

referralRoute.use(authverify);

referralRoute.post("/", referralController.createReferral);

referralRoute
  .route("/single/:id")
  .get(referralController.getReferral)
  .delete(referralController.deleteReferral)
  .put(referralController.updateReferral)

referralRoute.get("/list", referralController.getAllReferral);

module.exports = referralRoute;