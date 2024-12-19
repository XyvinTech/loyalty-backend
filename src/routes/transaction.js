const express = require("express");
const transactionController = require("../controllers/transactionController");
const authverify = require("../middlewares/authverify")
const transactionRoute = express.Router();

transactionRoute.use(authverify);

transactionRoute.post("/", transactionController.createTransaction);

transactionRoute
  .route("/single/:id")
  .get(transactionController.getTransaction)
  .delete(transactionController.deleteTransaction)
  .put(transactionController.updateTransaction)

transactionRoute.get("/list", transactionController.getAllTransaction);

module.exports = transactionRoute;