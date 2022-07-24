import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducers/cartReducer.js'
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer.js'
import { productDetailsReducer, productsReducer, newReviewReducer, newProductReducer, productReducer,
        reviewReducer, productReviewsReducer } from './reducers/productReducer.js'
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer.js'

export default configureStore({
  reducer: {
    // products:productsReducer,
    // productDetails:productDetailsReducer,
    // user: userReducer,
    // profile: profileReducer,
    // forgotPassword:forgotPasswordReducer,
    // cart:cartReducer,
    // newOrder: newOrderReducer,
    // myOrders: myOrdersReducer,
    // orderDetails: orderDetailsReducer,
    // newReview: newReviewReducer,
    // allOrders: allOrdersReducer,
    // order:orderReducer,
    // allUsers: allUsersReducer,
    // newProduct: newProductReducer,
    // product: productReducer,
  
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
  

  },
})