const express = require("express");
const brandRoute = express.Router();
const brandController = require("../controllers/brandController");
const authVerify = require ("../middlewares/authverify")

brandRoute.use(authVerify);

brandRoute.post("/", brandController.createBrand);

brandRoute
  .route("/single/:id")
  .get(brandController.getBrand)
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrand);

brandRoute.get("/list", brandController.getAllBrand);

module.exports = brandRoute;