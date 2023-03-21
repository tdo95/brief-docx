import {React, useState} from 'react'
import { Button } from '@mui/material'
import Form from './Form'
const SectionPage = ({sectionName, summaries, setChangeInSummaries}) => {
    const today = new Date();
    const [toggleForm, setToggleForm] = useState(false)
    const [lastEnteredDate, setLastEnteredDate] = useState({regular: today.toLocaleDateString('en-CA'), formatted: today.toLocaleDateString('en-US')})
  return (
    <div>
        <Button 
          variant='contained' 
          onClick={() => setToggleForm(prev => !prev)}
        >       
          {toggleForm ? 'X' : 'Add Story'}
        </Button>
        { toggleForm && 
          <Form 
           section={sectionName} 
           lastEnteredDate={lastEnteredDate} 
           setLastEnteredDate={setLastEnteredDate}
           setChangeInSummaries={setChangeInSummaries} 
          /> 
        }
        {summaries.map(item => <p>{item.title}</p>)}
    </div>
  )
}

export default SectionPage