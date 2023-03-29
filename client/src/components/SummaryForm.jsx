import { React, useState, useEffect } from 'react'
import { TextField, Box, Button, Alert } from '@mui/material'
import { useDocument } from '../context/document'
import { isValidHttpUrl } from '../hooks/validateUrl'

const Form = ({ section, lastEnteredDate, setLastEnteredDate, setRefreshDocumentocument, summaryData = {}, editingSummary = false }) => {
    const document = useDocument();
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState({
        type: '',
        message: ''
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
            newForm[name] = value
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
    const cleanText = () => {
        //replace parenthesis
        const parenReg = /(\(.*?\))/gi;
        //replace spaces
        const spaceReg = /  +/g;
        console.log('cleaning text')
        //remove parenthesis inside of text
        setForm(prev => ({
            ...prev,
            description: form.description.replace(parenReg, '').replace(spaceReg, ' ')
        }))
    }
    const showFeedback = (type, message) => {
        //Note: Im using the alert state variable as a trigger for the use effect to clear the alert after a few seconds, there it probably a better way to go about this, but this will do for now.
        setAlert(prev => !prev)
        setMessage({type: type, message: message })
    }
    const saveForm = async () => {
        if (document.editing.template === 'work') {
            //Check if any form values are empty
            if(Object.values(form).some(value => !value)){
                //Note: Im using the alert state variable as a trigger for the use effect to clear the alert after a few seconds, there it probably a better way to go about this, but this will do for now.
                setAlert(prev => !prev)
                setMessage({type: 'error', message: 'Please fill out each feild in the form' })
                return
            }
        
        } else if (document.editing.template === 'Notes') {
            if(!form.description.length || !form.title.length) {
                setAlert(prev => !prev)
                setMessage({type: 'error', message: 'Please enter a description and title.' })
                return

            }

        }
        //Check that link adheres to 'https://' format
        if (form.link && !isValidHttpUrl(form.link)) {
            setAlert(prev => !prev)
            setMessage({type: 'error', message: 'Please enter your link in "https://" format' })
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
                setMessage({type: 'error', message: 'Opps. An error occured while trying to save your summary, please try again later.' })

            } else {
                setAlert(prev => !prev)
                setMessage({type: 'success', message: 'Success! Summary has been updated' })

                setRefreshDocumentocument(prev => !prev)
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
            if (res.error ) {
                setAlert(prev => !prev)
                setMessage({type: 'error', message: 'Opps. An error occured while trying to save your summary, please try again later.' })
            }
            else if (res.warning) {
                setAlert(prev => !prev)
                setMessage({type: 'warning', message: `Warning: "${res.warning.document.toUpperCase()}" created on ${res.warning.date.toUpperCase()} references this link.`})
                setRefreshDocumentocument(prev => !prev)
            }
            else if (res.summary) {
                setAlert(prev => !prev)
                setMessage({type: 'success', message: 'Success! Summary has been added' })
                //clear form
                setForm(prev => ({
                    ...prev,
                    title: '',
                    link: '',
                    description: '',
                    source: '',
                }))
                setRefreshDocumentocument(prev => !prev)
            }  
        }
    }
    useEffect(() => {
        console.log('Form Alert Timer going boi')
        const timer = setTimeout(() => {
            //Reset error
            setMessage({type: '', message: ''})
        }, 4000)
        return () => clearTimeout(timer);
    }, [alert])
  return (
    <Box sx={{'& > *':{mb:'24px'}, my:2}}>
        {(message.type) && <Alert severity={message.type}>{message.message}</Alert> }
        <TextField
            name='title'
            label='Title'
            size='small'
            fullWidth
            value={form.title}
            onChange={handleForm}
        />
        <TextField
            name='description'
            label='Description'
            value={form.description}
            onChange={handleForm} 
            multiline
            fullWidth
            inputProps={{
                spellcheck: true
            }}
        />
        { document.editing.template === 'work' && 
            <><TextField
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
                value={form.link}
                sx={{mr:2}}
                onChange={handleForm}
                inputProps={{
                    type: 'url'
                }}
            />
            <TextField
                name='date'
                type='date'
                size='small'
                sx={{mr:2}}
                onChange={handleForm}
                value={form.date}  
            /></>
        }
        {document.editing.template === 'work' &&  <Button sx={{mr:2}} variant='outlined' onClick={cleanText}>Clean Text</Button>}
        <Button sx={{ml:'auto'}} variant='contained' onClick={saveForm}>Save</Button>
    </Box>
  )
}

export default Form