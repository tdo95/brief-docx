import {React, useState} from 'react'
import { Button } from '@mui/material'
import Form from './Form'
const SectionPage = ({sectionName, sectionSummary}) => {
    const [toggleForm, setToggleForm] = useState(false)
  return (
    <div>
        <Button 
          variant='contained' 
          onClick={() => setToggleForm(prev => !prev)}
        >       
          {toggleForm ? 'X' : 'Add Story'}
        </Button>
        { toggleForm && <Form section={sectionName} /> }
    </div>
  )
}

export default SectionPage