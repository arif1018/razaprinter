import React, { Fragment, useEffect } from "react"
import {FaMouse} from "react-icons/fa"
import "./Home.css"
import ProductCard from "./Product/ProductCard.js"
import MetaData from "../layout/MetaData.js"
import { clearErrors, getProduct } from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'


const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state)=> state.products)

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  },[dispatch, error, alert])
  return (
    <Fragment>
      {loading ? <Loader />: <Fragment>
    <MetaData title="Home Page Working" />
    <div className="banner">
        <p>Welcome to RAZA PRINTERS</p>
        <h1>FIND PRODUCTS WITH AMAZING RATES BELOW</h1>
        <a href="#container"><button>Scroll <FaMouse/></button></a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>

    <div className="container" id="container">
      
      {products && products.map((product)=><ProductCard product={product}/>)}
    </div>
  </Fragment>}
    </Fragment>
  )
}

export default Home