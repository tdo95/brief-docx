import { React, useState } from 'react'
import { TextField, Box, Button, Alert } from '@mui/material'

const Form = ({ section }) => {
    const today = new Date();
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        title: '',
        link: '',
        description: '',
        source: '',
        date: today.toLocaleDateString('en-CA'),
        dateFormatted: today.toLocaleDateString('en-US'),
    })
    const handleForm = (e) => {
        const { name, value } = e.target;
        console.log(form, name, value)
        setForm(prev => {
            const newForm = {...prev}
            newForm[name] = value;
            if(name === 'date'){ 
                let date = value.split('-')
                date.push(date.shift())
                newForm['dateFormatted'] = date.join('/')
            }
            
            return newForm
        })
    }
    const saveForm = () => {
        //Check if any form values are empty
        if(Object.values(form).some(value => !value))
            return setError('Please fill out each feild in the form')
        //TODO: Save summary in database
        //Reset error
        setError('')
    }
  return (
    <Box sx={{'& > *':{mb:2}, my:2}}>
        {error && <Alert severity='error'>{error}</Alert> }
        <TextField
            name='title'
            label='Title'
            size='small'
            fullWidth
            value={form.title}
            onChange={handleForm}
        />
        <TextField
            name='link'
            label='Link'
            size='small'
            value={form.link}
            onChange={handleForm}
            fullWidth
        />
        <TextField
            name='description'
            label='Description'
            value={form.description}
            onChange={handleForm} 
            multiline
            fullWidth
        />
        <TextField
            name='source'
            label='Source'
            size='small'
            sx={{mr:2}}
            value={form.source}
            onChange={handleForm} 
        />
        <TextField
            name='date'
            type='date'
            size='small'
            onChange={handleForm}
            value={form.date}  
        />
        <Button sx={{mx:2}} variant='contained' onClick={saveForm}>Save</Button>
    </Box>
  )
}

export default Form