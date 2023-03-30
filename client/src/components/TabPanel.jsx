import React from 'react'
import { Box, Typography } from '@mui/material'
const TabPanel = ({children, value, index}) => {
  return (
    <div
        style={{borderTop: 'solid 1px lightgray'}}
        role={'tabpanel'}
        hidden={value !==index}
        aria-labelledby={`section-tab-${index}`}
    >
        <Box sx={{pt:4, pl:4,pb:4, pr: 0,  }}>
            <Box >{children}</Box>
        </Box>
    </div>
  )
}

export default TabPanel