import { React, useState } from 'react'
import { TextField, IconButton, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useDocument } from '../context/document'

const TitleEditor = ({updateDoc,  setRefreshDocument}) => {
  const document = useDocument();
  const [editingTitle, setEditingTitle] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    documentTitle: document.editing.title,
    shortDocTitle: document.editing.title.slice(0,30) + '...',
  });
  const handleForm = (e) => {
    const { value, name } = e.target;

    setDocumentForm(prev => {
      const updateForm = {...prev};
      updateForm[name] = value;
      if (name === 'documentTitle') {
        updateForm['shortDocTitle'] = value.slice(0,30) + '...'
      }
      return updateForm
    })
  }
  const saveInput = () => {
    
    //Set placeholder if input is empty
    if(!documentForm.documentTitle) {
      setDocumentForm(prev => ({
        ...prev,
        documentTitle: 'Untitled'
      }))
    }
    //Update title in database
    updateDoc({title: documentForm.documentTitle})
    //Update document
    setRefreshDocument(prev => !prev)
    //Set editing to false
    setEditingTitle(false)
  }
  return (
    <>
    <Stack sx={{alignItems: 'center', flexDirection:'row', width: '100%',}}>
      { !editingTitle ? <Typography noWrap sx={{px:'14x', maxWidth: '50%'}} variant='h4'>{documentForm.documentTitle}</Typography> :
      <TextField
        sx={{
          '.Mui-disabled:not(input), .Mui-disabled > *:not(input)': {
            color: 'transparent !important',
            'borderColor': 'transparent !important',
            
          },
          'input.Mui-disabled, input': {
            'fontSize':'clamp(15px, 4vw, 35px) !important',
            'WebkitTextFillColor': 'black',
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
      </TextField>}
      {!editingTitle && <IconButton aria-label='save' onClick={() => setEditingTitle(prev => !prev)}>
        <EditIcon />
      </IconButton>}
    </Stack>
    </>
  )
}

export default TitleEditor