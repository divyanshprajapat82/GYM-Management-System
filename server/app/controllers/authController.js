const { AuthModel } = require("../models/AuthModel");
let jwt = require("jsonwebtoken");

let addUser = async (req, res) => {
  // console.log(req.body);
  let { userName, userEmail, userType, membership } = req.body;

  let resObj;

  let emailfind = await AuthModel.findOne({ userEmail });

  if (!emailfind) {
    try {
      let obj = {
        userName,
        userEmail,
        userType,
        membership,
      };

      let data = await AuthModel.insertOne(obj);

      resObj = {
        status: 1,
        data,
        msg: "User Added !",
      };
    } catch (error) {
      resObj = {
        status: 0,
        msg: "Error processing request",
        error: error.message,
      };
    }
  } else {
    resObj = {
      status: 0,
      msg: "Email is aleardy existe",
    };
  }

  res.send(resObj);
  // console.log(resObj);
};

let register = async (req, res) => {
  let { userName, userEmail, userPassword, userType } = req.body;

  let resObj;

  try {
    // Using upsert: true to update if exists, create if not
    let user = await AuthModel.findOneAndUpdate(
      { userEmail }, // Find by email
      {
        $set: {
          userName,
          userPassword,
          // userType: userType || "user"
          userType: userType || "member",
        },
      }
      // {
      //     new: true,           // Return the updated document
      //     upsert: true,        // Create if doesn't exist
      //     runValidators: true, // Run schema validations
      //     setDefaultsOnInsert: true // Set default values on insert
      // }
    );

    // Determine if it was created or updated
    let isNewUser =
      user.createdAt &&
      user.updatedAt &&
      user.createdAt.getTime() === user.updatedAt.getTime();

    let token = jwt.sign(
      { id: user._id, role: user.userType },
      process.env.TOKENKEY
    );
    console.log(token);

    resObj = {
      status: 1,
      msg: isNewUser
        ? "User created successfully"
        : "User updated successfully",
      // msg: "You are Registered!",
      token,
      user,
    };
  } catch (err) {
    resObj = {
      status: 0,
      msg: "Error processing request",
      error: err.message,
    };
  }
  res.send(resObj);
};

let login = async (req, res) => {
  try {
    const { userEmail, userPassword, userType } = req.body;
    if (!userEmail || !userPassword) {
      return res
        .status(400)
        .send({ status: 0, msg: "Email and password required" });
    }

    const user = await AuthModel.findOne({ userEmail, userPassword }); // Replace with bcrypt compare
    if (!user) {
      return res
        .status(401)
        .send({ status: 0, msg: "Invalid username or password" });
    }

    let token = jwt.sign(
      { id: user._id, role: user.userType },
      process.env.TOKENKEY
    );

    console.log(token);

    const role = await AuthModel.find({ userEmail }).select("userType"); // Replace with bcrypt compare

    return res.send({ status: 1, role, token, msg: "Logged In" });
  } catch (err) {
    return res.status(500).send({ status: 0, msg: err.message });
  }
};

let loginView = async (req, res) => {
  const data = await AuthModel.find().select("-userPassword");
  res.send({ status: 1, data, msg: "Users" });
};

let profileView = async (req, res) => {
  const userId = req.userId;
  const data = await AuthModel.findById(userId).select("-userPassword");
  res.send({ status: 1, data, msg: "Users" });
};

let singleView = async (req, res) => {
  let { id } = req.params;
  const data = await AuthModel.find({ _id: id }).select("-userPassword");
  res.send({ status: 1, data, msg: "Single User" });
};

let deleteUser = async (req, res) => {
  let { id } = req.params;
  // let { userName, userEmail, membership } = req.body;
  const data = await AuthModel.deleteOne({ _id: id });
  // const data = await AuthModel.updateOne(
  //   { _id: id },
  //   {
  //     $set: {
  //       userName,
  //       userEmail,
  //       membership,
  //     },
  //   }
  // );
  res.send({ status: 1, data, msg: "User Deleted" });
};

let updateUser = async (req, res) => {
  let { id } = req.params;
  let { userName, userEmail, membership } = req.body;
  const data = await AuthModel.updateOne(
    { _id: id },
    {
      $set: {
        userName,
        userEmail,
        membership,
      },
    }
  );
  res.send({ status: 1, data, msg: "Updated" });
};

module.exports = {
  addUser,
  login,
  loginView,
  profileView,
  register,
  singleView,
  deleteUser,
  updateUser,
};
