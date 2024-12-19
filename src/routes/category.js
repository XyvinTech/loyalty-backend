const express = require("express");
const categoryRoute = express.Router();
const categoryController = require("../controllers/categoryController");
const authVerify = require ("../middlewares/authverify")

categoryRoute.use(authVerify);

categoryRoute.post("/", categoryController.createCategory);

categoryRoute
  .route("/single/:id")
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

categoryRoute.get("/list", categoryController.getAllCategories);

module.exports = categoryRoute;
