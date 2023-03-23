import { Typography, Stack, IconButton, Box, Menu, MenuItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Form from './Form'
import { React, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { useDocument } from './context/document'

const SummaryItem = ({summaryData, setChangeInSummaries }) => {
    const document = useDocument() 
    const [editingSummary, setEditingSummary] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [setModalFunction, setModalContent, setOpenModal] = useOutletContext()
    const openOptions = (event) => {
        setAnchorElNav(event.currentTarget)
    };
    const deleteSummary = async () => {
      //delete summary
      const res = await document.deleteSummary(summaryData._id);
      setChangeInSummaries(prev => !prev)
      return res
    }
    const setupModal = () => {
      console.log(setModalFunction)
      //close more options menu
      setAnchorElNav(null)
      setModalFunction(() => deleteSummary)
      setModalContent(summaryData.title)
      setOpenModal(true)
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
              <MenuItem sx={{color:'red', fontWeight: 'medium'}} onClick={setupModal}>Delete Summary</MenuItem>
            </Menu>
        </Stack>
        {editingSummary && <Form summaryData={summaryData} editingSummary={true} setChangeInSummaries={setChangeInSummaries} />}
    </Box>
  )
}

export default SummaryItem