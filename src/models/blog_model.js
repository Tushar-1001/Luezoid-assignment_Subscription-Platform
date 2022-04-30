import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogTitle : {type : String , required : true },
    blogDescription : {type : String , required : true },
    blogData : {type : String , required : true },
})

export default mongoose.model('Blog_detail' , blogSchema)