const { DitePlanModel } = require("../../models/DitePlanModel");
const { StoreModel } = require("../../models/Store");

let addDite = async (req, res) => {
  let insertObj = { ...req.body };
  let obj;

  if (req.file) {
    insertObj["image"] = req.file.path;
  }

  try {
    let data = await DitePlanModel.insertOne(insertObj);
    obj = {
      status: 1,
      msg: "Product Saved",
      data,
    };
  } catch (error) {
    obj = {
      status: 0,
      msg: "Product Not Saved",
      error,
    };
  }

  res.send(obj);
};

let viewDite = async (req, res) => {
  const data = await DitePlanModel.find();
  res.send({ status: 1, data, msg: "Dites" });
};

let singleDite = async (req, res) => {
  let { id } = req.params;
  const data = await DitePlanModel.find({ _id: id });
  res.send({ status: 1, data, msg: "Single Dite" });
};

let deleteDite = async (req, res) => {
  let { id } = req.params;
  const data = await DitePlanModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Product Dite Plan" });
};

let updateDite = async (req, res) => {
  let insertObj = { ...req.body };
  let { id } = req.params;
  if (req.file) {
    insertObj["image"] = req.file.path;
  }
  try {
    const data = await DitePlanModel.updateOne(
      { _id: id },
      {
        $set: insertObj,
      }
    );
    res.send({ status: 1, data, msg: "Dite Plan Updated" });
  } catch (error) {
    res.send({ status: 0, msg: "Dite Plan Not Updated" });
  }
};

module.exports = {
  addDite,
  viewDite,
  singleDite,
  deleteDite,
  updateDite,
};
