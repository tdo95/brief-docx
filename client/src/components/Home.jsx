import { React, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material' 
import ModalWindow from './ModalWindow'

const Home = () => {
    const [openModal, setOpenModal] = useState(false)
    const [modalFunction, setModalFunction] = useState(null)
    const [modalContent, setModalContent] = useState(null)
    const [purpose, setPurpose] = useState(null)
    const [modalAlert, setModalAlert] = useState(null)
    const [modalPdfId, setModalPdfId] = useState(null)
  return (
    <Container sx={{px: 10, py: 3}}>
      <Outlet context={[setModalFunction, setModalContent, setOpenModal, setPurpose, setModalAlert, setModalPdfId]}></Outlet>
      <ModalWindow 
        open={openModal} 
        setOpen={setOpenModal} 
        content={modalContent} 
        executionFunction={modalFunction} 
        purpose={purpose}
        alert={modalAlert}
        setAlert={setModalAlert}
        pdfId={modalPdfId}

      />
    </Container>
  )
}

export default Home
