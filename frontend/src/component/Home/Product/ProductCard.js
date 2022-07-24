import React from 'react'
import ReactRatingStar from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
const ProductCard = ({product}) => {

    const options ={
        edit:false,
        color:"rgba(20, 20, 20, 0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 18 : 23,
        value:product.ratings,
        isHalf:true
    }
    
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.image[0].url} alt={product.name}/>
        {/* <img src={ProductPicture} alt={product.name}/> */}
        <p>{product.name}</p>
        <div>
            <ReactRatingStar {...options} /> <span> ({product.numberofReviews} Reviews) </span>
        </div>
        <span>{`Rs = ${product.price}/-`}</span>
    </Link>
 )
}

export default ProductCard