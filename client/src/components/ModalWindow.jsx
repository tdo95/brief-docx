import { React, useState } from 'react'
import { Modal, Box, Typography, Alert, Button } from '@mui/material'

const ModalWindow = ({ executionFunction, content, open, setOpen, purpose, alert, setAlert}) => {
    const processFunction = async () => {
        const res = await executionFunction()
        console.log(res)
        if (res.success) setAlert({type:'success', message: res.success})
        else if (res.error) setAlert({type:'error', message: res.error}) 
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
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px'
                }}
            >
                <Button variant='contained' onClick={() => setOpen(false)}>Continue Editing</Button>
                <Button variant='contained' color='success' onClick={processFunction}>Download Document</Button>
            </Box>,
    }
    return (
    <Modal
        open={open}
        onClose={() => {setOpen(false); setAlert(null)}}
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
                
                {componentsFor[purpose]}
            </Box>}
        

    </Modal>
  )
}

export default ModalWindow
