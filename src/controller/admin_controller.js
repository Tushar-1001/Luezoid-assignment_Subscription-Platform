import admin_model from "../models/admin_model.js";
import {is_Valid_RequestBody, is_Valid_String} from "../validators/validator.js";

export const registerAdmin = async (req, res) => {
  try {
    const { adminName, email, password } = req.body;

    if (!is_Valid_RequestBody(req.body)) {
      return res.staus(400).send("Provide valid request body.");
    }
    if (!is_Valid_String(adminName)) {
      return res.staus(400).send("Provide valid adminName.");
    }
    if (!is_Valid_String(email)) {
      return res.staus(400).send("Provide valid email.");
    }
    if (!is_Valid_String(password)) {
      return res.staus(400).send("Provide valid password.");
    }

    //Checking wheather email is already used or not.
    const emailAlreadyUsed = await admin_model.findOne({ email });
    if (emailAlreadyUsed) {
      return res.status(400).send(`${email} is already used.`);
    }

    //Email validation using regex

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return res.status(400).send("Invalid email id.");

    const adminDetails = await admin_model.create({
      adminName,
      email,
      password,
    });

    return res.status(200).send(`Congrats ${adminName}. You are now successfully registered.`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    

    if (!is_Valid_RequestBody(req.body)) {
      return res.staus(400).send("Provide valid request body.");
    }

    if (!is_Valid_String(email)) {
      return res.staus(400).send("Provide valid email.");
    }
    if (!is_Valid_String(password)) {
      return res.staus(400).send("Provide valid password.");
    }

     //Email validation using regex

     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
     return res.status(400).send("Invalid email id.");

    const findAdmin = await admin_model.findOne({ email });

   
    if (!findAdmin) {
      return res.status(400).send("Admin not found");
    }

    if (findAdmin.password != password) {
      return res.status(400).send("wrong password");
    }

    return res.status(200).send(`Login successfull. Welcome ${findAdmin.adminName}, you can now post articles.`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
