import { React, useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import TabPanel from './TabPanel'
import SectionPage from './SectionPage'

const SectionEditor = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box>
      <Box>
        {/* TODO: Dynamically generate tabs and tab panels */}
        <Tabs value={value} onChange={handleChange}>
          <Tab label='corp'>Corp</Tab>
          <Tab label='competitor'>Competitor</Tab>
          <Tab label='industry'>Industry</Tab>
          <Tab label='opinion'>Opinion Leader</Tab>
        </Tabs>
        <TabPanel value={value} index={0}>
          <SectionPage sectionName={'Corp'} />
        </TabPanel>
        <TabPanel value={value} index={1}>Competitor</TabPanel>
        <TabPanel value={value} index={2}>Industry</TabPanel>
        <TabPanel value={value} index={3}>Opinion</TabPanel>
      </Box>

    </Box>
  )
}

export default SectionEditor