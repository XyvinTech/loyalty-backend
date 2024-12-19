const responseHandler = require("../helpers/responseHandler");
const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
//const sendInAppNotification = require("../utils/sendInAppNotification");
const validations = require("../validations");

exports.createCoupon = async (req, res) => {
  try {
    const createCouponValidator = validations.createReferralSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createCouponValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createCouponValidator.error}`
      );
    }
    req.body.author = req.userId;
    const newCoupon = await Coupon.create(req.body);
    if (!newCoupon) {
      return responseHandler(res, 400, `Coupon creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Coupon created successfully..!`,
      newCoupon
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Coupon with this Id is required");
    }

    const findCoupon = await Coupon.findById(id);
    if (findCoupon) {
      return responseHandler(res, 200, `Coupon found successfully..!`, findCoupon);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "Coupon with this Id is required");
    }

    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    if (deleteCoupon) {
      return responseHandler(
        res,
        200,
        "Coupon deleted successfullyy!",
        deleteCoupon
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const { pageNo = 1, status, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const currentUser = await User.findById(req.userId).select(
      "blockedUsers notInterestedPosts"
    );
    const blockedUsersList = currentUser.blockedUsers;
    const notInterestedUsersList = currentUser.notInterestedPosts;

    const filter = {
      status: "published",
      author: {
        $nin: [...blockedUsersList, ...notInterestedUsersList],
      },
    };
    const totalCount = await Coupon.countDocuments(filter);
    const data = await Coupon.find(filter)
      .populate({
        path: "comment.user",
        select: "name image",
      })
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Coupons found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};


exports.updateCoupon = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "coupon Id is required");
    }

    const { error } = validations.editCouponSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateCoupon) {
      return responseHandler(
        res,
        200,
        `coupon updated successfully..!`,
        updateCoupon
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
  
  exports.getMyCoupons = async (req, res) => {
    try {
      const findCoupon = await Coupon.find({ author: req.userId }).populate(
        "comment.user",
        "name image"
      );
      if (!findCoupon) {
        return responseHandler(res, 404, "Coupon not found");
      }
      return responseHandler(res, 200, "Coupon found successfully..!", findCoupon);
    } catch (error) {
      return responseHandler(res, 500, `Internal Server Error ${error.message}`);
    }
  };