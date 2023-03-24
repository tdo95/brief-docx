import { React, useState, useEffect } from 'react'
import { TextField, Alert, Box, Button, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDocument } from './context/document';

const SimilarForm = ({ similarData = {}, lastEnteredDate, setCreatingSimilar, setChangeInSummaries }) => {
    const document = useDocument();
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState({
        error: '',
        success: ''
    })
    const [form, setForm] = useState({
        title: similarData.link?.title || '',
        link: similarData.link?.url || '',
        source: similarData.source || '',
        date: similarData.date ? new Date(similarData.date).toLocaleDateString('en-CA') : lastEnteredDate.regular,
        formattedDate: similarData.date ? new Date(similarData.date).toLocaleDateString('en-US') : lastEnteredDate.formatted,
    })

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            const newForm = {...prev}
            newForm[name] = value;
            if(name === 'date'){ 
                let date = value.split('-')
                date.push(date.shift())
                let formatted = date.join('/');
                newForm['formattedDate'] = formatted
            }  
            return newForm
        })
    }
    const saveForm = () => {}
    useEffect(() => {
        console.log('Similar Form Alert Timer going boi')
        const timer = setTimeout(() => {
            //Reset error
            setMessage({error: '', success: ''})
        }, 4000)
        return () => clearTimeout(timer);
    }, [alert])

  return (
    <Box sx={{ml: '40px', my:2}}>
        {(message.error || message.success) && <Alert severity={message.error ? 'error' : 'success'}>{message.error ? message.error : message.success}</Alert> }
        <Stack sx={{flexDirection: 'row', mb:'0',alignItems:'center'}}>
            {!similarData.title && <Typography variant='h6'>Add Similar Story</Typography>}
            <IconButton sx={{ml: 'auto'}}aria-label='close similar form' onClick={() => setCreatingSimilar(false)}>
                    <CloseIcon />
            </IconButton>
        </Stack>
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
            inputProps={{
                type: 'url'
            }}
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

export default SimilarForm