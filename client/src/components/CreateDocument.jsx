import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@mui/material'
import { useDocument } from './context/document'

const CreateDocument = () => {
    const [template, setTemplate] = useState('')
    const [error, setError] = useState('')
    const document = useDocument()
    const navigate = useNavigate()
    
    const handleTemplateSelect = (event) => setTemplate(event.target.value)
    const submitTemplate = () => {
        //Reset error
        setError("");
        
        if (!template) return setError('Please select a template.');
        
        //Fetch request to API to create a new document within the database
        createDoc()
    }

    const createDoc = async () => {
        //TODO: Send document ID with the response so that it can be stored within the context and referenced to make edits
        const res = await document.createDocument(template);
        
        //if successful navigate to the create page
        if (res.document) {
            navigate('/create')
        } else if (res.error) 
            return setError('Hmm, something went wrong. Please try again later')
    }

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant='h4' sx={{textAlign: 'center'}}>Select a Template</Typography>
        <FormControl sx={{width: '50%', marginTop: 4}} error={Boolean(error)}>
            <InputLabel id='template'>Template</InputLabel>
            <Select
                labelId='template'
                value={template}
                label='Template'
                onChange={handleTemplateSelect}
            >
                <MenuItem disabled value="">
                    <em>Choose a Template</em>
                </MenuItem>
                <MenuItem value={'Allogene'}>Allogene</MenuItem>
                <MenuItem value={'Notes'}>Notes</MenuItem>
            </Select>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
        <Button onClick={submitTemplate} variant='contained' sx={{marginTop: 4}}>Start Document</Button>
    </Container>
  )
}

export default CreateDocument