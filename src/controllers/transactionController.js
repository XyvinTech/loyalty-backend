const responseHandler = require("../helpers/responseHandler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
//const sendInAppNotification = require("../utils/sendInAppNotification");
const validations = require("../validations");

exports.createTransaction = async (req, res) => {
  try {
    const createTransactionValidator = validations.createTransactionSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createTransactionValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createTransactionValidator.error}`
      );
    }
    req.body.author = req.userId;
    const newTransaction = await Transaction.create(req.body);
    if (!newTransaction) {
      return responseHandler(res, 400, `Transaction creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Transaction created successfully..!`,
      newTransaction
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Transaction with this Id is required");
    }

    const findTransaction = await Transaction.findById(id);
    if (findTransaction) {
      return responseHandler(res, 200, `Transaction found successfully..!`, findTransaction);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "Transaction with this Id is required");
    }

    const deleteTransaction = await Transaction.findByIdAndDelete(id);
    if (deleteTransaction) {
      return responseHandler(
        res,
        200,
        "Transaction deleted successfullyy!",
        deleteTransaction
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllTransaction = async (req, res) => {
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
    const totalCount = await Transaction.countDocuments(filter);
    const data = await Transaction.find(filter)
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
      `Transaction found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};


exports.updateTransaction = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "transaction Id is required");
    }

    const { error } = validations.editReferralSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateTransaction) {
      return responseHandler(
        res,
        200,
        `transaction updated successfully..!`,
        updateTransaction
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
  