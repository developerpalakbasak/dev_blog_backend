import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog,  } from "../controllers/blogControllers.js";
import upload from "../middleware/multer.middleware.js";


const blogrouter = express.Router();


blogrouter.route("/blogs").get(getAllBlogs)
blogrouter.route("/blog").get(getSingleBlog).post( upload.single("image"), createBlog).delete(deleteBlog)


export default blogrouter