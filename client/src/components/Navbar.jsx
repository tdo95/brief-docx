import { React, useState, useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { AppBar, Typography, Toolbar, Box, IconButton, Menu, MenuItem, Button } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle';


const Navbar = () => {
    const auth = useAuth()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const openNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    };
    const location = useLocation();
    const productRoutes = ['/product','/about', '/signup', '/login'];
    const onProduct = productRoutes.includes(location.pathname);
    //Close nav menu everytime navigation changes
    useEffect(()=> {
        setAnchorElNav(null);
    }, [location])
    const logoutUser = () => {
        auth.logout()
            
    }
  return (
    <AppBar position="static">
        
        <Toolbar>
            <DescriptionIcon sx={{mr:1}} />
            <Typography variant='h5' sx={{mr:3, fontWeight: 'bold'}}>Brief Docx</Typography>
            { onProduct ? <> 
                <Toolbar sx={{ml:'auto', p: '0px !important', display: {xs: 'none', sm: 'flex'}, '& .active': {textDecoration: 'underline'}, '& > *': { textDecoration:'none', color: 'white', mr:'25px !important' }}}>
                    <Typography component={ NavLink } to='/product' variant='subtitle1'>Home</Typography>
                    <Typography component={ NavLink } to='/about' variant='subtitle1'>How It Works</Typography>
                    <Typography component={ NavLink } to='/signup' variant='subtitle1'>Signup</Typography>
                    <Typography component={ NavLink } to='/login' variant='subtitle1'>Login</Typography>
                </Toolbar>
                <Box sx={{flexGrow: 1, display: {xs: 'flex', sm: 'none'}}}>
                    <IconButton onClick={openNavMenu} size='large' color='inherit' sx={{ml:'auto'}}>
                        <MenuIcon  />
                    </IconButton>
                    <Menu
                        open={Boolean(anchorElNav)}
                        onClose={() => setAnchorElNav(null)}
                        anchorEl={anchorElNav}
                    >
                        <MenuItem component={ Link } to='/product'>Home</MenuItem>
                        <MenuItem component={ Link } to='/about'>How It Works</MenuItem>
                        <MenuItem component={ Link } to='/signup'>Signup</MenuItem>
                        <MenuItem component={ Link } to='/login'>Login</MenuItem>
                    </Menu>
                </Box>
            </> :
            <Toolbar sx={{ml:'auto', p: '0px !important'}}>
                <Button variant='outlined' sx={{ color: 'white', borderColor: 'white', mr:3}} component={ Link } to='/new'>New Document</Button>
                <IconButton onClick={openNavMenu} size='large' color='inherit' >
                    <AccountCircle  />
                </IconButton>
                <Menu
                        open={Boolean(anchorElNav)}
                        onClose={() => setAnchorElNav(null)}
                        anchorEl={anchorElNav}
                    >
                        <MenuItem component={ Link } to='/'>Home</MenuItem>
                        <MenuItem onClick={logoutUser}>Logout</MenuItem>
                        
                    </Menu>
            </Toolbar>
            
            }
        </Toolbar>
    </AppBar>
  )
}

export default Navbar