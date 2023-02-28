import { React, useCallback, useState } from 'react'
import { TextField, IconButton, Stack, Alert } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useBlocker } from './hooks/prompt.blocker'
import { useDocument } from './context/document'
import { saveAs } from 'file-saver'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import testPDF from './test/outpdf.pdf'

const CreateDocument = () => {
    const onLeavePrompt = `Are you sure you want to leave?\nAny changes not yet saved will be lost.`;
    const document = useDocument();  
    const [pdf, setPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);
    const [editingTitle, setEditingTitle] = useState(false);
    
    const [documentForm, setDocumentForm] = useState({
      documentTitle: document.editing.title,
      shortDocTitle: document.editing.title.slice(0,30) + '...',
      storyTitle: '',
      storyDescription: '',
      storySource: '',
      storyDate: '',
      storyLink: '',
    });
    const handleForm = (e) => {
      const { value, name } = e.target;
      console.log(value)
      setDocumentForm(prev => {
        const updateForm = {...prev};
        updateForm[name] = value;
        if (name === 'documentTitle') {
          updateForm['shortDocTitle'] = value.slice(0,30) + '...'
        }
        return updateForm
      })
    }
    
    const updateDoc = async (info) => {
      console.log('updating document', info)
      const res = await document.updateDocument(info);
      const data = await res.json()
      if (data.error) setError('Oops! Looks like we couldn\'t save your changes. Please try again later.')

    }
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
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    const serverGen = async () => {
        const res = await fetch('/document/generate/allogene')
        const data = await res.blob()
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onerror = function (event) {
            console.log('Error reading file: ', event)
        }
        reader.onload = function (event) {
            setPdf(event.target.result)
        }
    }
    

   //Prompts user to confirm navigation and sets editing to false if user chooses to navigate away
    const confirmNavigation = (tx) => {
        if ( window.confirm( onLeavePrompt ) ) { 
            //Set editing context to false
            document.setEditing(false);
            tx.retry();
        }
        
    }
    useBlocker(useCallback(confirmNavigation, []))

  return (
    <div className='docContainer'>
      {error && <Alert severity='error'>{error}</Alert>}
      <Stack sx={{alignItems: 'center', flexDirection:'row'}}>
        <TextField
          sx={{
            '.Mui-disabled:not(input), .Mui-disabled > *:not(input)': {
              color: 'transparent !important',
              'border-color': 'transparent !important',
              
            },
            'input.Mui-disabled, input': {
              'font-size':'30px !important',
              '-webkit-text-fill-color': 'black',
            },
            width: '50%'
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
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
        <button onClick={serverGen}>Generate Document</button>
    </div>
  )
}

export default CreateDocument