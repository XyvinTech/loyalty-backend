
const responseHandler = require("../helpers/responseHandler");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");
const validations = require("../validations");

exports.createUser = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("memberManagement_modify")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }

    const { error } = validations.createUserSchema.validate(req.body, {
      abortEarly: true,
    });
    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const checkExist = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (checkExist) {
      return responseHandler(
        res,
        409,
        `User with this email or phone already exists`
      );
    }
    
    const newUser = await User.create(req.body);

    if (newUser)
      return responseHandler(
        res,
        201,
        `New User created successfully..!`,
        newUser
      );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.editUser = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("memberManagement_modify")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }

    const { error } = validations.editUserSchema.validate(req.body, {
      abortEarly: true,
    });
    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }

    const findUser = await User.findById(id);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }

    const editUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!editUser) {
      return responseHandler(res, 400, `User update failed...!`);
    }
    return responseHandler(res, 200, `User updated successfullyy`, editUser);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getUser = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("memberManagement_view")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }

    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }

    const findUser = await User.findById(id);
    if (findUser) {
      return responseHandler(res, 200, `User found successfully..!`, findUser);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }

    const findUser = await User.findById(id);
    if (findUser) {
      return responseHandler(res, 200, `User found successfully..!`, findUser);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("memberManagement_modify")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }

    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }

    const findUser = await User.findById(id);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }

    const deleteUser = await User.findByIdAndUpdate(
      id,
      { status: "deleted" },
      {
        new: true,
      }
    );
    if (deleteUser) {
      return responseHandler(res, 200, `User deleted successfullyy..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { error } = validations.updateUserSchema.validate(req.body, {
      abortEarly: true,
    });
    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const id = req.userId;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }

    const findUser = await User.findById(id);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }

    const editUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!editUser) {
      return responseHandler(res, 400, `User update failed...!`);
    }
    return responseHandler(res, 200, `User updated successfullyy`, editUser);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // const check = await checkAccess(req.roleId, "permissions");
    // if (!check || !check.includes("memberManagement_view")) {
    //   return responseHandler(
    //     res,
    //     403,
    //     "You don't have permission to perform this action"
    //   );
    // }
    const { pageNo = 1, fullUser, limit = 10, search } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (search) {
      filter.$or = [
        { status: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { "name.first": { $regex: search, $options: "i" } },
        { "name.middle": { $regex: search, $options: "i" } },
        { "name.last": { $regex: search, $options: "i" } },
      ];
    }

    if (!fullUser) {
      const totalCount = await User.countDocuments(filter);
      const data = await User.find(filter)
        .skip(skipCount)
        .limit(limit)
        .sort({ createdAt: -1, _id: 1 })
        .lean();

      const mappedData = data.map((user) => {
        return {
          ...user,
          fullName: `${user.name?.first || ""} ${user.name?.middle || ""} ${
            user.name?.last || ""
          }`.trim(),
        };
      });

      return responseHandler(
        res,
        200,
        `Users found successfully..!`,
        mappedData,
        totalCount
      );
    } else {
      const totalCount = await User.countDocuments();
      const data = await User.find()
        .populate("college course")
        .sort({ createdAt: -1, _id: 1 })
        .lean();

      const csvData = data.map((user) => {
        return {
          Name: `${user?.name?.first} ${user?.name?.middle || ""} ${
            user?.name?.last || ""
          }`.trim(),
          //    MembershipID: user.memberId,
          Email: user.email,
          Mobile: user.phone,
          College: user.college?.collegeName,
        };
      });
      const headers = [
        //  { header: "Membership ID", key: "MembershipID" },
        { header: "Name", key: "Name" },
        { header: "Email", key: "Email" },
        { header: "Mobile", key: "Mobile" },
      ];

      return responseHandler(
        res,
        200,
        `Users found successfully..!`,
        {
          csvData,
          headers,
        },
        totalCount
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

// exports.fetchUser = async (req, res) => {
//   try {
//     const id = req.userId;
//     if (!id) {
//       return responseHandler(res, 400, "User ID is required");
//     }

//     const findUser = await User.findById(id).populate("college course").lean();

//     if (findUser) {
//       // Fields to consider for profile completion
//       const fieldsToCheck = [
//         findUser.name?.first,
//         findUser.name?.middle,
//         findUser.name?.last,
//         findUser.college,
//         findUser.course,
//         findUser.batch,
//         findUser.role,
//         findUser.image,
//         findUser.email,
//         findUser.phone,
//         findUser.bio,
//         findUser.address,
//         findUser.company?.name,
//         findUser.company?.designation,
//         findUser.company?.phone,
//         findUser.company?.address,
//         ...(findUser.social?.map((link) => link.name) || []),
//         ...(findUser.social?.map((link) => link.link) || []),
//         ...(findUser.websites?.map((link) => link.name) || []),
//         ...(findUser.websites?.map((link) => link.link) || []),
//         ...(findUser.awards?.map((award) => award.name) || []),
//         ...(findUser.awards?.map((award) => award.image) || []),
//         ...(findUser.awards?.map((award) => award.authority) || []),
//         ...(findUser.videos?.map((video) => video.name) || []),
//         ...(findUser.videos?.map((video) => video.link) || []),
//         ...(findUser.certificates?.map((cert) => cert.name) || []),
//         ...(findUser.certificates?.map((cert) => cert.link) || []),
//       ];

//       // Calculate the number of non-empty fields
//       const filledFields = fieldsToCheck.filter((field) => field).length;

//       // Calculate the profile completion percentage
//       const totalFields = fieldsToCheck.length;
//       const profileCompletionPercentage = Math.round(
//         (filledFields / totalFields) * 100
//       );

//       findUser.profileCompletion = `${profileCompletionPercentage}%`;

//       return responseHandler(res, 200, "User found successfullyy..!", findUser);
//     } else {
//       return responseHandler(res, 404, "User not found");
//     }
//   } catch (error) {
//     return responseHandler(res, 500, `Internal Server Error: ${error.message}`);
//   }
// };

exports.loginUser = async (req, res) => {
  try {
    const id = req.body.clientToken;
    const { fcm } = req.body;
    if (!id) {
      return responseHandler(res, 400, "Client Token is required");
    }
    let user;
    admin
      .auth()
      .verifyIdToken(id)
      .then(async (decodedToken) => {
        user = await User.findOne({ phone: decodedToken.phone_number });
        if (!user) {
          const uniqueMemberId = await generateUniqueDigit();
          const newUser = await User.create({
            uid: decodedToken.uid,
            phone: decodedToken.phone_number,
          //  memberId: `LOYALTY-${uniqueMemberId}`,
            fcm,
          });
          const token = generateToken(newUser._id);
          return responseHandler(
            res,
            200,
            "User logged in successfullyy",
            token
          );
        } else if (user.uid !== null) {
          user.fcm = fcm;
          user.save();
          const token = generateToken(user._id);
          return responseHandler(
            res,
            200,
            "User logged in successfullyy",
            token
          );
        } else {
          user.uid = decodedToken.uid;
          user.fcm = fcm;
          user.save();
          const token = generateToken(user._id);
          return responseHandler(
            res,
            200,
            "User logged in successfullyy",
            token
          );
        }
      });
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error: ${error.message}`);
  }
};

