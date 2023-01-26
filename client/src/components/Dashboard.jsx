import React from 'react'
import { useAuth } from './context/auth'
import { Container, Typography } from '@mui/material'

const Dashboard = () => {
    const auth = useAuth()
  return (
    <Container>
        <Typography variant='h4'> Welcome {auth.user.name ? auth.user.name : 'Back'} </Typography>
    </Container>
  )
}

export default Dashboard