import { React, useCallback, useState, useEffect } from 'react'
import { Alert } from '@mui/material'
import { useBlocker } from './hooks/prompt.blocker'
import { useDocument } from './context/document'
import { saveAs } from 'file-saver'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import testPDF from './test/outpdf.pdf'
import TitleEditor from './TitleEditor';
import SectionEditor from './SectionEditor'

const EditDocument = () => {
    const onLeavePrompt = `Are you sure you want to leave?\nAny changes not yet saved will be lost.`;
    const document = useDocument();  
    const [pdf, setPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);
    const [summaries, setSummaries] = useState([])
    const [changeInSummaries, setChangeInSummaries] = useState(false)
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
  
    const getSummaries = async () => {
      //fetch summaries for document from the database
      const results = await document.getDocumentSummaries(document.editing._id)
      console.log(results, 'Error:', (!!results.error))
      if (results.error) setError('Looks like there was an issue retriving your document summaries. Please exit the editor and try again later.')
      else setSummaries(results);
  
    }
    const updateDoc = async (info) => {
      console.log('updating document', info)
      const res = await document.updateDocument(info);
      const data = await res.json()
      if (data.error) setError('Oops! Looks like we couldn\'t save your changes. Please try again later.')

    }
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    const serverGen = async () => {
        const res = await fetch(`/document/generate/allogene/${document.editing._id}`)
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
    useEffect(() => {
      console.log('gettting summaries')
      getSummaries()
      console.log('generating document')
      serverGen()
    }, [changeInSummaries])

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
      <TitleEditor 
        handleForm={handleForm} 
        documentForm={documentForm} 
        setDocumentForm={setDocumentForm}
        updateDoc={updateDoc}
       />
       <SectionEditor
        summaries={summaries} 
        setChangeInSummaries={setChangeInSummaries}
       />
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

export default EditDocument