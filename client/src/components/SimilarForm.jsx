import { React, useState, useEffect } from 'react'
import { TextField, Alert, Box, Button, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDocument } from '../context/document';
import { isValidHttpUrl } from '../hooks/validateUrl';

const SimilarForm = ({ summaryId, similarData = {}, lastEnteredDate,
    creatingSimilar, setCreatingSimilar, setChangeInSummaries }) => {
    const document = useDocument();
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState({
        error: '',
        success: ''
    })
    const [form, setForm] = useState({
        title: similarData.title || '',
        link: similarData.link?.url || '',
        source: similarData.link?.source || '',
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
    const showFeedback = (successMessage = '', errorMessage = '') => {
        //Note: Im using the alert state variable as a trigger for the use effect to clear the alert after a few seconds, there it probably a better way to go about this, but this will do for now.
        setAlert(prev => !prev)
        setMessage({success: successMessage, error: errorMessage })
    }
    const saveForm = async () => {
        
        if (document.editing.template === 'Allogene') {
            //Check if any form values are empty
            if(Object.values(form).some(value => !value))
                return showFeedback('', 'Please fill out each feild in the form')  
        } else if (document.editing.template === 'Notes') {
            if (!form.source || !form.link) 
                return showFeedback('', 'Please fill out each feild in the form')
        }
        //Check that link adheres to 'https://' format
        if (!isValidHttpUrl(form.link)) {
            return showFeedback('', 'Please enter your link in "https://" format')
        }
        const options = [
            summaryId,
            {
                link: {
                    source: form.source,
                    url: form.link
                },
                title: form.title,
                date: new Date(form.date)
            }
        ]
        let res;
        if (creatingSimilar) {
            res = await document.addSimilar(...options)
            console.log(res)
        } else {
            options.push(similarData._id)
            res = await document.updateSimilar(...options)
            console.log(res)
        }
        if (res.success) {
            showFeedback(res.success)
            setChangeInSummaries(prev => !prev)
        } else {
            showFeedback('', 'Opps. An error occured while trying to save, please try again later.')
        }

        
    }
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
        {!similarData.link && <Stack sx={{flexDirection: 'row', mb:'0',alignItems:'center'}}>
             <Typography variant='h6'>{document.editing.template === 'Allogene' ? 'Add Similar Story' : 'Add Reference'}</Typography>
            <IconButton sx={{ml: 'auto'}}aria-label='close similar form' onClick={() => setCreatingSimilar(false)}>
                    <CloseIcon />
            </IconButton>
        </Stack>}

        {(message.error || message.success) && <Alert sx={{mb: '20px'}} severity={message.error ? 'error' : 'success'}>{message.error ? message.error : message.success}</Alert> }
        
        { document.editing.template === 'Allogene' &&
            <TextField
                name='title'
                label='Title'
                size='small'
                fullWidth
                value={form.title}
                onChange={handleForm}
            />
        }
        <TextField
            name='source'
            label='Source'
            size='small'
            sx={{mr:2}}
            value={form.source}
            onChange={handleForm} 
        />
        <TextField
            name='link'
            label='Link'
            size='small'
            sx={{mr:2}}
            value={form.link}
            onChange={handleForm}
            inputProps={{
                type: 'url'
            }}
        />
        {document.editing.template === 'Allogene' &&
            <TextField
                name='date'
                type='date'
                size='small'
                onChange={handleForm}
                value={form.date}  
            />
        }
        <Button sx={{mx:2}} variant='contained' onClick={saveForm}>Save</Button>
    </Box>
  )
}

export default SimilarForm