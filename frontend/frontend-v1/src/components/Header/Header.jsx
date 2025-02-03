import React from 'react'
import logo from '../../assets/logo.svg'
import Button from '@mui/material/Button';
import { Link } from 'react-router';

function Header() {
  return (
    <div className=' flex justify-between items-center border-bottom shadow-md'>
        <img className='p-5' src={logo} alt="logo" width={100} height={100} />
        <Link to='/login' className='p-5'>
        <Button sx={{ marginRight:"20px",backgroundColor: '#36454f   ',fontFamily:'Outfit', color: 'white', '&:hover': { backgroundColor: 'black' } }} variant="contained">Login</Button>
        <Button sx={{ marginRight: "20px",backgroundColor: '#36454f   ',fontFamily:'Outfit', color: 'white', '&:hover': { backgroundColor: 'black' } }} variant="contained">Get Started</Button>
        </Link>
    </div>
  )
}

export default Header