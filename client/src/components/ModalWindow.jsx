import { React, useEffect, useState } from 'react'
import { Modal, Box, Typography, Alert, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Dropdown from './Dropdown';

const ModalWindow = ({ executionFunction, content, open, setOpen, purpose, alert, setAlert, pdfId}) => {
    const [pdf, setPdf] = useState(undefined);
    const [timer, setTimer] = useState(null)
    const [pdfDone, setPdfDone] = useState(true)
    const [loading, setLoading] = useState(true)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        if (pdfDone) {
            const timeout = setTimeout(() => {
                setLoading(false)
            }, 300)
            setTimer(timeout)
        }
    }
    const getPdf = async () => {
        const res = await fetch(`/document/generate/pdf/${pdfId}`)
        const data = await res.blob()
        
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onerror = function (event) {
            console.log('Error reading file: ', event)
            setAlert({type:'error', message:'There was an error trying to load the pdf. Please try again later.'})
        }
        reader.onload = function (event) {
            setPdf(event.target.result)
            setPdfDone(true)
        }
    }
    useEffect(() => {
        if (!pdfId) return
        async function checkForPdf() {
            setPdfDone(false) 
            if (purpose === 'dashboardDocDisplay'){
                await getPdf()        
            }
        }
        checkForPdf()
    }, [pdfId])
    useEffect(() => {    
        if(!timer) return;
        return () => clearTimeout(timer)
    }, [timer])
    
    const processFunction = async () => {
        const res = await executionFunction()
        console.log(res)
        if (res.success) setAlert({type:'success', message: res.success})
        else if (res.error) setAlert({type:'error', message: res.error}) 
    }
    const handleDropdown = async (shouldDelete) => {
        if (shouldDelete === 'yes') await executionFunction('deleteDoc')
    }
    const componentsFor = {
        summaryDelete: 
            <Box>
                <Typography variant='body'>Are you sure you want to delete?</Typography>
                <Typography variant='h6'>{content}</Typography>
                <Button variant='outlined' onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant='contained' onClick={processFunction}>Yes</Button>
            </Box>,
        downloadDocument: 
            <>
                <Button variant='contained' onClick={() => setOpen(false)}>Continue Editing</Button>
                <Button variant='contained' color='success' onClick={processFunction}>Download Document</Button>
            </>,
        dashboardDocDisplay:
            <Box>
                {/* Note: Conditional rendering does not work with the document component.For some reason, even when conditional rendering prevents the component from being displayed, it will still process the pdf source file and attempt to initite an instance of a document. Those processes dont actually execute untill it is fully rendered on the screen, and we get 'Worker was destroyed' errors for the previous times it processed the source before it was ready, then properly renders the final source on the screen. 
                
                To work around this I am using a component to overlay over the document component until the final pdf source has been processed and rendering is complete */}
                <Box sx={{position: 'relative', height: '450px', width: '400px'}}>
                    {loading && <Box sx={{position: 'absolute', zIndex: 5, width: '100%', backgroundColor: 'blue', height: '100%' }}>Loading..</Box>}
                    {<Document file={pdf} onLoadError={(error) => console.log(error,'pdf at the time:', pdf)} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} height={400} />
                        ))}
                    </Document>}
                </Box>
                <Box sx={{display: 'flex', width:'100%', justifyContent: 'center', gap:'30px'}}>
                <Button variant="contained" onClick={async () => await executionFunction('editDoc')}>Edit Document</Button>
                <Dropdown items={['yes', 'no']} labelName={'delete'} labelId={'doc-delete'} onClickFunction={handleDropdown} icon={<DeleteIcon/>} color={'red'} px={'3px'} />
                </Box>
                        
            </Box>
    }
    return (
    <Modal
        open={open}
        onClose={() => {setOpen(false); setAlert(null); setLoading(true); pdfId(null);}}
    >
        {alert ? 
            <Alert severity={alert.type}>{alert.message}</Alert>
        : 
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '300px',
                width: '50%',
                minHeight: 300,
                display: 'flex',
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: 24,
            }}>
                
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px'
                    }}
                >
                    {componentsFor[purpose]}
                </Box>
            </Box>}
        

    </Modal>
  )
}

export default ModalWindow
