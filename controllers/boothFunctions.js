const uniqid = require("uniqid");
const { MongoClient, ObjectId, ChangeStream } = require("mongodb");
const mongodb = require("mongodb");
const url =
  "mongodb+srv://ganeshyadharth:1234567890@cluster0.4wj2m14.mongodb.net/?retryWrites=true&w=majority";
const nodemailer = require("nodemailer");

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
    await client.close();
    res.json({
      status: true,
      msg: getData,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: false,
    });
  }
};
exports.handleGetOneUser = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    let getData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    res.json({
      status: true,
      msg: getData,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: false,
    });
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
    res.json({
      message: false,
    });
  }
};

exports.handleSetPic = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    console.log(req.body.dataObj.token, req.params.id);
    let setData = await db.collection("users").findOneAndUpdate(
      { token: req.body.dataObj.token },
      {
        $set: {
          inputPic: req.body.dataObj.inputPic,
        },
      }
    );
    console.log(req.body.dataObj);
    let setDataB = await db.collection("updates").insertOne(req.body.dataObj);
    await client.close();
    res.json({
      status: true,
      msg: "post success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: false,
    });
  }
};
exports.handleGetAIpic = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    console.log(req.params.token);
    let getDataB = await db.collection("updates").findOne({
      token: req.params.token,
    });
    console.log(getDataB);
    await client.close();
    res.json({
      status: getDataB?.outputPic ? true : false,
      msg: getDataB?.outputPic ? getDataB.outputPic : "",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: false,
    });
  }
};
exports.handleDeleteAI = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    console.log(req.params);
    let getDataB = await db.collection("updates").findOneAndUpdate(
      {
        token: req.params.token,
      },
      {
        $unset: { outputPic: 1 },
      }
    );
    // console.log(getDataB);
    await client.close();
    res.json({
      msg: "delete succes",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: false,
    });
  }
};
//foyk zcum ybpa meuq
exports.handleSend = async (req, res) => {
  try {
    console.log(req.params.token);
    ////
    const client = await MongoClient.connect(url);
    const db = client.db("booth");
    let getData = await db
      .collection("updates")
      .findOne({ token: req.params.token });
    await client.close();

    ///////
    console.log(getData);
    //nodemailer
    if (getData?.outputPic) {
      console.log("i am in");
      let transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp@.gmail.com",
        secure: false,
        auth: {
          user: "ganeshyadharth@gmail.com",
          pass: "foyk zcum ybpa meuq",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      let mailOptions = {
        from: "ganeshyadharth@gmail.com",
        to: getData.email,
        subject: `Empowering your Future`,
        text: getData.career,
        attachments: [
          {
            fileName: `${getData.name}`,
            path: getData.inputPic,
          },
        ],
      };
      console.log("mail start");
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err, "err");
        } else {
          console.log("sent");
          console.log(info.response);
          res.json({
            status: true,
            msg: "post success",
          });
        }
      });
    }
    //nodemailer
  } catch (err) {
    console.log(err);
    res.json({
      message: false,
    });
  }
};
