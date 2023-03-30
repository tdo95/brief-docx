import React from 'react'
import { CssBaseline, Container, Typography, Stack, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import float from '../assets/float.gif'


const Product = () => {
  return (
    <main>
        
        <Container sx={{p:3, display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography sx={{mb:'30px'}} variant='h2' textAlign='center' my={2}>Generate formated documents</Typography>
            <Box sx={{display: 'flex', width: '100%', maxWidth:'1100px'}}>
              <Box sx={{width:'50%', height: '300px', overflow:'hidden', position:'relative'}}> <img style={{width:'100%', position: 'absolute', top:'-110px'}} src={float}/> </Box>
              <Box sx={{width:'60%', display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                <Typography sx={{fontSize: '22px', fontWeight:'500', mb: '10px'}}>Need to generate a custom document, but short on time?</Typography>
                <Typography sx={{fontSize: '20px', mb:'20px'}}>Breif Docx is a document formating tool that allows you to create and edit your documents in real time. Formatting is taken care of behind the scenes. This way you can focus on what really matters, the content!</Typography>
                <Stack direction='row' spacing={3}>
                <Button component={ Link } to='/about' variant='outlined'>Learn More</Button>
                <Button component={ Link } to='/login' variant='contained'>Get Started</Button>
              </Stack>
              </Box>
              
            </Box>
            
        </Container>
    </main>
  )
}

export default Product