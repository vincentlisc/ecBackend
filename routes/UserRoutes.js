const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const UserRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const authToken = require("../Auth/token");
console.log(authToken);

UserRoutes.route("/User/register").post(async (req, res) => {
  const db_connect = dbo.getDb();
  console.log(req.body.email);

  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    type: req.body.type,
  };

  const check = await db_connect
    .collection("User")
    .findOne({ email: user.email });

  if (!check) {
    db_connect
      .collection("User")
      .insertOne(user)
      .then((result) => {
        res.json(result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
});

UserRoutes.route("/User").get(async function (req, response) {
  let db_connect = dbo.getDb();

  try {
    var records = await db_connect.collection("User").find({}).toArray();
    response.json(records);
  } catch (e) {
    console.log("An error occurred pulling the records. " + e);
  }
});

UserRoutes.route("/User/:id").get(async (req, res) => {
  const db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  const data = await db_connect.collection("User").findOne(myquery);

  if (data) {
    console.log(data);
    console.log(myquery._id);
    res.json(data);
  } else {
    console.log("data is not found");
  }
});

UserRoutes.route("/User/:id/update").post(async (req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };

  let update = {};
  let query = ["email", "password", "name", "phone"];

  for (let check of query) {
    if (req.query[check] != null && req.query[check] != undefined) {
      update[check] = req.query[check];
    }
  }

  let newvalues = {
    $set: update,
  };
  const result = await db_connect
    .collection("User")
    .findOneAndUpdate(myquery, newvalues, { returnDocument: "after" })
    .then((res) => {
      console.log(res);
      response.json(res);
    })
    .catch((err) => {
      console.log(err);
      response.json(err);
    });
});

// UserRoutes.get('/user/:id/protected', authToken, (req,res)=>{
//   res.json({ message: "This is a protected route" });
// })

module.exports = UserRoutes;
