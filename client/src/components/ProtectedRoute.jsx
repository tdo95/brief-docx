import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './hooks/auth'
import { useDocument } from './hooks/document'

const ProtectedRoute = ({children, required}) => {
    const auth = useAuth()
    const document = useDocument()
    //returns new nagivation route if required operation is denied
    const operations = {
        login: () => {
            if (!auth.user) return <Navigate to='/product' />
        },
        //TODO: implement global context to store template currently being edited
        template: () => {
            if (!document.editing) return <Navigate to='/new' />
        }
    }
  return operations[required]() || children;
}

export default ProtectedRoute