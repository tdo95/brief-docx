import { useContext, createContext, React, useState } from 'react'
const Document = createContext(null);

export const DocumentProvider = ({ children }) => {
    //Object that stores information about the document - template type and object ID
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

        //Set document as being edited
        setEditing(data.document)

        return data;
    }

    //delete document
    async function deleteDocument(docId) {
        const res = await fetch(`/document/delete/${docId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await res.json()
        return data
    }
    
    //Retreive users documents
    async function getUserDocuments(userId) {
        const res = await fetch(`/document/${userId}`);
        const data = await res.json()
    
        //sort documents by last edited, Note: consider reverse method over sort for potential performance optimaization
        data.sort((a,b) => new Date(b.lastEdited) - new Date(a.lastEdited))
        return data;
    }

    //Update document
    async function updateDocument(info) {
        const res = await fetch(`/document/update/${editing._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info),
        })
        const data = await res.json();
        
        if (data.error) return data;
        else setEditing(data.document)
        return data
    }
    async function addSummary(formData) {
        const res = await fetch(`/summaries/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, docId: editing._id}),

        })
        const data = await res.json()
        
        return data;
    }

    async function getDocumentSummaries(docId) {
        
        const res = await fetch(`/summaries/${docId}`);
        const data = await res.json()
        
        return data;
        
    }

    async function updateSummary(summaryId, formData) {
        const res = await fetch(`/summaries/update/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, summaryId: summaryId, docId: editing._id}),
        })
        const data = await res.json()
        
        return data;
    }

    async function deleteSummary(summaryId) {
        const res = await fetch(`/summaries/delete/${editing._id}/${summaryId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await res.json()
        return data
    }

    async function addSimilar(summaryId, similarData) {
        const res = await fetch(`/summaries/similar/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                summaryId: summaryId,
                story: similarData, 
                docId: editing._id
            })
        })
        const data = await res.json()
        return data
    }

    async function updateSimilar(summaryId, similarData, similarId) {
        const res = await fetch(`/summaries/similar/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                summaryId: summaryId,
                story: similarData,
                similarId: similarId,
                docId: editing._id
            })
        })
        const data = await res.json()
        return data
    }
    async function deleteSimilar(similarId, summaryId) {
        const res = await fetch(`/summaries/similar/delete/${similarId}/${summaryId}/${editing._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await res.json()
        return data
    }

    async function changeSummarySection(summaryId, formData, newSection) {
        const res = await fetch(`/summaries/update/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                summaryId: summaryId, 
                docId: editing._id,
                link: formData.link,
                section: newSection,
                source: formData.source,
                description: formData.description,
                title: formData.title,
                date: formData.date
            }),
        })
        const data = await res.json()
        
        return data;
    }


    return (<Document.Provider value={{editing, setEditing, createDocument, deleteDocument, updateDocument, getUserDocuments, addSummary, getDocumentSummaries, updateSummary, deleteSummary, addSimilar, updateSimilar, deleteSimilar, changeSummarySection}}>{ children }</Document.Provider>)
}

export const useDocument = () => {
    return useContext(Document);
}