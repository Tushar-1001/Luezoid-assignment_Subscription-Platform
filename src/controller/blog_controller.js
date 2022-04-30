import admin_model from "../models/admin_model.js";
import blog_model from "../models/blog_model.js";
import fs from "fs"

import { is_Valid_RequestBody, is_Valid_String } from "../validators/validator.js";

export const createBlog = async (req, res) => {
  try {

    const {blogTitle ,blogDescription , blogData } = req.body

    const adminId = req.params.adminId

    if (!is_Valid_RequestBody(req.body)) {
        return res.staus(400).json("Provide valid request body.");
      }
      if (!is_Valid_String(blogTitle)) {
        return res.staus(400).json("Provide valid blogTitle.");
      }
      if (!is_Valid_String(blogDescription)) {
        return res.staus(400).json("Provide valid blogDescription.");
      }
      if (!is_Valid_String(blogData)) {
        return res.staus(400).json("Provide valid blogData.");
      }

      const findAdmin = await admin_model.findOne({adminId})

      if(! findAdmin){
          return res.status(400).send('Admin not found')
      }

      const blogDetails = await blog_model.create(req.body)

    

    const findAllBlogs = await blog_model.find({adminId})
    // console.log(findAllBlogs)
    
    fs.writeFile ("blogDetails.json", JSON.stringify(findAllBlogs), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
   

      return res.status(200).json(blogDetails)

  } catch (error) {
    res.status(500).send(error.message);
  }
};
