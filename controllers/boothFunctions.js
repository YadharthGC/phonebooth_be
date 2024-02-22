const uniqid = require("uniqid");
const { MongoClient, ObjectId, ChangeStream } = require("mongodb");
const mongodb = require("mongodb");
const url =
  "mongodb+srv://ganeshyadharth:1234567890@cluster0.4wj2m14.mongodb.net/?retryWrites=true&w=majority";

exports.handleSetUsers = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    let postData = await db.collection("users").insertOne(req.body.dataObj);
    await client.close();
    res.json({
      status: true,
      msg: "posted succesfully",
    });
  } catch (err) {
    res.json({
      message: "receive failure",
    });
  }
};

exports.handleGetUsers = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    let getData = await db.collection("users").find({}).toArray();
    console.log(getData);
    await client.close();
    res.json({
      status: true,
      msg: getData,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleGetOneUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    let getData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    console.log(getData);
    await client.close();
    res.json({
      status: true,
      msg: getData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleDeleteUsers = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    let deleteData = await db
      .collection("users")
      .findOneAndDelete({ _id: new ObjectId(req.params.id) });
    await client.close();
    res.json({
      status: true,
      msg: "deleted success",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleSetPic = async (req, res) => {
  try {
    console.log(req.body);
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    let setData = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          inputPic: req.body.base,
        },
      }
    );
    await client.close();
    res.json({
      status: true,
      msg: "post success",
    });
  } catch (err) {
    console.log(err);
  }
};
