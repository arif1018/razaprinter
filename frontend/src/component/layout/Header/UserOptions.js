import React, { Fragment, useState } from 'react'
import './Header.css'
import {SpeedDial, SpeedDialAction} from '@material-ui/lab'
import DashBoardIcon  from '@material-ui/icons/Dashboard'
import PersonIcon  from '@material-ui/icons/Person'
import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart'
import ExitToAppIcon  from '@material-ui/icons/ExitToApp'
import ListAltcon  from '@material-ui/icons/ListAlt'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../actions/userAction'
import { Backdrop } from '@mui/material'


const UserOptions = ({user}) => {
  const { cartItems } = useSelector((state)=> state.cart)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const alert = useAlert()

  const options =[
    {icon:<ListAltcon />, name:"Orders",func: order},
    {icon:<PersonIcon />, name:"Profile",func: account},
    {icon:<ShoppingCartIcon style={{color : cartItems.length > 0 ? "tomato" : "unset"}}/>, name:`Cart : ${cartItems.length}`,func: cart},
    {icon:<ExitToAppIcon />, name:"Logout",func: logoutuser}
  ]

  if(user.role === "admin"){
    options.unshift({icon:<DashBoardIcon />, name:"Dashboard",func: dashbaord},
    )
  }
  function dashbaord(){
    navigate("/admin/dashboard")
  }
  function order(){
    navigate("/orders")
  }
  function account(){
    navigate("/account")
  }
  function cart(){
    navigate("/cart")
  }
  function logoutuser(){
    alert.success("User Loged Out Successsfully!...")
    dispatch(logout())
    navigate("/")
  }
  return (
    <Fragment>
      <Backdrop open={open}/>
      <SpeedDial 
      ariaLabel='SpeedDial tooltip example'
      onClose={()=>{setOpen(false)}}
      onOpen={()=>{setOpen(true)}}
      open={open}
      direction="down"
      className='speedDial'
      icon={
        <img className='speedDialIcon'
        src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt="abcd"/>
      }
      >
        {options.map((item)=>(<SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions