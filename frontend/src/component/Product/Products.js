import React, {Fragment, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getProduct} from '../../actions/productAction' 
import { useParams } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import './Products.css'
import ProductCard from '../Home/Product/ProductCard'
import Pagination from 'react-js-pagination'
// import Slider from '@material-ui/core/Slider'
import {Slider} from '@mui/material'
import Typography from '@material-ui/core/Typography'
import MetaData from '../layout/MetaData'

const categories = [
  "Electronic Items",
  "Computer Items",
  "Camera",
]

const Products = ({props}) => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0,50000])
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)
  let keyword = useParams()

  const setCurrentPageNo = (e)=>{
    setCurrentPage(e)
  }
  const priceHandler = (event, newPrice)=>{
    setPrice(newPrice)
  }
  const {products, loading, error, productsCount, resultPerPage, filteredProductsCount} = useSelector((state)=> state.products)

  useEffect(()=>{
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  },[dispatch, keyword, error, alert, currentPage, price, category, ratings])

  let count = filteredProductsCount

return (<Fragment>
    {loading ? <Loader />: (<Fragment>
      <MetaData title="Products -- E-Commerce" />
      <h2 className='productsHeading'>Products</h2>
      <div className='products'>


      {products && products.map((product)=><ProductCard product={product}/>)}
      </div>
      {resultPerPage < count && (
        <div className='paginationBox'>
        <Pagination 
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
        </div>
      )}

        {keyword && (
          <div className='filterBox'>
          <Typography>Price</Typography>
          <Slider 
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={50000} />
          <Typography>Category</Typography>
          <ul className='categoryBox'>
            {categories.map((category)=>(
              <li
              className='category-link'
              key={category}
              onClick={()=> setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <fieldset>
            <Typography component="legend">Ratings</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating)=>{
                setRatings(newRating)
              }}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
              min={0}
              max={5} />
          </fieldset>
          </div>
        )}
      </Fragment>)}
  </Fragment>
)}

export default Products