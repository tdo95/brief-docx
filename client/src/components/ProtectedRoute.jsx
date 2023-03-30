import { React, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { useDocument } from '../context/document'
import { Oval } from 'react-loader-spinner'

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

  //Change this to a loading indicator
  if (loading) return (<Box sx={{display: 'flex', width: '100%', height: '80vh', justifyContent: 'center', alignItems:'center'}}>
                            <Oval
                                height={80}
                                width={80}
                                color="#066fd5"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#066fd5"
                                strokeWidth={5}
                            />
                        </Box>)
  else return operations[required]() || children;
}

export default ProtectedRoute