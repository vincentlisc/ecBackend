const express = require("express");
const dbo = require("../db/conn");
const login = express.Router();
const jwt = require("jsonwebtoken");
// console.log(__dirname)
// console.log(process.env.ACCESS_TOKEN_SECRET)
require("dotenv").config({ path: "./token.env" });
const ObjectId = require("mongodb").ObjectId;

login.post("/diner/login", async (req, res) => {
  try {
    const dinerEmail = req.body.email;
    const dinerPwd = req.body.password;
    const db = dbo.getDb();

    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(dinerPwd,salt);

    const check = await db
      .collection("User")
      .findOne({ email: dinerEmail, password: dinerPwd });

    console.log(check._id);

    if (check) {
      console.log("Login Successful!");
      const accToken = jwt.sign(
        { email: dinerEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const refToken = jwt.sign(
        { email: dinerEmail },
        process.env.REFRESH_TOKEN_SECRET
      );
      res.json({
        message: "Logged in successfully",
        accessToken: accToken,
        refreshToken: refToken,
        id: check._id,
      });
    } else {
      console.log("Failed to Log in");
    }
  } catch (e) {
    console.error(e);
  }
});

// module.exports = {login, authToken};

module.exports = login;
