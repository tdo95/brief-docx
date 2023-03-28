import {React, useState} from 'react'
import { Typography, Stack, IconButton, Box, Menu, MenuItem } from '@mui/material'
import SimilarForm from './SimilarForm'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import CloseIcon from '@mui/icons-material/Close'
import { useOutletContext } from 'react-router-dom'
import { useDocument } from './context/document'

const SimilarItem = ({ summaryId, similarData = {}, lastEnteredDate, setChangeInSummaries, setCreatingSimilar }) => {
    const document = useDocument()
    const [editingSimilar, setEditingSimilar] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [setModalFunction, setModalContent, setOpenModal, setPurpose] = useOutletContext()
    const toggleFunctions = (e) => {
        if(editingSimilar) setEditingSimilar(false)
        else setAnchorElNav(e.currentTarget)
    }
    const deleteSimilar = async () => {
      //delete summary
      const res = await document.deleteSimilar(similarData._id, summaryId);
      console.log(res)
      if (res.success) {
        setChangeInSummaries(prev => !prev)
        return ({success: 'Success! Item has been removed'})
      }
      else return ({error: 'Opps! An error occured while trying to delete this item. Please try again later.'})
    }
    const triggerModal = () => {
      //close more options menu
      setAnchorElNav(null)
      //Close similar story form if open
      setCreatingSimilar(false)
      setModalFunction(() => deleteSimilar)
      setModalContent(similarData.title)
      setPurpose('summaryDelete')
      setOpenModal(true)
    }
    console.log('SIMILAR:',similarData)
  return (
    <Box sx={{opacity: '.5'}}>
        <Stack sx={{alignItems: 'center', flexDirection:'row'}}>
            <Typography variant='body2'>{similarData.title || similarData.link.source}</Typography>
            <IconButton aria-label='more options' onClick={toggleFunctions}>
                {editingSimilar ? <CloseIcon /> : <MoreHorizIcon />}
            </IconButton>
            <Menu
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              anchorEl={anchorElNav}
            >
              <MenuItem sx={{
                color: 'dimgray',
                fontWeight: 'medium'
              }} onClick={() => {setAnchorElNav(null); setCreatingSimilar(false); setEditingSimilar(true)}}>{document.editing.template === 'Allogene' ? 'Edit Similar Story' : 'Edit Reference'}</MenuItem>
              <MenuItem sx={{color:'red', fontWeight: 'medium', opacity: '.6'}} onClick={triggerModal}>Delete</MenuItem>
            </Menu>
        </Stack>
        {editingSimilar && <SimilarForm similarData={similarData} setChangeInSummaries={setChangeInSummaries} lastEnteredDate={lastEnteredDate} />}
    </Box>
  )
}

export default SimilarItem