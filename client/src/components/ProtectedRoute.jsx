import { React, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './hooks/auth'
import { useDocument } from './hooks/document'

const ProtectedRoute = ({children, required}) => {
    
    const auth = useAuth()
    console.log('Protected user:', auth)
    const document = useDocument()
    const [loading, setLoading] = useState(true)
    console.log('protected route rendering, loading:', loading)

    useEffect(() => {
        //Verify user 
        auth.getUser()
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [])

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

  //TODO: Change this to a loading indicator
  if (loading) return <div>Loading.....</div>
  else return operations[required]() || children;
}

export default ProtectedRoute