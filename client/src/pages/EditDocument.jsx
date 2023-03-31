import { React, useCallback, useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import { Alert, Button, Stack, Box, Card } from '@mui/material'
import { useBlocker } from '../hooks/prompt.blocker'
import { useDocument } from '../context/document'
import { saveAs } from 'file-saver'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import TitleEditor from '../components/TitleEditor';
import SectionEditor from '../components/SectionEditor'
import { Oval } from 'react-loader-spinner'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    const greaterThan900 = useMediaQuery('(min-width:900px)')
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
    const changePage = (offset) => setPageNumber(prev => prev + offset)
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
    const DocumentLoadingScreen = (<Box sx={{height: greaterThan900 ? '650px' : '500px', display: 'flex', alignItems:'center', justifyContent:'center', width: greaterThan900 ? '460px' : '360px', }}>
      <Oval
        height={80}
        width={80}
        color="#066fd5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#066fd5"
        strokeWidth={5}
      />
    </Box>)
  return (
    <Box>
      {error && <Alert severity='error'>{error}</Alert>}
      <Stack sx={{flexDirection: 'row', alignItems:'center',  mb: '30px'}}>
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
      <Box sx={{display: greaterThan900 ? 'flex' : 'block', gap: '30px', justifyContent: 'space-around'}}>
        <Stack sx={{alignItems: 'center'}}>
          <Button size='small' onClick={serverGen}>Refresh Document</Button>
          <Card sx={{width: 'fit-content', }} raised>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} loading={DocumentLoadingScreen} noData={DocumentLoadingScreen} error={<Box sx={{height: greaterThan900 ? '650px' : '500px', display: 'flex', alignItems:'center', justifyContent:'center', width: greaterThan900 ? '460px' : '360px', }}>Failed to Load File.</Box>}>
        
                      <Page key={`page_${pageNumber}`} pageNumber={pageNumber} height={greaterThan900 ? 650 : 500}/>
        
              </Document>
          </Card>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Box>
            <Button sx={{minWidth: '30px', mr: '5px'}} size='small' startIcon={<KeyboardArrowLeftIcon/>} variant={'outlined'} onClick={() => changePage(-1)} disabled={pageNumber <= 1 }></Button>
            <Button sx={{minWidth: '30px'}} endIcon={<KeyboardArrowRightIcon />} size='small' variant={'outlined'} onClick={() => changePage(1)} disabled={pageNumber >= numPages }></Button>
          </Box>
        </Stack>
        <SectionEditor
          summaries={summaries}
          setRefreshDocumentocument={setRefreshDocumentocument}
         />
      </Box>
    </Box>
  )
}

export default EditDocument