import React from 'react'
import { Box, Typography } from '@mui/material'
const TabPanel = ({children, value, index}) => {
  return (
    <div
        role={'tabpanel'}
        hidden={value !==index}
        aria-labelledby={`section-tab-${index}`}
    >
        <Box sx={{p:4}}>
            <Box>{children}</Box>
        </Box>
    </div>
  )
}

export default TabPanel