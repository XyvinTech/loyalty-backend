const responseHandler = require("../helpers/responseHandler");
const Discount = require("../models/discountModel");
const User = require("../models/userModel");
//const sendInAppNotification = require("../utils/sendInAppNotification");
const validations = require("../validations");

exports.createDiscount = async (req, res) => {
  try {
    const createDiscountValidator = validations.createDiscountSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createDiscountValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createDiscountValidator.error}`
      );
    }
    req.body.author = req.userId;
    const newDiscount = await Discount.create(req.body);
    if (!newDiscount) {
      return responseHandler(res, 400, `Discount creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Discount created successfully..!`,
      newDiscount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Discount with this Id is required");
    }

    const findDiscount = await Discount.findById(id);
    if (findDiscount) {
      return responseHandler(res, 200, `Discount found successfully..!`, findDiscount);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "Discount with this Id is required");
    }

    const deleteDiscount = await Discount.findByIdAndDelete(id);
    if (deleteDiscount) {
      return responseHandler(
        res,
        200,
        "Discount deleted successfullyy!",
        deleteDiscount
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllDiscount = async (req, res) => {
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
    const totalCount = await Discount.countDocuments(filter);
    const data = await Discount.find(filter)
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
      `Discount found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};


exports.updateDiscount = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "discount Id is required");
    }

    const { error } = validations.editDiscountSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateDiscount = await Discount.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateDiscount) {
      return responseHandler(
        res,
        200,
        `discount updated successfully..!`,
        updateDiscount
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
  
  exports.getMyDiscount = async (req, res) => {
    try {
      const findDiscount = await Discount.find({ author: req.userId }).populate(
        "comment.user",
        "name image"
      );
      if (!findDiscount) {
        return responseHandler(res, 404, "Discount not found");
      }
      return responseHandler(res, 200, "Discount found successfully..!", findDiscount);
    } catch (error) {
      return responseHandler(res, 500, `Internal Server Error ${error.message}`);
    }
  };