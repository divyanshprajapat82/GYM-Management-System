const { StoreModel } = require("../../models/Store");

let addProduct = async (req, res) => {
  let insertObj = { ...req.body };
  let obj;

  if (req.file) {
    insertObj["image"] = req.file.path;
  }

  try {
    let data = await StoreModel.insertOne(insertObj);
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

let viewProduct = async (req, res) => {
  const data = await StoreModel.find();
  res.send({ status: 1, data, msg: "Products" });
};

let singleproduct = async (req, res) => {
  let { id } = req.params;
  const data = await StoreModel.find({ _id: id });
  res.send({ status: 1, data, msg: "Single Product" });
};

let deleteproduct = async (req, res) => {
  let { id } = req.params;
  const data = await StoreModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Product Deleted" });
};

let updateproduct = async (req, res) => {
  let insertObj = { ...req.body };
  let { id } = req.params;
  if (req.file) {
    insertObj["image"] = req.file.path;
  }
  try {
    const data = await StoreModel.updateOne(
      { _id: id },
      {
        $set: insertObj,
      }
    );
    res.send({ status: 1, data, msg: "Product Updated" });
  } catch (error) {
    res.send({ status: 0, msg: "Product Not Updated" });
  }
};

module.exports = {
  addProduct,
  viewProduct,
  singleproduct,
  deleteproduct,
  updateproduct,
};
