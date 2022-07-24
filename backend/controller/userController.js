const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHander")
const setToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require('cloudinary')

// Register
exports.createUser = catchAsyncError(async (req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const {name, email, password} = req.body 

        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        })
        const token = user.getJWTToken()
    res.status(200).json({
        success:true,
        token
    })
})

// Login
exports.userLogin= catchAsyncError(async (req,res,next)=>{
    const {email, password} = req.body

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

    const user = await User.findOne({ email }).select("+password")

    if(!user){
        return next(new ErrorHandler("Invailid User or Password"))
    }
    
    const isPasswordMatched = await user.comparePassword(password)
    

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invailid User or Password"))
    }
    setToken(user,200,res)
})

// Log Out
exports.userLogOut = catchAsyncError(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})
// Password Forgot
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({ email: req.body.email})

    if(!user){
        return next(new ErrorHandler("User Not Found",404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave:false})

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }

})
// Password Reset
exports.ressetPassword = catchAsyncError(async (req,res,next)=>{
    
    resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({resetPasswordToken, resetPasswordExpire:{$gt: Date.now()}})

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invailid or has been expired",404))
    }

    if(req.body.password !== req.body.confirmpassword){
        return next(new ErrorHandler("Password doesn't match!...",404))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    setToken(user,200,res)
})
// Get All User Details
exports.getUserDetails = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })

})
// Get Update Password
exports.updatePassword = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is inCorrect"))

    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match!..."))
    }

    user.password = req.body.newPassword

    await user.save()

    setToken(user,200,res)

})
// Update User Profie
exports.updateProfile = catchAsyncError(async (req,res,next)=>{

    const newUserdata={
        email:req.body.email,
        name:req.body.name,
    }

    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id)
        console.log(user)
        const imageid = user.avatar.public_id
        console.log(imageid)
        await cloudinary.v2.uploader.destroy(imageid)

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar)
        console.log(myCloud)
        newUserdata.avatar ={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success:true,
    })
})
// Get All Users --Admin
exports.getAllUsers = catchAsyncError(async (req, res, next)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
})
// Get Single User --Admin
exports.getSingleUser = catchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler("User Not Found ",404))
    }

    res.status(200).json({
        success:true,
        user
    })
})
// Update User Role --Admin
exports.updateUserRole = catchAsyncError(async (req,res,next)=>{

    const newUserdata={
        email:req.body.email,
        name:req.body.name,
        role:req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserdata, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success:true,
    })
})
// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist ${req.params.id}`,404))
    }

    await user.remove()

    res.status(200).json({
        message:"User Deleted Successsfully!...."
    })
})
