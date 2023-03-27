import { React, useState } from 'react'
import { Tabs, Tab, Box, Typography, Button, TextField } from '@mui/material'
import TabPanel from './TabPanel'
import SectionPage from './SectionPage'
import { useDocument } from './context/document'
import { useEffect } from 'react'

const SectionEditor = ({setChangeInSummaries, summaries}) => {
  const document = useDocument();
  const formatSections = () => {
    const list = document.editing.template.toLowerCase() === 'allogene' ? ['corp', 'competitor', 'industry', 'opinion'] : [];
    
    return summaries.reduce((section, summary) => {
      if (!section.list.includes(summary.section)) section.list.push(summary.section);
      if (!section[summary.section])section[summary.section] = [];
      section[summary.section].push(summary);
      return section;
    }, {list})
  }
  const [value, setValue] = useState(0);
  const [sections, setSections] = useState({})
  const [openForm, setOpenForm] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    const newSections = formatSections()
    setSections(newSections)
    console.log('SECTIONS',sections)
  }, [summaries])
  const addSection = () => {
    //open form to enter section name
    setOpenForm(prev => !prev)
  }
  console.log('document:', document.editing)
  return (
    <Box>
      {
        document.editing.template.toLowerCase() !== 'allogene' && 
          <Box>
            { !sections.list?.length && <Typography>Looks like you dont have any note sections yet. Add one below!</Typography>}
            <Button variant='contained' onClick={addSection}>Add Section</Button>
            {openForm && <TextField />}
          </Box>
      }
      {
        !!sections.list?.length &&
          <Box>
            {/* Dynamically generate tabs and tab panels */}
            <Tabs value={value} onChange={handleChange}>
              {sections.list?.map((label,i) => <Tab key={i} label={label}/>)}
            </Tabs>
            {sections.list?.map((label,i) => 
              <TabPanel value={value} index={i}>
                <SectionPage 
                  sectionName={label}
                  setChangeInSummaries={setChangeInSummaries}
                  summaries={(sections[label] || [])}
                  sectionsList={(sections?.list || [])}
                />
              </TabPanel>
            )}
          </Box> 
          
      }
    </Box>
  )
}

export default SectionEditor