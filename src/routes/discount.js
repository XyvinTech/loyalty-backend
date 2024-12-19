const express = require("express");
const discountController = require("../controllers/discountController");
const authverify = require("../middlewares/authverify")
const discountRoute = express.Router();

discountRoute.use(authverify);

discountRoute.post("/", discountController.createDiscount);

discountRoute
  .route("/single/:id")
  .get(discountController.getDiscount)
  .delete(discountController.deleteDiscount);

discountRoute.get("/list", discountController.getAllDiscount);
discountRoute.put("/single/:action/:id", discountController.updateDiscount);

module.exports = discountRoute;