const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
// get all restaurants
async function getAllRestaurants(req, response) {
  let db_connect = dbo.getDb();

  try {
    var records = await db_connect.collection("Restaurants").find({}).toArray();
    response.json(records);
  } catch (e) {
    console.log("An error occurred pulling the records. " + e);
  }
};

//register new restaurant
async function registerRestaurant(req, res)  {
  const db_connect = dbo.getDb();
  const restaurant = {
    name: req.body.name,
    location: req.body.location,
    photo: req.body.photo,
    rating: req.body.rating,
    cuisine: req.body.cuisine,
    price: req.body.price,
    description: req.body.description,
    opening: req.body.opening,
    closing: req.body.closing,
    adminEmail: req.body.adminEmail,
    readonlyEmail: req.body.readonlyEmail,
    selectedImage: req.body.selectedImage,
    adminId: req.body.adminId,
  };

  const check = await db_connect
    .collection("Restaurants")
    .findOne({ name: restaurant.name });

  if (!check) {
    db_connect
      .collection("Restaurants")
      .insertOne(restaurant)
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => console.error(err));
  }
};

// This section will help you get a single record by id
async function getRestaurantById(req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  const data = await db_connect.collection("Restaurants").findOne(myquery);

  if (data) {
    console.log(data);
    console.log(myquery._id);
    res.json(data);
  } else {
    console.log("data is not found");
  }
};

// // This section will help you create a new record.
// restaurantRoutes.route("/record/add").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myobj = {
//    name: req.body.name,
//    position: req.body.position,
//    level: req.body.level,
//  };
//  db_connect.collection("records").insertOne(myobj, function (err, res) {
//    if (err) throw err;
//    response.json(res);
//  });
// });

// This section will help you update a record by id.
async function restaurantUpdateById(req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    console.log(myquery)

    let update = {};
    let query = [
      // "name",
      // "location",
      // "photo",
      // "rating",
      // "cuisine",
      // "description",
      // "closing",
      // "opening",
      // "phone",
      // "email",
      "name",
      "location",
      "photo",
      "rating",
      "cuisine",
      "price",
      "description",
      "opening",
      "closing",
      "phone",
      "adminEmail",
      "readonlyEmail",
      "selectedImage",
      "adminId",
      "availability"
    ];

    for (let check of query) {
      if (req.query[check] != null && req.query[check] != undefined) {
        update[check] = req.query[check];
      }
    }

    let newvalues = {
      $set: update,
    };
    const result = await db_connect
      .collection("Restaurants")
      .findOneAndUpdate(myquery, newvalues, { returnDocument: "after" })
      .then((res) => {
        console.log(res);
        response.json(res);
      })
      .catch((err) => {
        console.log(err);
        response.json(err);
      });
  };

// This section will help you delete a record
async function restaurantDeleteById(req, response)  {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    db_connect
      .collection("Restaurants")
      .findOneAndDelete(myquery, function (err, res) {
        if (err) {
          console.log(err);
        } else if (res.ok && res.value) {
          console.log("Deleted Record : ", res);
          response.json("Deleted Record : ", res);
        } else {
          console.log(`Data is not found`);
        }
      });
  };

    async function updateRestaurantAvailability(restaurantId, peopleCount) {
    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(restaurantId) };
    const updateDoc = {
        $inc: { "availability": -peopleCount }
    };

    return db_connect.collection("Restaurants").updateOne(myquery, updateDoc);
}

module.exports = {getAllRestaurants, getRestaurantById, registerRestaurant, restaurantUpdateById, restaurantDeleteById, updateRestaurantAvailability};