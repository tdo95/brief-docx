import React from 'react'
import { useAuth } from './context/auth'
import { Container, Typography, Stack, Box, Card } from '@mui/material'

const Dashboard = () => {
    const auth = useAuth();
    const current = new Date().toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + "";
    
  return (
    <Container>
        <Box sx={{display: 'flex', alignItems: 'center', mb:2}}>
        <Typography variant='h4' sx={{my: 2}}> Welcome {auth.user.name ? auth.user.name : 'Back'}</Typography>
        <Typography sx={{ml:'auto'}} varaint='subtitle1'>{current}</Typography>
        </Box>
        
        <Box sx={{borderRadius: '10px', backgroundColor: 'rgb(231,235,241)', py:2, px:3}}>
            <Typography variant='h6' sx={{ mb:1, color: 'black'}}>Recent</Typography>
            <Stack sx={{flexDirection: 'row'}}>
                <Card sx={{width: 120, minHeight: 150, m:1}}></Card>
            </Stack>
        </Box>
        <Box sx={{mt:5}}>
            <Typography variant='h4' sx={{my:1}}>Documents</Typography>
            <Stack sx={{flexDirection: 'row', flexWrap: 'wrap', p:1, borderRadius: '10px', '& > *': {backgroundColor: 'rgb(231,235,241)', boxShadow: '1px 1px 1px rgb(25, 117, 210)'}}}>
            <Card sx={{width: 120, minHeight: 150, m:1}}></Card>
            <Card sx={{width: 120, minHeight: 150, m:1}}></Card>
            <Card sx={{width: 120, minHeight: 150, m:1}}></Card>
            </Stack>
        </Box>
        
    </Container>
  )
}

export default Dashboard