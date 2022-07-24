const catchAsyncError = require("../middleware/catchAsyncError")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHander")

// Create New Order
exports.newOrder = catchAsyncError( async (req,res,next)=>{

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shipingPrice,
        totalPrice
    } = req.body
    
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shipingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        order,
    })

})

// Get Single Order
exports.getSingleOrder = catchAsyncError( async (req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with selected id!..."))
    }

    res.status(200).json({
        success:true,
        order
    })
})

// My Orders
exports.myOrder = catchAsyncError( async (req,res,next)=>{
    const orders = await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders
    })
})

// Get All Orders -- Admin
exports.getAllOrders = catchAsyncError( async (req,res,next)=>{
    const orders = await Order.find()

    if(!orders){
        return next(new ErrorHandler("Don't Have Any Order"))
    }

    let totalAmount = 0 ;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})


// Get Update Order Status -- Admin
exports.updateOrder = catchAsyncError( async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order Already Has Been Delivered!..."))
    }

    order.orderItems.forEach( async (o)=>{
        await updateStock(o.product, o.quantity)
    })

    order.orderStatus=req.body.status

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,

    })

})

async function updateStock(id, quantity){

    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save({validateBeforeSave:false})

}


// Get Delete -- Admin
exports.deleteOrder = catchAsyncError( async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Don't Have Any Order"))
    }

    await order.remove()
    res.status(200).json({
        success:true,
    })
})