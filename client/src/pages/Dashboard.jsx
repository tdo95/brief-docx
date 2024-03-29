import { React, useState, useEffect } from 'react'
import { useAuth } from '../context/auth'
import { useDocument } from '../context/document'
import { Container, Typography, Stack, Box, Card } from '@mui/material'
import DocumentCard from '../components/DocumentCard'


const Dashboard = () => {
    const [documentCards, setDocumentCards] = useState([])
    
    const [refresh, setRefresh] = useState(false)
    const auth = useAuth();
    const document = useDocument();
    const current = new Date().toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + "";
    
    useEffect(() => {
       getDocuments()
    }, [refresh])
    const getDocuments = async () => {
        const docs = await document.getUserDocuments(auth.user._id);
        setDocumentCards(() => {
            return docs.map((doc) => <DocumentCard key={doc._id} info={doc} setRefresh={setRefresh} />)
        })
    }

  return (
    <Container>
        <Box sx={{display: 'flex', alignItems: 'center', mb:2}}>
        <Typography variant='h4' sx={{my: 2}}> Welcome {auth.user.name ? auth.user.name : 'Back'}</Typography>
        <Typography sx={{ml:'auto'}} varaint='subtitle1'>{current}</Typography>
        </Box>
        
        <Box sx={{borderRadius: '10px', backgroundColor: 'rgb(231,235,241)', py:2, px:3}}>
            <Typography variant='h6' sx={{ mb:1, color: 'black'}}>Recent</Typography>
            <Stack sx={{flexDirection: 'row', overflowX:'auto'}}>
                { documentCards.slice(0,6) }
            </Stack>
        </Box>
        <Box sx={{mt:5, width: '100%'}}>
            <Typography variant='h4' sx={{my:1}}>Documents</Typography>
            <Stack sx={{flexDirection: 'row', flexWrap: 'wrap', p:1, gap: '20px',borderRadius: '10px', '& > *': {backgroundColor: 'rgb(231,235,241)', boxShadow: '2px 2px 1px rgb(25, 117, 210)', pb:'8px', borderRadius: '8px' }, width:'100%'}}>
            { documentCards }
            </Stack>
        </Box>
        
    </Container>
  )
}

export default Dashboard