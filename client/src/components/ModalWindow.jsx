import { React, useState } from 'react'
import { Modal, Box, Typography, Alert, Button } from '@mui/material'

const ModalWindow = ({ executionFunction, contentTitle, open, setOpen}) => {
    const [alert, setAlert] = useState(null)
    const deleteSum = () => console.log('delete')
    const deleteItem = async () => {
        console.log('deleting item from modal')
        console.log(executionFunction)
        const res = await executionFunction()
        // console.log(res)
        if (res.success) setAlert({type:'success', message: 'Success! Your item has been deleted.'})
        else setAlert({type:'error', message: 'Opps! An error occured while trying to delete your item. Please try again later.'}) 
        
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
                width: 400,
                backgroundColor: 'white',
                boxShadow: 24,
            }}>
                <Typography variant='body'>Are you sure you want to delete?</Typography>
                <Typography variant='h6'>{contentTitle}</Typography>
                <Button variant='outlined' onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant='contained' onClick={deleteItem}>Yes</Button>
                
            </Box>}
        

    </Modal>
  )
}

export default ModalWindow
