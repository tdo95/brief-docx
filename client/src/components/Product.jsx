import React from 'react'
import { CssBaseline, Container, Typography, Stack, Button } from '@mui/material'
import { Link } from 'react-router-dom'


const Product = () => {
  return (
    <main>
        
        <Container sx={{p:3}}>
            <Typography variant='h2' textAlign='center' my={2}>Generate a preformated document</Typography>
            <Stack direction='row' spacing={3} justifyContent='center'>
                <Button component={ Link } to='/about' variant='outlined'>Learn More</Button>
                <Button component={ Link } to='/login' variant='contained'>Get Started</Button>
            </Stack>
        </Container>
    </main>
  )
}

export default Product