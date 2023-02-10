import { React, useCallback } from 'react'
import { useBlocker } from './hooks/prompt.blocker'
import { useDocument } from './context/document'


const CreateDocument = () => {
    const onLeavePrompt = `Are you sure you want to leave?\nAny changes not yet saved will be lost.`;
    const document = useDocument();

   //Prompts user to confirm navigation and sets editing to false if user chooses to navigate away
    const confirmNavigation = (tx) => {
        if ( window.confirm( onLeavePrompt ) ) { 
            //Set editing context to false
            document.setEditing(false);
            tx.retry();
        }
        
    }
    useBlocker(useCallback(confirmNavigation, []))

  return (
    <div>CreateDocument</div>
  )
}

export default CreateDocument