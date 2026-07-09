const Blog = require("../models/blog.model")
const fs = require("fs")
const path = require("path")

const blogController = {
    createBlog: async (req, res) => {
        try {

            let newBlog = new Blog({ ...req.body, owner: req.user._id })
            if (req.file) {
                newBlog.image = `/api/blog/${req.file.filename}`
            }
            await newBlog.save()
            res.send({
                message: "successfully"
            })
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    },
    showBlog: async (req, res) => {
        try {
            const blogs = await Blog.find({ owner: req.user._id })
            res.send(blogs)
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    },
    updateBlog: async (req, res) => {
        try {
            console.log(req.body);

            let blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })

            if (req.file) {
                const oldImagePath = path.join(
                    __dirname,
                    "../uploads/blog",
                    blog.image.split("/").pop()
                );
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                blog.image = `/api/blog/${req.file.filename}`
            }



            await blog.save();
            res.send()
        } catch (error) {
         console.error(error);

  
        }
    },
    deleteBlog : async(req,res)=>{
      try {
        const id = req.params.id
        const blog = Blog.findByIdAndDelete(id)
res.send()
      } catch (error) {
          res.status(500).send({
        message: error.message,
        stack: error.stack
    });
      }
    }
}

module.exports = blogController 