const express = require("express")
const cookieParser = require("cookie-parser")
const app =express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const errorMiddleware = require("./middleware/error")

if(process.env.NODE_ENV!=="PRODUCTION"){
    // config
    require('dotenv').config({path:"backend/config/config.env"})
}


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")
// const paymentRoute = require("./routes/paymentRoute")

app.use("/api",productRoute)
app.use("/api",userRoute)
app.use("/api",orderRoute)

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})
app.use(errorMiddleware)

module.exports = app