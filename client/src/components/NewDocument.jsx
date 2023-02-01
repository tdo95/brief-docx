import { React, useState } from 'react'
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@mui/material'
import { useDocument } from './context/document'

const NewDocument = () => {
    const [template, setTemplate] = useState('')
    const [error, setError] = useState('')
    const document = useDocument()
    
    const handleTemplateSelect = (event) => setTemplate(event.target.value)
    const submitTemplate = () => {
        if (!template) return setError('Please select a template.');
        //TODO: Fetch request to API to create a new document within the database
    }

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant='h4' sx={{textAlign: 'center'}}>Select a Template</Typography>
        <FormControl sx={{width: '50%', marginTop: 4}} error={error}>
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

export default NewDocument