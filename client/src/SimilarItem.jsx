import {React, useState} from 'react'
import { Typography, Stack, IconButton, Box, Menu, MenuItem } from '@mui/material'
import SimilarForm from './components/SimilarForm'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const SimilarItem = ({ similarData = {}, lastEnteredDate, setChangeInSummaries }) => {
    const [editingSimilar, setEditingSimilar] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null)
    const openOptions = (e) => {
        setAnchorElNav(e.currentTarget)
    }
    const triggerModal = () => {}
  return (
    <Box sx={{opacity: '.5'}}>
        <Stack sx={{alignItems: 'center', flexDirection:'row'}}>
            <Typography variant='h6'>{similarData.title}</Typography>
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
              }} onClick={() => setEditingSimilar(true)}>Edit Similar Story</MenuItem>
              <MenuItem sx={{color:'red', fontWeight: 'medium', opacity: '.6'}} onClick={triggerModal}>Delete</MenuItem>
            </Menu>
        </Stack>
        {editingSimilar && <SimilarForm similarData={similarData} setChangeInSummaries={setChangeInSummaries} lastEnteredDate={lastEnteredDate} />}
    </Box>
  )
}

export default SimilarItem