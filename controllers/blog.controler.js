const Blog = require("../models/blog.model")



const blogController ={
    createBlog: async (req,res)=>{
        try {
            
            let newBlog = new Blog({...req.body, owner : req.user._id})
             if (req.file)
             {
                newBlog.image = `/api/blog/${req.file.filename }`
             }
             await newBlog.save()
             res.send({
                message:"successfully"
             })
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    },
    showBlog: async (req,res)=>{
        try {
            const blogs = await Blog.find({owner:req.user._id})
            res.send(blogs) 
        } catch (error) {
            
        }
    },
    updateBlog: async (req,res)=>{
      try {
        
      } catch (error) {
        
      }
    }
}

module.exports = blogController