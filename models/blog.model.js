   const { required } = require("joi")
const mongoose= require("mongoose")
   const schema = mongoose.Schema

   

   const blogSchema= new schema({
    title:{
        type:String ,
        trim : true ,
        required : true 
    },
    content :{
          type:String ,
        trim : true ,
        required : true 
    },
    image:{
          type:String ,
        trim : true ,
        required : true 
    },
    date:{
          type:String ,
        trim : true ,
        default : Date.now
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref:"user",
        required:false
    }
   })



   const Blog = mongoose.model("blog",blogSchema)
   module.exports = Blog