import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './hooks/userAuth'

const ProtectedRoute = ({children, required}) => {
    const auth = useAuth()
    const operations = {
        login: () => {
            if (!auth.user) return <Navigate to='/login' />
        },
        //TODO: implement global context to store template currently being edited
        template: () => {}
    }
    if (operations[required]) operations[required]();
  return children
}

export default ProtectedRoute