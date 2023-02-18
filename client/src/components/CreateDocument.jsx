import { React, useCallback, useState } from 'react'
import { useBlocker } from './hooks/prompt.blocker'
import { useDocument } from './context/document'
import { saveAs } from 'file-saver'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import testPDF from './test/outpdf.pdf'

const CreateDocument = () => {
    const [pdf, setPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    const serverGen = async () => {
        const res = await fetch('/document/generate/allogene')
        const data = await res.blob()
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onerror = function (event) {
            console.log('Error reading file: ', event)
        }
        reader.onload = function (event) {
            setPdf(event.target.result)
        }
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
    <div className='docContainer'>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
        <button onClick={serverGen}>Generate Document</button>
    </div>
  )
}

export default CreateDocument