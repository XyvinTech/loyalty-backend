// const moment = require("moment-timezone");
const responseHandler = require("../helpers/responseHandler");
const Brand = require("../models/brandModel");
const validations = require("../validations");
const checkAccess = require("../helpers/checkAccess");

exports.createBrand = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("brandManagement_modify")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }
    const createBrandValidator = validations.createBrandSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createBrandValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createBrandValidator.error}`
      );
    }

    const newBrand = await Brand.create(req.body);
    if (!newBrand) {
      return responseHandler(res, 400, `brand creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Brand created successfullyy..!`,
      newBrand
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getBrand = async (req, res) => {
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
      return responseHandler(res, 400, "brand with this Id is required");
    }

    const findBrand = await Brand.findById(id);
    if (findBrand) {
      return responseHandler(
        res,
        200,
        `brand found successfully..!`,
        findBrand
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const check = await checkAccess(req.roleId, "permissions");
    if (!check || !check.includes("brandManagement_modify")) {
      return responseHandler(
        res,
        403,
        "You don't have permission to perform this action"
      );
    }
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Brand Id is required");
    }

    const { error } = validations.editBrandSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateBrand) {
      return responseHandler(
        res,
        200,
        `brand updated successfully..!`,
        updateBrand
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const check = await checkAccess(req.roleId, "permissions");
    if (!check || !check.includes("brandManagement_modify")) {
      return responseHandler(
        res,
        403,
        "You don't have permission to perform this action"
      );
    }
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Brand Id is required");
    }

    const deleteBrand = await Brand.findByIdAndDelete(id);
    if (deleteBrand) {
      return responseHandler(res, 200, `brand deleted successfully..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllBrand = async (req, res) => {
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
    const totalCount = await Brand.countDocuments(filter);
    const data = await Brand.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Brand found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllBrand = async (req, res) => {
  try {
    const filter = {};
    const today = moment().toISOString();
    filter.endDate = {
      $gte: today,
    };
    filter.startDate = {
      $lte: today,
    };
    const data = await Brand.find(filter).sort({ createdAt: -1 }).lean();

    return responseHandler(res, 200, `Brands found successfully..!`, data);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};