const responseHandler = require("../helpers/responseHandler");
const Tier = require("../models/tierModel");
const User = require("../models/userModel");
//const sendInAppNotification = require("../utils/sendInAppNotification");
const validations = require("../validations");

exports.createTier = async (req, res) => {
  try {
    const createTierValidator = validations.createReferralSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createTierValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createTierValidator.error}`
      );
    }
    req.body.author = req.userId;
    const newTier = await Tier.create(req.body);
    if (!newTier) {
      return responseHandler(res, 400, `tier creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Tier created successfully..!`,
      newTier
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getTier = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Tier with this Id is required");
    }

    const findTier = await Tier.findById(id);
    if (findTier) {
      return responseHandler(res, 200, `Tier found successfully..!`, findTier);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteTier = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "Tier with this Id is required");
    }

    const deleteTier = await Tier.findByIdAndDelete(id);
    if (deleteTier) {
      return responseHandler(
        res,
        200,
        "Tier deleted successfullyy!",
        deleteTier
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllTier = async (req, res) => {
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
    const totalCount = await Tier.countDocuments(filter);
    const data = await Tier.find(filter)
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
      `Tier found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};


exports.updateTier = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "tier Id is required");
    }

    const { error } = validations.editReferralSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateTier = await Tier.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateTier) {
      return responseHandler(
        res,
        200,
        `tier updated successfully..!`,
        updateTier
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
  
  