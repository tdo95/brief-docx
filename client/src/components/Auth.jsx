import { React, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import { useAuth } from './hooks/auth';

const Auth = ({ login }) => {
    const [authForm, setAuthForm] = useState({
        _name: '',
        _username: '',
        _password: '',
        _passwordConfirm: '',
        _email: '' 
    })
    const handleFormInput = (event) => setAuthForm(prev => ({
        ...prev,
        [event.target.name]: event.target.value
    }))
    const submitForm = (event) => {
        event.preventDefault()
        console.log('Submitting form! (:')
        //TODO: Add logic to submit form
    }
    const auth = useAuth()
    //Redirects from login page to dashbaord if user is logged in
    if (login && auth.user) { return <Navigate to='/'/>}
    
    return (
    <Container sx={{pt:3, display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <Typography sx={{textAlign: 'center'}} variant='h3'>{login ? 'Login' : 'Sign Up' }</Typography>
        { login ? <Box autoComplete='off' component='form' sx={{display: 'flex', flexDirection:'column', alignItems:'center', p: 2, '& > *': {m:'10px', width: '25ch'}}}>
            <TextField 
               required
               label='username'
               name='_username'
               id='outlined-input'
               value={authForm['_username']}
               onChange={handleFormInput}
               
            />
            <TextField 
               required
               label='password'
               name='_password'
               id='outlined-input'
               value={authForm['_password']}
               onChange={handleFormInput}
            />
        </Box> :
        <Box autoComplete='off' component='form' sx={{display: 'flex', flexDirection:'column', alignItems:'center', p: 2, '& > *': {m:'10px', width: '25ch'}}}>
            <TextField 
               required
               label='name'
               name='_name'
               id='outlined-input'
               value={authForm['_name']}
               onChange={handleFormInput}
            />
            <TextField 
               required
               label='email'
               name='_email'
               id='outlined-input'
               value={authForm['_email']}
               onChange={handleFormInput}
            />
            <TextField 
               required
               label='username'
               name='_username'
               id='outlined-input'
               value={authForm['_username']}
               onChange={handleFormInput}
            />
            <TextField 
               required
               label='password'
               name='_password'
               id='outlined-input'
               value={authForm['_password']}
               onChange={handleFormInput}
            />
            <TextField 
               required
               label='Password Confirmation'
               name='_passwordConfirm'
               id='outlined-input'
               value={authForm['_passwordConfirm']}
               onChange={handleFormInput}
            />
        </Box>}
        <Button variant='contained' onClick={submitForm}>{login ? 'Log In' : 'Sign Up' }</Button>
    </Container>
  )
}

export default Auth