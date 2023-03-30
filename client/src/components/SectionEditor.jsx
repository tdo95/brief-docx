import { React, useState, useEffect } from 'react'
import { Tabs, Tab, Box, Typography, Button, TextField, IconButton } from '@mui/material'
import TabPanel from './TabPanel'
import SectionPage from './SectionPage'
import { useDocument } from '../context/document'
import CloseIcon from '@mui/icons-material/Close';

const SectionEditor = ({setRefreshDocumentocument, summaries}) => {
  const document = useDocument();
  const formatSections = () => {
    const list = document.editing.template.toLowerCase() === 'work' ? ['corp', 'competitor', 'industry', 'opinion'] : sections.list;
    
    return summaries.reduce((section, summary) => {
      if (!section.list.includes(summary.section)) section.list.push(summary.section);
      if (!section[summary.section])section[summary.section] = [];
      section[summary.section].push(summary);
      return section;
    }, {list})
  }
  const [value, setValue] = useState(0);
  const [sections, setSections] = useState({list: []})
  const [openForm, setOpenForm] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({
    sectionTitle: ''
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    const newSections = formatSections()
    setSections(newSections)
  }, [summaries])
  const handleForm = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]:value,
    }))
  }
  const addSection = () => {

    if (openForm) {
      const title = form.sectionTitle.toLowerCase().trim()
      if (!title.length) return setFormError('Please enter a title')
      if (sections.list.includes(title)) return setFormError('This title already exists')
      //save form name
      sections.list.push(title)
      //trigger change to update
      setRefreshDocumentocument(prev => !prev)
      //close form
      setOpenForm(false)
    }
    else {
      //open form to enter section name
      setOpenForm(true)
    }
    //reset form errors
    setFormError('')
    //clear section title
    setForm(prev => ({
      ...prev,
      sectionTitle: ''
    }))
  }

  return (
    <Box sx={{width: '100%'}}>
      {
        !!sections.list?.length &&
          <Box>
            {/* Dynamically generate tabs and tab panels */}
            <Tabs value={value} onChange={handleChange}>
              {sections.list?.map((label,i) => <Tab key={i} label={label.length > 15 ? label.slice(0,15) + '...' : label}/>)}
            </Tabs>
            {sections.list?.map((label,i) => 
              <TabPanel key={i} value={value} index={i}>
                <SectionPage 
                  sectionName={label}
                  setRefreshDocumentocument={setRefreshDocumentocument}
                  summaries={(sections[label] || [])}
                  sectionsList={(sections?.list || [])}
                />
              </TabPanel>
            )}
          </Box> 
      }
      {
        document.editing.template.toLowerCase() !== 'work' && 
          <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', gap: '20px' }}>
            { !sections.list?.length && <Typography>Looks like you dont have any note sections yet. Add one below!</Typography>}
            <Box sx={{display:'flex', gap: '10px', alignItems:'start', ml:!sections.list?.length ? '0' : 'auto', height: '40px'}}>
              {
                openForm &&
                  <>
                    <IconButton onClick={() => setOpenForm(false)}>
                      <CloseIcon />
                    </IconButton>
                    <TextField
                      name='sectionTitle'
                      label='Section Title'
                      placeholder='Enter section title'
                      size='small'
                      value={form.sectionTitle}
                      onChange={handleForm}
                      helperText={formError}
                      error={!!formError}
                    />
                  </>
              }
              <Button variant='outlined' onClick={addSection} >{ openForm ? 'Save' : 'Add Section'}</Button>
            </Box>
            
          </Box>
      }
    </Box>
  )
}

export default SectionEditor