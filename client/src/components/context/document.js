import { useContext, createContext, React, useState } from 'react'

const Document = createContext(null);

export const DocumentProvider = ({ children }) => {
    const [editing, setEditing] = useState(null);

    //API call to create new document in database
    async function createDocument(template) {
        const res = await fetch('/document/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({template})
        })

        const data = await res.json();

        return data;
    }
    //TODO: API call to find document created in database and store globally within application 
    function addGlobalDocument(id) {

    }
    //TODO: Remove globally stored document value
    function removeGlobalDocument() {

    }
    //TODO: Function that saves changes made to document within the database
    return (<Document.Provider value={{editing, setEditing, createDocument, addGlobalDocument, removeGlobalDocument}}>{ children }</Document.Provider>)
}

export const useDocument = () => {
    return useContext(Document);
}