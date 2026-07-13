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
            res.status(500).send({
                message: error.message,
                stack: error.stack
            });

        }
    },
    deleteBlog: async (req, res) => {
        try {
            const id = await req.params.id
          const blog = await Blog.findById(id);
               if (!blog) {
                return res.status(404).send({
                    message: "Blog not found"
                });
            }

          if (blog.image) {
            const imagePath = path.join(
                __dirname,
                "../uploads/blog",
                blog.image.split("/").pop()
            );

            fs.unlink(imagePath, (err) => {
                if (err) console.log(err);
            });
        }

            const blogg = await Blog.findByIdAndDelete(id)

        res.status(200).send({
            message: "Blog deleted successfully"
        });
        } catch (error) {
            res.status(500).send({
                message: error.message,
                stack: error.stack
            });
        }
    },
    getAllBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find({}).populate("owner")
            res.send(blogs)
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    },
    // deleteBlogsAdmin: async (req, res) => {

    //     try {
    //         const blog = await Blog.findByIdAndDelete(req.params.id);

    //         if (!blog) {
    //             return res.status(404).send({
    //                 message: "Blog not found"
    //             });
    //         }

    //          if (blog.image) {
    //         const imagePath = path.join(
    //             __dirname,
    //             "../uploads/blog",
    //             blog.image.split("/").pop()
    //         );

    //         fs.unlink(imagePath, (err) => {
    //             if (err) console.log(err);
    //         });
    //     }

    //         res.status(200).send({ message: "Blog deleted successfully " })
    //     } catch (error) {
    //         res.status(500).send({
    //             message: error.message,
    //             stack: error.stack
    //         });
    //     }
    // }
}

module.exports = blogController 