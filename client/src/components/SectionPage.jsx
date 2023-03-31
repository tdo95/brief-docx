import {React, useState} from 'react'
import { Button, Stack, Box } from '@mui/material'
import Form from './SummaryForm'
import SummaryItem from './SummaryItem'
import { useDocument } from '../context/document'
import useMediaQuery from '@mui/material/useMediaQuery';


const SectionPage = ({sectionName, summaries, setRefreshDocument, sectionsList}) => {
    const today = new Date();
    const document = useDocument()
    const [toggleForm, setToggleForm] = useState(false)
    const [lastEnteredDate, setLastEnteredDate] = useState({regular: today.toLocaleDateString('en-CA'), formatted: today.toLocaleDateString('en-US')})
    const greaterThan900 = useMediaQuery('(min-width:900px)')
    const lessThan500 = useMediaQuery('(max-width:600px)')

  return (
    <>
        <Box sx={{display: (greaterThan900 || lessThan500) ?'block' : 'flex', gap: '20px', height: (greaterThan900 || lessThan500) ? '550px': '400px', width: '100%'}}>
          <Stack sx={{width:(greaterThan900 || lessThan500) ? '95%' : '55%',  overflowY: 'auto', maxHeight:(greaterThan900 || lessThan500) ? document.editing.template === 'work' ? '450px' : '290px' : 'unset', mb:'20px' }}>
            <Button
              variant='contained'
              onClick={() => setToggleForm(prev => !prev)}
            >
              {toggleForm ? 'X' : document.editing.template === 'work' ? 'Add Summary' : 'Add Note'}
            </Button>
            { toggleForm &&
              <Form
               section={sectionName}
               lastEnteredDate={lastEnteredDate}
               setLastEnteredDate={setLastEnteredDate}
               setRefreshDocument={setRefreshDocument}
              />
            }
          </Stack>
          <Stack className='scroll' sx={{width:(greaterThan900 || lessThan500) ? '90%' : '50%', overflowY: 'auto', border:'1px solid lightgray', py: '5px', px: '15px', borderRadius:'10px', maxHeight:(greaterThan900 || lessThan500) ? document.editing.template === 'work' ? '200px' : '250px' : 'unset' }}>
            {summaries.map((item,i) => <SummaryItem key={i} summaryData={item} setRefreshDocument={setRefreshDocument}
            setLastEnteredDate={setLastEnteredDate}
            lastEnteredDate={lastEnteredDate} sectionsList={sectionsList.filter(name => name !== sectionName)}/>)}
          </Stack>
        </Box>
    </>
  )
}

export default SectionPage