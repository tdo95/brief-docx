import { React, useCallback, useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import { Alert, Button, Stack } from '@mui/material'
import { useBlocker } from '../hooks/prompt.blocker'
import { useDocument } from '../context/document'
import { saveAs } from 'file-saver'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import TitleEditor from '../components/TitleEditor';
import SectionEditor from '../components/SectionEditor'
import { Oval } from 'react-loader-spinner'

const EditDocument = () => {
    const onLeavePrompt = `Are you sure you want to leave?\nAny changes not yet saved will be lost.`;
    const [setModalFunction, setModalContent, setOpenModal, setPurpose] = useOutletContext()
    const document = useDocument();  
    const [pdf, setPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);
    const [summaries, setSummaries] = useState([])
    const [refreshDocument, setRefreshDocumentocument] = useState(false)
  
    const getSummaries = async () => {
      //fetch summaries for document from the database
      const results = await document.getDocumentSummaries(document.editing._id)
      
      if (results.error) setError('Looks like there was an issue retriving your document summaries. Please exit the editor and try again later.')
      else setSummaries(results);
  
    }
    const updateDoc = async (info) => {
      const res = await document.updateDocument(info);
      if (res.error) setError('Oops! Looks like we couldn\'t save your changes. Please try again later.')

    }
    function onDocumentLoadSuccess({ numPages }) {
      console.log(numPages)
        setNumPages(numPages);
      }
    const serverGen = async () => {
        const res = await fetch(`/document/generate/pdf/${document.editing._id}`)
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
    const downloadDocument = async () => {
      try {
        const res = await fetch(`/document/generate/word/${document.editing._id}`)
        const data = await res.blob()
        saveAs(data, document.editing.title + '.docx')
        return {success: 'Success! Document downloaded.'}
      } catch (err) {
        return {error: 'Opps! An error occured while trying to download this document. Please try again later.'}        
      }
    }
    
    const triggerModal = () => {
      setModalFunction(() => downloadDocument)
      setModalContent(null)
      setPurpose('downloadDocument')
      setOpenModal(true)
    }
    useEffect(() => {
      getSummaries()
      serverGen()
    }, [refreshDocument])

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
      <Stack sx={{flexDirection: 'row', alignItems:'center'}}>
        <TitleEditor
          updateDoc={updateDoc}
          setRefreshDocumentocument={setRefreshDocumentocument}
        />
        <Button 
          sx={{ml:'auto'}} 
          variant='contained' 
          color='success' 
          onClick={triggerModal}
        >
          Finished
        </Button>
      </Stack>
       <SectionEditor
        summaries={summaries} 
        setRefreshDocumentocument={setRefreshDocumentocument}
       />
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} loading={<Oval
                                height={80}
                                width={80}
                                color="#066fd5"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#066fd5"
                                strokeWidth={5}
                            />}>
        {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} height={400}/>
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