exports.getVersion = async (req, res) => {
  try {
    const settings = await Setting.findOne();

    return responseHandler(
      res,
      200,
      "App version fetched successfullyy",
      settings
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error: ${error.message}`);
  }
};

exports.getApprovals = async (req, res) => {
  try {
    const { userId } = req;
    const findUser = await User.findById(userId);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }

    if (findUser.role === "member") {
      return responseHandler(
        res,
        403,
        "You don't have permission to perform this action"
      );
    }
    const { pageNo = 1, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = { status: "inactive", college: findUser.college };
    const totalCount = await User.countDocuments(filter);
    const data = await User.find(filter)
      .populate("college course")
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();
    return responseHandler(
      res,
      200,
      `Approvals found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.approveUser = async (req, res) => {
  try {
    const { userId } = req;
    const fetchUser = await User.findById(userId);
    if (!fetchUser) {
      return responseHandler(res, 404, "User not found");
    }

    if (fetchUser.role === "member") {
      return responseHandler(
        res,
        403,
        "You don't have permission to perform this action"
      );
    }
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }
    const findUser = await User.findById(id);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }
    const editUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    let message;

    if (status === "awaiting_payment") {
      message = {
        notification: {
          title: `AKCAF Membership has been approved`,
          body: `Your membership for AKCAF has been approved successfullyy. Please complete the payment process to continue.`,
        },
        token: findUser.fcm,
      };
    } else {
      message = {
        notification: {
          title: `AKCAF Membership has been rejected`,
          body: `Your membership for AKCAF has been rejected, because of ${req.body.reason}.`,
        },
        token: findUser.fcm,
      };
    }

    getMessaging()
      .send(message)
      .then((response) => {
        console.log("successfullyy sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });

    if (!editUser) {
      return responseHandler(res, 400, `User update failed...!`);
    }
    return responseHandler(res, 200, `User ${status} successfullyy`);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.listUsers = async (req, res) => {
  try {
    const { pageNo = 1, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const currentUser = await User.findById(req.userId).select("blockedUsers");
    const blockedUsersList = currentUser.blockedUsers;
    const filter = {
      status: { $in: ["active", "awaiting_payment"] },
      _id: {
        $ne: req.userId,
        $nin: blockedUsersList,
      },
    };
    const totalCount = await User.countDocuments(filter);
    const data = await User.find(filter)
      .populate("college course")
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Users found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { pageNo = 1, limit = 10, status } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (status) {
      filter.status = status;
    }
    const totalCount = await User.countDocuments(filter);
    const data = await User.find(filter)
      .populate("college course")
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Users found successfully..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }

    const findUser = await User.findById(req.userId);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }

    if (findUser.blockedUsers.includes(id)) {
      return responseHandler(res, 400, "User is already blocked");
    }

    findUser.blockedUsers.push(id);
    const editUser = await findUser.save();
    if (!editUser) {
      return responseHandler(res, 400, `User block failed...!`);
    }
    return responseHandler(res, 200, `User blocked successfullyy`);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error: ${error.message}`);
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }

    const findUser = await User.findById(req.userId);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }
    findUser.blockedUsers = findUser.blockedUsers.filter(
      (user) => user.toString() !== id
    );
    const editUser = await findUser.save();
    if (!editUser) {
      return responseHandler(res, 400, `User unblock failed...!`);
    }
    return responseHandler(res, 200, `User unblocked successfullyy`);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.adminUserBlock = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }
    const findUser = await User.findById(id);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }

    if (findUser.blockedUsers.includes(id)) {
      return responseHandler(res, 400, "User is already blocked");
    }

    const editUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { status: "blocked" },
      },
      { new: true }
    );
    if (!editUser) {
      return responseHandler(res, 400, `User update failed...!`);
    }
    return responseHandler(res, 200, `User blocked successfullyy`);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.adminUserUnblock = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, "User ID is required");
    }
    const findUser = await User.findById(id);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }
    const editUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { status: "active" },
      },
      { new: true }
    );
    if (!editUser) {
      return responseHandler(res, 400, `User update failed...!`);
    }
    return responseHandler(res, 200, `User unblocked successfullyy`);
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.requestNFC = async (req, res) => {
  try {
    const { userId } = req;
    const findUser = await User.findById(userId);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
    }

    const fullName = `${findUser.name.first} ${findUser.name.middle} ${findUser.name.last}`;

    const data = {
      from: findUser.email,
      subject: `Request for NFC from ${fullName}`,
      text: `Hi from ${fullName} with AKCAF member ID ${findUser.memberId},\n\n
        I would like to request for NFC. Please contact me on ${findUser.phone} or email me at ${findUser.email}.\n
        Thank you.
        `,
    };

    await sendSelfMail(data);

    return responseHandler(res, 200, "NFC Request sent successfullyy");
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
