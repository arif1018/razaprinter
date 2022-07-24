import React from 'react'
import {Link} from 'react-router-dom'
import {FaSearch, FaUser, FaCartPlus } from 'react-icons/fa'
import './Header.css'
const Header = () => {
  return (
      <div className="navbar">
        <ul>
        <Link className='test' to={"/"}><li>Home</li></Link>
        <Link to={"/products"}><li>Products</li></Link>
        <Link to={"/search"}><li><FaSearch /></li></Link>
        <Link to={"/cart"}><li><FaCartPlus /></li></Link>
        <Link to={"/login"}><li><FaUser /></li></Link>
        </ul>
      </div>



    // <div className='mainMenu'>
    //   <ul>
        // <Link to={"/"}><li>Home</li></Link>
        // <Link to={"/products"}><li>Products</li></Link>
        // <Link to={"/search"}><li><FaSearch /></li></Link>
        // <Link to={"/cart"}><li><FaCartPlus /></li></Link>
        // <Link to={"/login"}><li><FaUser /></li></Link>
    //   </ul>
    // </div>
  )
}

export default Header