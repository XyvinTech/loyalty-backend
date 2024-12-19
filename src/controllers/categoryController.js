// const moment = require("moment-timezone");
const responseHandler = require("../helpers/responseHandler");
const Category = require("../models/categoryModel");
const validations = require("../validations");
const checkAccess = require("../helpers/checkAccess");

exports.createCategory = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("brandManagement_modify")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }
    const createCategoryValidator = validations.createCategorySchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createCategoryValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createCategoryValidator.error}`
      );
    }

    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      return responseHandler(res, 400, `category creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New category created successfullyy..!`,
      newCategory
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getCategory = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("promotionManagement_view")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "category with this Id is required");
    }

    const findCategory = await Category.findById(id);
    if (findCategory) {
      return responseHandler(
        res,
        200,
        `category found successfully..!`,
        findCategory
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("promotionManagement_modify")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "category Id is required");
    }

    const { error } = validations.editCategorySchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateCategory) {
      return responseHandler(
        res,
        200,
        `Category updated successfully..!`,
        updateCategory
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("promotionManagement_modify")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Category Id is required");
    }

    const deleteCategory = await Category.findByIdAndDelete(id);
    if (deleteCategory) {
      return responseHandler(res, 200, `Category deleted successfully..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("promotionManagement_view")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }
    const { pageNo = 1, status, type, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (type) {
      filter.type = type;
    }
    const totalCount = await Category.countDocuments(filter);
    const data = await Category.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Category found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const filter = {};
    const today = moment().toISOString();
    filter.endDate = {
      $gte: today,
    };
    filter.startDate = {
      $lte: today,
    };
    const data = await Category.find(filter).sort({ createdAt: -1 }).lean();

    return responseHandler(res, 200, `Category found successfully..!`, data);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};