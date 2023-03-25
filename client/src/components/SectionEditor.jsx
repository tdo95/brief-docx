import { React, useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import TabPanel from './TabPanel'
import SectionPage from './SectionPage'
import { useDocument } from './context/document'
import { useEffect } from 'react'

const SectionEditor = ({setChangeInSummaries, summaries}) => {
  const document = useDocument();
  const formatSections = () => {
    const list = document.editing.template.toLowerCase() === 'allogene' ? ['corp', 'competitor', 'industry', 'opinion'] : [];
    
    return summaries.reduce((section, summary) => {
      if (!list.includes(summary.section)) list.push(summary.section);
      if (!section[summary.section])section[summary.section] = [];
      section[summary.section].push(summary);
      return section;
    }, {list})
  }
  const [value, setValue] = useState(0);
  const [sections, setSections] = useState({})
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    const newSections = formatSections()
    setSections(newSections)
  }, [summaries])

  return (
    <Box>
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

    </Box>
  )
}

export default SectionEditor