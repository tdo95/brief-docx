import { React, useState } from 'react'
import { Card, Stack, Typography } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useDocument } from '../context/document'

const DocumentCard = ({ info, setRefresh }) => {
  const navigate = useNavigate()
  const document = useDocument()
  const [isHover, setIsHover] = useState(false)
  const [setModalFunction, setModalContent, setOpenModal, setPurpose, setModalAlert, setModalPdfId] = useOutletContext()
  const openMenu = () => {
    setModalPdfId(info._id)
    setModalFunction(() => performModalActions)
    setPurpose('dashboardDocDisplay')
    setOpenModal(true)
  }
  const performModalActions = async (action) => {
    if (action === 'getPdf') {
      return info._id
    } 
    else if (action === 'editDoc') {
      console.log('navigating to edit menu!')
      document.setEditing(info)
      setOpenModal(false)
      navigate('/create')
    } 
    else if (action === 'deleteDoc') {
      console.log('deleting doc!')
      const res = document.deleteDocument(info._id)
      if (res.error) setModalAlert({type:'error', message:'Oops! An error occured while trying to delete this document. Please try again later.'})
      else {
        setOpenModal(false)
        setRefresh(prev => !prev)
      }
    }

  }
  return (
    <Stack sx={{alignItems: 'center'}}>
      <Card
        onClick={openMenu} 
        onMouseEnter={() => setIsHover(true)} 
        onMouseLeave={() => setIsHover(false)} 
        sx={{
          width: 120, 
          minHeight: 150, 
          m:1, 
          display: 'flex', 
          alignItems:'center', 
          justifyContent:'center', 
          backgroundColor: isHover ? 'ghostwhite' : 'white'
        }}
      >
          { isHover ? <VisibilityIcon sx={{fontSize: '40px'}}/> : <ArticleIcon />}
      </Card>
      <Typography  variant='caption' sx={{width:120, textAlign: 'center'}}>
        {info.title.length > 60 ? info.title.slice(0,60) + '...' : info.title}
      </Typography>
    </Stack>
  )
}

export default DocumentCard