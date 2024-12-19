const express = require("express");
const couponController = require("../controllers/couponController");
const authverify = require("../middlewares/authverify")
const couponRoute = express.Router();

couponRoute.use(authverify);

couponRoute.post("/", couponController.createCoupon);

couponRoute
  .route("/single/:id")
  .get(couponController.getCoupon)
  .delete(couponController.deleteCoupon)
  .put(couponController.updateCoupon)

couponRoute.get("/list", couponController.getAllCoupons);
couponRoute.get("/my-feeds", couponController.getMyCoupons);

module.exports = couponRoute;