import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import customerModel from "../../models/Customer/Customer.js";
import driverModel from "../../models/Driver/Driver.js";

const router = express.Router();

//check duplicate, hash
router.post("/registercustomer", async (req, res) => {
  try {
    let customerData = req.body;
    let customerEmail = customerData.email;
    //checking duplicate
    let checkDuplicates = await customerModel.findOne({ email: customerEmail });
    if (checkDuplicates) {
      return res.status(400).json({ msg: "Customer already exists." });
    }
    let hash = await bcrypt.hash(customerData.password, 10);
    customerData.password = hash;
    await customerModel.create(customerData);
    res.status(200).json({ msg: "Customer registered with Uber! Welcome 👋" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

//jwt idhar aata

router.post("/logincustomer", async (req, res) => {
  try {
    let userData = req.body;
    let userEmail = userData.email;
    let checkUser = await customerModel.findOne({ email: userEmail });
    let secretKey = config.get("SECRET_KEY");
    let sendtoken = jwt.sign({ checkUser }, secretKey, { expiresIn: "1h" });
    if (!checkUser) {
      return res.status(400).json({ msg: "This customer does not exist!" });
    }
    let hashPass = checkUser.password;
    let checkPass = await bcrypt.compare(userData.password, hashPass);
    console.log(checkPass);
    if (checkPass) {
      return res
        .status(200)
        .json({ msg: "Customer logged in succesfully!", token: sendtoken });
    } else {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

//register driver
router.post("/registerdriver", async (req, res) => {
  try {
    let driverData = req.body;
    let driverEmail = driverData.email;
    //checking duplicates
    let checkDriver = await driverModel.findOne({ email: driverEmail });
    if (checkDriver) {
      return res.status(400).json({ msg: "Driver already exists!" });
    }
    let hash = await bcrypt.hash(driverData.password, 10);
    driverData.password = hash;
    await driverModel.create(driverData);
    res.status(200).json({ msg: "Driver registered! Hello from Uber 🫡" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

//api to login driver

router.post("/logindriver", async (req, res) => {
  try {
    let userData = req.body;
    let userEmail = userData.email;
    let checkUser = await driverModel.findOne({ email: userEmail });
    if (!checkUser) {
      return res.status(400).json({ msg: "Driver does not exist" });
    }
    let hashPass = checkUser.password;
    let checkPass = await bcrypt.compare(userData.password, hashPass);
    if (checkPass) {
      return res.status(200).json({ msg: "Logged in succesfully!" });
    } else {
      return res.status(400).json({ msg: "Invalid credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
