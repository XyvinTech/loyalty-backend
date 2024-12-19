const responseHandler = require("../helpers/responseHandler");
const pointCriteria = require("../models/pointCriteriaModel");
const User = require("../models/userModel");
//const sendInAppNotification = require("../utils/sendInAppNotification");
const validations = require("../validations");

exports.createPoint = async (req, res) => {
  try {
    const createPointValidator = validations.createReferralSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createPointValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createPointValidator.error}`
      );
    }
    req.body.author = req.userId;
    const newPoint = await pointCriteria.create(req.body);
    if (!newPoint) {
      return responseHandler(res, 400, `Point creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Point created successfully..!`,
      newPoint
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getPoint = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Point with this Id is required");
    }

    const findPoint = await pointCriteria.findById(id);
    if (findPoint) {
      return responseHandler(res, 200, `Point found successfully..!`, findPoint);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deletePoint = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "Point with this Id is required");
    }

    const deletePoint = await pointCriteria.findByIdAndDelete(id);
    if (deletePoint) {
      return responseHandler(
        res,
        200,
        "Point deleted successfullyy!",
        deletePoint
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllPoints = async (req, res) => {
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
    const totalCount = await pointCriteria.countDocuments(filter);
    const data = await pointCriteria.find(filter)
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
      `Point found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};


exports.updatePoint = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "point Id is required");
    }

    const { error } = validations.editPointSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updatePoint = await pointCriteria.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updatePoint) {
      return responseHandler(
        res,
        200,
        `point updated successfully..!`,
        updatePoint
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
  
  exports.getMyPoints = async (req, res) => {
    try {
      const findPoint = await pointCriteria.find({ author: req.userId }).populate(
        "comment.user",
        "name image"
      );
      if (!findPoint) {
        return responseHandler(res, 404, "Points not found");
      }
      return responseHandler(res, 200, "Points found successfully..!", findPoint);
    } catch (error) {
      return responseHandler(res, 500, `Internal Server Error ${error.message}`);
    }
  };