import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Typography, Toolbar } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar position="static">
        
        <Toolbar>
            <Typography variant='h5' sx={{mr:3}}>Breif Docx</Typography>
            <Typography component={ NavLink } to='/about' variant='h6' sx={{textDecoration:'none', color:'white'}}>How It Works</Typography>
            
        </Toolbar>
    </AppBar>
  )
}

export default Navbar