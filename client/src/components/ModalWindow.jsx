import { React, useEffect, useState } from 'react'
import { Modal, Box, Typography, Alert, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Dropdown from './Dropdown';

const ModalWindow = ({ executionFunction, content, open, setOpen, purpose, alert, setAlert, pdfId}) => {
    const [pdf, setPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const getPdf = async () => {
        console.log('getting pdf')
        const res = await fetch(`/document/generate/allogene/${pdfId}/pdf`)
        const data = await res.blob()
        console.log(data)
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
        async function checkForPdf() { 
            if (purpose === 'dashboardDocDisplay'){
                await getPdf() 
            }
        }
        checkForPdf()
    }, [pdfId])
    
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
                {pdf && <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} height={400} />
                    ))}
                </Document>}
                <Box sx={{display: 'flex', width:'100%', justifyContent: 'center', gap:'30px'}}>
                <Button variant="contained" onClick={async () => await executionFunction('editDoc')}>Edit Document</Button>
                <Dropdown items={['yes', 'no']} labelName={'delete'} labelId={'doc-delete'} onClickFunction={handleDropdown} icon={<DeleteIcon/>} color={'red'} px={'3px'} />
                </Box>
                        
            </Box>
    }
    return (
    <Modal
        open={open}
        onClose={() => {setOpen(false); setAlert(null); setPdf(null)}}
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
