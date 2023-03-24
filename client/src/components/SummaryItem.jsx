import { Typography, Stack, IconButton, Box, Menu, MenuItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Form from './SummaryForm'
import { React, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { useDocument } from './context/document'
import SimilarForm from './SimilarForm';
import SimilarItem from '../SimilarItem';

const SummaryItem = ({summaryData, setChangeInSummaries, lastEnteredDate }) => {
    const document = useDocument() 
    const [editingSummary, setEditingSummary] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [creatingSimilar, setCreatingSimilar] = useState(false)
    const [setModalFunction, setModalContent, setOpenModal, setPurpose] = useOutletContext()
    const openOptions = (event) => {
        setAnchorElNav(event.currentTarget)
    };
    const deleteSummary = async () => {
      //delete summary
      const res = await document.deleteSummary(summaryData._id);
      if (res.success) {
        setChangeInSummaries(prev => !prev)
        return ({success: 'Success! Summary has been removed'})
      }
      else return ({error: 'Opps! An error occured while trying to delete this summary. Please try again later.'})
    }
    const triggerModal = () => {
      //close more options menu
      setAnchorElNav(null)
      setModalFunction(() => deleteSummary)
      setModalContent(summaryData.title)
      setPurpose('summaryDelete')
      setOpenModal(true)
    }
    const openSimilarForm = () => {
      setAnchorElNav(null)
      setEditingSummary(false)
      setCreatingSimilar(true)
    }
  return (
    <Box>
        <Stack sx={{alignItems: 'center', flexDirection:'row'}}>
            <Typography variant='h6'>{summaryData.title}</Typography>
            <IconButton aria-label='edit summary' onClick={() => setEditingSummary(prev => !prev)}>
                {editingSummary ? <CloseIcon /> : <EditIcon />}
            </IconButton>
            <IconButton aria-label='more options' onClick={openOptions}>
                {<MoreHorizIcon />}
            </IconButton>
            <Menu
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              anchorEl={anchorElNav}
            >
              <MenuItem sx={{
                color: 'dimgray',
                fontWeight: 'medium'
              }} onClick={openSimilarForm}>Add Similar Story</MenuItem>
              <MenuItem sx={{color:'red', fontWeight: 'medium', opacity: '.6'}} onClick={triggerModal}>Delete Summary</MenuItem>
            </Menu>
        </Stack>
        {editingSummary && <Form summaryData={summaryData} editingSummary={true} setChangeInSummaries={setChangeInSummaries} />}
        {/* TODO: Render similar stories here */}
        <Stack sx={{ml: '40px'}}>
          <SimilarItem />
        </Stack>
        {creatingSimilar && <SimilarForm lastEnteredDate={lastEnteredDate} setCreatingSimilar={setCreatingSimilar} setChangeInSummaries={setChangeInSummaries}/>}
        
    </Box>
  )
}

export default SummaryItem