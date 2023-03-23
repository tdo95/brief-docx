import { React, useState, useEffect } from 'react'
import { TextField, Box, Button, Alert } from '@mui/material'
import { useDocument } from './context/document'
import { isValidHttpUrl } from './hooks/validateUrl'

const Form = ({ section, lastEnteredDate, setLastEnteredDate, setChangeInSummaries, summaryData = {}, editingSummary = false }) => {
    const document = useDocument();
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState({
        error: '',
        success: ''
    })
    const [form, setForm] = useState({
        title: summaryData.title || '',
        link: summaryData.link || '',
        description: summaryData.description || '',
        source: summaryData.source || '',
        date: summaryData.date ? new Date(summaryData.date).toLocaleDateString('en-CA') : lastEnteredDate.regular,
        formattedDate: summaryData.date ? new Date(summaryData.date).toLocaleDateString('en-US') : lastEnteredDate.formatted,
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
                //save last entered date
                setLastEnteredDate({
                    regular: value,
                    formatted: formatted
                })
            }  
            return newForm
        })
    }
    const saveForm = async () => {
        //Check if any form values are empty
        if(Object.values(form).some(value => !value)){
            //Note: Im using the alert state variable as a trigger for the use effect to clear the alert after a few seconds, there it probably a better way to go about this, but this will do for now.
            setAlert(prev => !prev)
            setMessage({success: '', error: 'Please fill out each feild in the form' })
            return
        //Check that link adheres to 'https://' format
        } else if (!isValidHttpUrl(form.link)) {
            setAlert(prev => !prev)
            setMessage({success: '', error: 'Please enter your link in "https://" format' })
            return
        }

        if(editingSummary) {
            //Save summary edits in database
            const res = await document.updateSummary(summaryData._id, {
                title: form.title,
                description: form.description,
                date: new Date(form.formattedDate),
                source: form.source,
                link: form.link,
                section: section,
            })
            if (res.error) {
                setAlert(prev => !prev)
                setMessage({success: '', error: 'Opps. An error occured while trying to save your summary, please try again later.' })

            } else {
                setAlert(prev => !prev)
                setMessage({error: '', success: 'Success! Summary has been updated' })

                setChangeInSummaries(prev => !prev)
            }

        } else {

            //Save summary in database
            const res = await document.addSummary({
                title: form.title,
                description: form.description,
                date: new Date(form.formattedDate),
                source: form.source,
                link: form.link,
                section: section,
            })
            if (res.error) {
                setAlert(prev => !prev)
                setMessage({success: '', error: 'Opps. An error occured while trying to save your summary, please try again later.' })
            }
            else if (res.summary) {
                setAlert(prev => !prev)
                setMessage({error: '', success: 'Success! Summary has been added' })
                //clear form
                setForm(prev => ({
                    ...prev,
                    title: '',
                    link: '',
                    description: '',
                    source: '',
                }))
                setChangeInSummaries(prev => !prev)
            }  
        }
    }
    useEffect(() => {
        console.log('Form Alert Timer going boi')
        const timer = setTimeout(() => {
            //Reset error
            setMessage({error: '', success: ''})
        }, 4000)
        return () => clearTimeout(timer);
    }, [alert])
  return (
    <Box sx={{'& > *':{mb:'24px'}, my:2}}>
        {(message.error || message.success) && <Alert severity={message.error ? 'error' : 'success'}>{message.error ? message.error : message.success}</Alert> }
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