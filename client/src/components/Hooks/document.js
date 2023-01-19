import { useContext, createContext, React, useState } from 'react'

const Document = createContext(null);

const DocumentProvider = ({ children }) => {
    const [editing, setEditing] = useState(null);

    //TODO: API call to create new document in database
    function createDocument() {

    }
    //TODO: API call to find document created in database and store globally within application 
    function addGlobalDocument(id) {

    }
    //TODO: Remove globally stored document value
    function removeGlobalDocument() {

    }
    //TODO: Function that saves changes made to document within the database
    return (<Document.Provider value={{editing, createDocument, addGlobalDocument, removeGlobalDocument}}>{ children }</Document.Provider>)
}

export const useDocument = () => {
    return useContext(Document);
}