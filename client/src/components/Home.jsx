import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material' 

const Home = () => {
  return (
    <Container sx={{px: 10, py: 3}}>
      <Outlet></Outlet>
    </Container>
  )
}

export default Home
