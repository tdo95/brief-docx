import { React, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material' 
import ModalWindow from './ModalWindow'

const Home = () => {
    const [openModal, setOpenModal] = useState(false)
    const [modalFunction, setModalFunction] = useState(null)
    const [modalContent, setModalContent] = useState(null)
  return (
    <Container sx={{px: 10, py: 3}}>
      <Outlet context={[setModalFunction, setModalContent, setOpenModal]}></Outlet>
      <ModalWindow open={openModal} setOpen={setOpenModal} contentTitle={modalContent} executionFunction={modalFunction}/>
    </Container>
  )
}

export default Home
