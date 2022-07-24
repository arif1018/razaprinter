import "./App.css";
import Header from "./component/layout/Header/Header"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import WebFontLoader from "webfontloader"
import React from "react";
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home.js"
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from './store'
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import Test from "./component/Order/Test";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";

function App() {
  const {isAuthenticated, user}= useSelector((state) => state.user)

  React.useEffect(()=>{
    WebFontLoader.load({
      google:{
        families:["Roboto","Droid Sans","Chillanka"]
      }
    })
    store.dispatch(loadUser())
  },[])

  window.addEventListener("contextmenu",(e)=> e.preventDefault())
  return (
  <Router>
  <Header /> 
  {isAuthenticated && <UserOptions user={user} />}
    <Routes>
      <Route axact path="/" element={<Home/>}/>
      <Route axact path="/product/:id" element={<ProductDetails/>}/>
      <Route axact path="/products" element={<Products />}/>
      <Route path="/products/:keyword" element={<Products />}/>
      <Route axact path="/search" element={<Search />}/>
      <Route axact path="/login" element={<LoginSignUp />}/>
      {isAuthenticated && <Route axact path="/account" element={<Profile />} />}
      {isAuthenticated && <Route axact path="/me/update" element={<UpdateProfile />} />}
      {isAuthenticated && <Route axact path="/password/update" element={<UpdatePassword />} />}
      <Route axact path="/password/forgot" element={<ForgotPassword />}/>
      <Route axact path="/password/reset/:token" element={<ResetPassword />}/>
      <Route axact path="/cart" element={<Cart />}/>
      {isAuthenticated && <Route axact path="/login/shipping" element={<Shipping />} />}
      {isAuthenticated && <Route axact path="/order/confirm" element={<ConfirmOrder />} />}
      {isAuthenticated && <Route axact path="/process/payment" element={<Payment />} />}
      {isAuthenticated && <Route axact path="/success" element={<OrderSuccess />} />}
      {isAuthenticated && <Route axact path="/orders" element={<MyOrders />} />}
      {isAuthenticated && <Route axact path="/order/:id" element={<Test />} />}
      {isAuthenticated && <Route axact path="/admin/dashboard" element={<Dashboard />} />}
      {isAuthenticated && <Route axact path="/admin/products" element={<ProductList />} />}
      {isAuthenticated && <Route axact path="/admin/product" element={<NewProduct />} />}
      {isAuthenticated && <Route axact path="/admin/product/:id" element={<UpdateProduct />} />}
      {isAuthenticated && <Route axact path="/admin/orders" element={<OrderList />} />}
      {isAuthenticated && <Route axact path="/admin/order/:id" element={<ProcessOrder />} />}
      {isAuthenticated && <Route axact path="/admin/users" element={<UsersList />} />}
      {isAuthenticated && <Route axact path="/admin/user/:id" element={<UpdateUser />} />}
      {isAuthenticated && <Route axact path="/admin/reviews" element={<ProductReviews />} />}
    </Routes>
  <Footer />
  </Router>
  )
}

export default App;
