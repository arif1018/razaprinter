const app = require("./app")
const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database")

process.on("uncaughtException",(err)=>{
    console.log(err.message)
    console.log("Shutting Down Server due to uncaught Exception")
    process.exit(1)
})

if(process.env.NODE_ENV!=="PRODUCTION"){
// config
require('dotenv').config({path:"backend/config/config.env"})

}
// Test Here
// Connecting to  Database
connectDatabase()

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// UnHandled Error
process.on("unhandledRejection",(err)=>{
    console.log(`Error ${err.message}`)
    console.log("Shutting Down Server due to Unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1)
    })
})