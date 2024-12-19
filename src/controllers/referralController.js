const responseHandler = require("../helpers/responseHandler");
const Referral = require("../models/referralsModel");
const User = require("../models/userModel");
//const sendInAppNotification = require("../utils/sendInAppNotification");
const validations = require("../validations");

exports.createReferral = async (req, res) => {
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
    const newReferral = await Referral.create(req.body);
    if (!newReferral) {
      return responseHandler(res, 400, `Referral creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Referral created successfully..!`,
      newReferral
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getReferral = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Referral with this Id is required");
    }

    const findReferral = await Referral.findById(id);
    if (findReferral) {
      return responseHandler(res, 200, `Referral found successfully..!`, findReferral);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteReferral = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "Referral with this Id is required");
    }

    const deleteReferral = await Referral.findByIdAndDelete(id);
    if (deleteReferral) {
      return responseHandler(
        res,
        200,
        "Referral deleted successfullyy!",
        deleteReferral
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllReferral = async (req, res) => {
  try {
    const { pageNo = 1, status, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);

    const totalCount = await Referral.countDocuments(filter);
    const data = await Referral.find(filter)
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
      `Referral found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};


exports.updateReferral = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Referral Id is required");
    }

    const { error } = validations.editReferralSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateReferral = await Referral.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateReferral) {
      return responseHandler(
        res,
        200,
        `Referral updated successfully..!`,
        updateReferral
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
  
  