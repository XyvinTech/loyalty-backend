const express = require("express");
const adminController = require("../controllers/adminController");
const authVerify = require("../middlewares/authverify");
const adminRoute = express.Router();

adminRoute.post("/login", adminController.loginAdmin);

 adminRoute.use(authVerify);

adminRoute
  .route("/")
  .post(adminController.createAdmin)
  .get(adminController.getAdmin);

adminRoute.get("/list", adminController.getAllAdmins);

adminRoute
  .route("/profile/:id")
 // .get(adminController.fetchAdmin)
  .put(adminController.editAdmin)
  .delete(adminController.deleteAdmin);

module.exports = adminRoute;
