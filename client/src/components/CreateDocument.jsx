import { React, useCallback } from 'react'
import { useBlocker } from './hooks/prompt.blocker'
import { useDocument } from './context/document'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
// import expressionParser from 'docxtemplater/expressions.js'
import LinkModule from 'docxtemplater-link-module/browser/docxtemplater-link-module.v0.2.3.js'
function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const CreateDocument = () => {
    const current = new Date().toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + "";
    const getTemplate = async () => {
        //TODO: Template name in fetch statement is derived from template name stored in context or from document info pulled from database
        const res = await fetch('/document/template/allogene')

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
            const doc = new Docxtemplater(zip)
            const linkMod = new LinkModule();
            doc.attachModule(linkMod)
            doc.setData({
                date: current,
                hasCompetitor: true,
                hasCorp: true,
                corp: [
                    {
                        link: { 
                            text: 'This Is A Test Title For What A Potential Title Might Look Like', 
                            url: "http://google.com"
                        }, 
                        description: 'More words here to simulate an actual description with actual words, but for now there is just an empty void filling this space and not really making much sense so here is my manifesto yeah I said it.', 
                        source: 'Test Inc.', 
                        date: '2/13/2023'
                    },
                ],
                competitor: [
                    {
                        link: { 
                            text: 'This Is A Test Title For What A Potential Title Might Look Like', 
                            url: "http://google.com"
                        }, 
                        description: 'More words here to simulate an actual description with actual words, but for now there is just an empty void filling this space and not really making much sense so here is my manifesto yeah I said it.', 
                        source: 'Test Inc.', 
                        date: '2/13/2023'
                    },
                    {
                        link: {
                            text: 'A Tester Titler For A Potential Title', 
                            url: "http://youtube.com"
                        }, 
                        description: 'More words here to simulate an actual description with actual words, but for now there is just an empty void filling this space and not really making much sense so here is my manifesto yeah I said it.', 
                        source: 'Testering Inc.', 
                        date: '2/14/2023'
                    },
                    
                ],

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