import { React, useCallback } from 'react'
import { useBlocker } from './hooks/prompt.blocker'
import { useDocument } from './context/document'
import { saveAs } from 'file-saver'


const CreateDocument = () => {
    
    const serverGen = async () => {
        const res = await fetch('/document/generate/allogene')
        const out = await res.blob()
        saveAs(out, 'tes.pdf')

    }
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
    <div><button onClick={serverGen}>Generate Document</button></div>
  )
}

export default CreateDocument