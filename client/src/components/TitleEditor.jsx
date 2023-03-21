import { React, useState } from 'react'
import { TextField, IconButton, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const TitleEditor = ({documentForm, setDocumentForm, updateDoc, handleForm}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const saveInput = () => {
    console.log('User has clicked away!')
    //Set placeholder if input is empty
    if(!documentForm.documentTitle) {
      setDocumentForm(prev => ({
        ...prev,
        documentTitle: 'Untitled'
      }))
    }
    //Update title in database
    updateDoc({title: documentForm.documentTitle})

    //Set editing to false
    setEditingTitle(false)
  }
  return (
    <>
    <Stack sx={{alignItems: 'center', flexDirection:'row'}}>
      <TextField
        sx={{
          '.Mui-disabled:not(input), .Mui-disabled > *:not(input)': {
            color: 'transparent !important',
            'border-color': 'transparent !important',
            
          },
          'input.Mui-disabled, input': {
            'font-size':'clamp(15px, 4vw, 35px) !important',
            '-webkit-text-fill-color': 'black',
          },
          width: '100%',
         
        }}
        id='title'
        disabled={!editingTitle}
        name='documentTitle'
        variant='outlined'
        size='small'
        label='Title'
        value={ editingTitle || documentForm.documentTitle.length < 30 ? documentForm.documentTitle :  documentForm.shortDocTitle}
        onChange={handleForm}
        helperText={!(documentForm.documentTitle) && editingTitle &&'Please enter a title.'}
        onBlur={saveInput}
        error={!(documentForm.documentTitle) && editingTitle}
        inputRef={input => input && input.focus()}>
      </TextField>
      {!editingTitle && <IconButton aria-label='save' onClick={() => setEditingTitle(prev => !prev)}>
        <EditIcon />
      </IconButton>}
    </Stack>
    </>
  )
}

export default TitleEditor