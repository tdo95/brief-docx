import React from 'react'
import { Container, Stack, Box, Typography } from '@mui/material'

const About = () => {
  return (
    <Container sx={{pt:3}}>
        <Typography variant='h4' sx={{textAlign:'center', my:3}}>How it works</Typography>
        <Stack sx={{flexDirection: 'row', px:8, my:10}}>
            <Box sx={{minWidth: '200px', height: '200px', backgroundColor:'blue', mr:2}}></Box>
            <Box>
                <Typography variant='h6'>Feature Headline</Typography>
                <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
            </Box>
        </Stack>
        <Stack sx={{flexDirection: 'row-reverse', px:8, mb:10}}>
            <Box sx={{minWidth: '200px', height: '200px', backgroundColor:'blue', mr:2}}></Box>
            <Box>
                <Typography variant='h6'>Feature Headline</Typography>
                <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
            </Box>
        </Stack>
        <Stack sx={{flexDirection: 'row', px:8, mb:10}}>
            <Box sx={{minWidth: '200px', height: '200px', backgroundColor:'blue', mr:2}}></Box>
            <Box>
                <Typography variant='h6'>Feature Headline</Typography>
                <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
            </Box>
        </Stack>
    </Container>
  )
}

export default About