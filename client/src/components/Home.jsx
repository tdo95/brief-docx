import { React, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material' 
import ModalWindow from './ModalWindow'

const Home = () => {
    const [openModal, setOpenModal] = useState(false)
    const [modalFunction, setModalFunction] = useState(null)
    const [modalContent, setModalContent] = useState(null)
    const [purpose, setPurpose] = useState(null)
  return (
    <Container sx={{px: 10, py: 3}}>
      <Outlet context={[setModalFunction, setModalContent, setOpenModal, setPurpose]}></Outlet>
      <ModalWindow 
        open={openModal} 
        setOpen={setOpenModal} 
        content={modalContent} 
        executionFunction={modalFunction} 
        purpose={purpose}
      />
    </Container>
  )
}

export default Home
