import {React, useState} from 'react'
import { Button } from '@mui/material'
import Form from './SummaryForm'
import SummaryItem from './SummaryItem'
import { useDocument } from './context/document'
const SectionPage = ({sectionName, summaries, setChangeInSummaries, sectionsList}) => {
    const today = new Date();
    const document = useDocument()
    const [toggleForm, setToggleForm] = useState(false)
    const [lastEnteredDate, setLastEnteredDate] = useState({regular: today.toLocaleDateString('en-CA'), formatted: today.toLocaleDateString('en-US')})
  return (
    <div>
        <Button 
          variant='contained' 
          onClick={() => setToggleForm(prev => !prev)}
        >       
          {toggleForm ? 'X' : document.editing.template === 'Allogene' ? 'Add Summary' : 'Add Note'}
        </Button>
        { toggleForm && 
          <Form 
           section={sectionName} 
           lastEnteredDate={lastEnteredDate} 
           setLastEnteredDate={setLastEnteredDate}
           setChangeInSummaries={setChangeInSummaries} 
          /> 
        }
        {summaries.map((item,i) => <SummaryItem key={i} summaryData={item} setChangeInSummaries={setChangeInSummaries}
        lastEnteredDate={lastEnteredDate} sectionsList={sectionsList.filter(name => name !== sectionName)}/>)}
    </div>
  )
}

export default SectionPage