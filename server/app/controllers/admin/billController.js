const { AuthModel } = require("../../models/AuthModel");
const { BillModel } = require("../../models/billModel");

let addBill = async (req, res) => {
  let { email, amount, date } = req.body;
  // console.log("req.userId =", req.userId);
  let userId = req.userId;

  let resObj;

  let emailfind = await AuthModel.findOne({ userEmail: email });

  if (emailfind) {
    try {
      let obj = {
        email,
        amount,
        date,
        userId: emailfind._id,
      };

      let data = await BillModel.insertOne(obj);

      resObj = {
        status: 1,
        data,
        msg: "Bill Added !",
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
      msg: "Email is Not existe",
    };
  }

  res.send(resObj);
};

let viewBill = async (req, res) => {
  const data = await BillModel.find();
  res.send({ status: 1, data, msg: "Bills" });
};

let deleteBill = async (req, res) => {
  let { id } = req.params;
  const data = await BillModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Bill Deleted" });
};

let memberView = async (req, res) => {
  const userId = req.userId;
  const data = await BillModel.find({ userId }).populate("userId", "userName");
  res.send({ status: 1, data, msg: "Bills" });
};

module.exports = { addBill, viewBill, deleteBill, memberView };
