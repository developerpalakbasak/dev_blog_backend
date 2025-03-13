
import fs from "fs/promises"
import BlogModel from "../models/BlogModels.js"
import generateUniqueSlug from "../utils/generateUniqueSlug.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import cloudinary from "../config/cloudinaryConfig.js";


// Get All Blogs
export const getAllBlogs = async (req, res) => {

    console.log("get all blogs")
    const blogs = await BlogModel.find({});
    const count = blogs.length
    res.status(200).json({
        success: true,
        count,
        blogs
    })
}


export const getSingleBlog = async (req, res) => {
    const { slug } = req.query;

    try {
        // Find the blog by slug
        const blog = await BlogModel.findOne({ slug });

        // If blog is not found, return a 404 response
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // If blog is found, return it in the response
        res.status(200).json({
            success: true,
            blog,
        });

    } catch (error) {
        console.error("Error fetching single blog:", error);

        // Send a 500 response for server errors
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



// Delete Blog
export const deleteBlog = async (req, res) => {
    const id = req.query.slug;
    console.log(id)

    try {
        const blog = await BlogModel.findById(id);
        const { image_id } = blog

        if (!blog) {
            res.status(404).json({
                success: true,
                message: "Blog not found"
            })
        } else {

            await cloudinary.uploader.destroy(image_id)
            await BlogModel.findByIdAndDelete(id);

            res.status(200).json({
                success: true,
                message: "Blog Deleted"
            })
        }


    } catch (error) {

        res.status(200).json({
            success: false,
            message: "Failed to delete",
        })
    }



}






// Create blog
export const createBlog = async (req, res) => {
    try {
        const { title, description, category, author } = req.body;

        if (!(title || description || category || author)) {
            return res.status(400).json({ error: "All field are required" });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const localFilePath = req.file.path;
        // Upload the file to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        const image_id = cloudinaryResponse.public_id

        if (!cloudinaryResponse || !cloudinaryResponse.url) {
            return res.status(500).json({ error: "Failed to upload file to Cloudinary" });
        }

        // Generate a unique slug for the blog
        const slug = await generateUniqueSlug(title);

        // Prepare blog data
        const blogData = {
            title,
            slug,
            description,
            category,
            author,
            image_id,
            image: cloudinaryResponse.url,

        };

        // Save the blog to the database
        const newBlog = await BlogModel.create(blogData);

        res.status(201).json({
            success: true,
            message: "Blog Added",
            blogData: newBlog,
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message || "Blog creation failed",
        });
    }
};
