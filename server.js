const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const  routes = require("./routes")
const cookieParser = require("cookie-parser")
const cors = require('cors')
require("dotenv").config()

app.use(cors({
    origin :"http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api",routes)
const URL = process.env.DB_CONNECTION_URL
console.log(URL);


mongoose.connect(URL).then(()=>{
    console.log("data base is connected");
    
}).catch((err)=>{
    console.log(err);
    
})

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`the server is running on port  ${PORT}`);
    
})