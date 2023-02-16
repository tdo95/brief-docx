import { React, useCallback } from 'react'
import { useBlocker } from './hooks/prompt.blocker'
import { useDocument } from './context/document'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const CreateDocument = () => {
    const getTemplate = async () => {
        //TODO: Template name in fetch statement is derived from template name stored in context or from document info pulled from database
        const res = await fetch('/document/template/allogene')
        const data = await res.json();
        if (data.error) return alert(`${data.error}`)

        const blob = await res.blob()
        return blob;
    }
    const generateDocument = async () => {
        const reader = new FileReader()
        const template = await getTemplate()
        reader.readAsBinaryString(template)
        reader.onerror = function (event) {
            console.log('Error reading file: ', event)
        }
        reader.onload = function (event) {
            const content = event.target.result;

            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true, 
                linebreaks: true
            })
            doc.setData({
                first_name: 'Tee',
                last_name: 'O',
                phone: '09090909',
                description: 'This is a test, please hold your horses and pray that it works.',
            })
            try {
                // render the document and replace all occurence of the template placeholders with the data
                doc.render()
            } catch (error) {
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce((error, key) => {error[key] = value[key]; return error}, {})
                    }
                    return value;
                }
                console.log(JSON.stringify({error: error}, replaceErrors))

                if (error.properties && error.properties.errors instanceof Array) {
                    const errorMessages = error.properties.errors
                        .map((error) => error.properties.explaination)
                        .join('\n');
                    console.log('Error Messages:', errorMessages)
                    throw error;
                }

            }
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            })
            saveAs(out, 'test.docx')

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
    <div><button onClick={generateDocument}>Generate Document</button></div>
  )
}

export default CreateDocument