import { Typography, Stack, IconButton, Box, Menu, MenuItem, FormControl, InputLabel } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Form from './SummaryForm'
import { React, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { useDocument } from '../context/document'
import SimilarForm from './SimilarForm';
import SimilarItem from './SimilarItem';
import Dropdown from './Dropdown';

const SummaryItem = ({summaryData, setRefreshDocumentocument, lastEnteredDate, sectionsList }) => {
    const document = useDocument() 
    const [editingSummary, setEditingSummary] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [creatingSimilar, setCreatingSimilar] = useState(false)
    const [setModalFunction, setModalContent, setOpenModal, setPurpose, setModalAlert] = useOutletContext()
    const openOptions = (event) => {
        setAnchorElNav(event.currentTarget)
    };
    const deleteSummary = async () => {
      //delete summary
      const res = await document.deleteSummary(summaryData._id);
      if (res.success) {
        setRefreshDocumentocument(prev => !prev)
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
    const changeSection = (newSection) => {
      setAnchorElNav(null)
      const res = document.changeSummarySection(summaryData._id, summaryData, newSection);
    
      if (res.error) {
        //open modal with error message
        setModalAlert({type:'error', message: 'Opps! There was an error changing the summary section. Please try again later.'})
        setOpenModal(true)
      } else {
        //trigger re-render
        setRefreshDocumentocument(prev => !prev)
      }

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
                color: '#066fd5',
                fontWeight: 'medium', opacity: '.8'
              }} onClick={openSimilarForm}>{document.editing.template === 'Allogene' ? 'Add Similar Story' : 'Add Reference'}</MenuItem>
              <MenuItem sx={{color:'red', fontWeight: 'medium', opacity: '.6'}} onClick={triggerModal}>Delete Summary</MenuItem>
              <MenuItem sx={{'&:hover': {backgroundColor: 'transparent'}}}>
                <Dropdown items={sectionsList} labelName='Change Sections' labelId='change-section' onClickFunction={changeSection}/>
              </MenuItem>
            </Menu>
        </Stack>
        {editingSummary && <Form summaryData={summaryData} editingSummary={true} setRefreshDocumentocument={setRefreshDocumentocument} />}
        {/* Rendering similar stories here */}
        {!!summaryData.similarStories.length && <Typography>{document.editing.template === 'Allogene' ? 'Similar:' : 'References:'}</Typography>}
        <Stack sx={{ml: '40px'}}>
          {summaryData.similarStories.map(story => <SimilarItem key={story._id} similarData={story} lastEnteredDate={lastEnteredDate} setRefreshDocumentocument={setRefreshDocumentocument} setCreatingSimilar={setCreatingSimilar} summaryId={summaryData._id} />)}
        </Stack>
        {creatingSimilar && <SimilarForm summaryId={summaryData._id} lastEnteredDate={lastEnteredDate} creatingSimilar={creatingSimilar}setCreatingSimilar={setCreatingSimilar} setRefreshDocumentocument={setRefreshDocumentocument}/>}
        
    </Box>
  )
}

export default SummaryItem