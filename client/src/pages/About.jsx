import React from 'react'
import { Container, Stack, Box, Typography } from '@mui/material'
import download from '../assets/download.png'
import edit from '../assets/edit.png'
import template from '../assets/template.png'

const About = () => {
  return (
    <Container sx={{pt:3}}>
        <Typography variant='h4' sx={{textAlign:'center', my:3}}>How it works</Typography>
        <Stack sx={{flexDirection: 'row', px:8, borderBottom:'1px solid lightgray', my:10}}>
            <Box sx={{minWidth: '400px', maxWidth:'500px', backgroundColor:'green', mr:2}}><img style={{width:'100%'}} src={template} alt="select template example" /></Box>
            <Box>
                <Typography variant='h6'>Select A Template</Typography>
                <Typography variant='body1'> After clicking the New Document button, users are transported to a screen where they can select a template to use for thier document.</Typography>
            </Box>
        </Stack>
        <Stack sx={{flexDirection: 'row-reverse', px:8, borderBottom:'1px solid lightgray', mb:10}}>
            <Box sx={{minWidth: '400px', maxWidth:'500px', backgroundColor:'green', ml:2}}><img style={{width:'100%'}} src={edit} alt="edit document example" /></Box>
            <Box>
                <Typography sx={{textAlign:'right'}} variant='h6'>Add Content</Typography>
                <Typography sx={{textAlign:'right'}} variant='body1'> Once a template has been selected, users can then edit thier document within the document editor, adding custom summaries and notes via editing forms!</Typography>
            </Box>
        </Stack>
        <Stack sx={{flexDirection: 'row', px:8, mb:10, borderBottom:'1px solid lightgray', height: 'fit-content'}}>
            <Box sx={{minWidth: '400px', maxWidth:'500px', backgroundColor:'green', mr:2}}> <img style={{width:'100%'}} src={download} alt="download document example" /></Box>
            <Box>
                <Typography variant='h6'>Download Your Formatted Document</Typography>
                <Typography variant='body1'>Once all the content within a document has been added, users have the option to click the finish button to download a copy of the current button. If edits still need to be made, users have the option to continue editing.</Typography>
            </Box>
        </Stack>
    </Container>
  )
}

export default About