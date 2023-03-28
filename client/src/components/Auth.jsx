import { React, useState, useEffect } from 'react'
import { Navigate, redirect, useLocation } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import { useAuth } from '../context/auth';

const Auth = ({ login }) => {
    const auth = useAuth()
    const location = useLocation()
    //Each property has an underscore in order to avoid browser detection of input feild and autofilling values
    const [authForm, setAuthForm] = useState({
        _name: '',
        _password: '',
        _passwordConfirm: '',
        _email: '' 
    })
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    //cleanup inputs on location change 
    useEffect(() => {
        console.log('cleaning up inputs')
        setAuthForm({
            _name: '',
            _password: '',
            _passwordConfirm: '',
            _email: '' 
        })
        setError({
            name: '',
            email: '',
            password: '',
            passwordConfirm: ''
        })
    }, [location])
    const handleFormInput = (event) => setAuthForm(prev => ({
        ...prev,
        [event.target.name]: event.target.value
    }))
    //TODO: Refractor login and signup into one function
    const submitForm = (event) => {
        event.preventDefault()
        console.log('Submitting form! (:')
        
        if (login) 
            loginUser()
        else 
            signupUser()
    }
    const loginUser = async () => {
        const res = await auth.login(authForm['_email'], authForm['_password']);
        console.log('auth component res', res)
        if (res?.errors) setError(() => ({
            email: '',
            password: '',
            ...res.errors
        }))
        //if no errors, redirect to dashboard
        else if (res.success) redirect('/')

    }
    const signupUser = async () => {
        const res = await auth.signup(authForm)
        console.log(res)
        if (res?.errors) setError(prev => ({
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            ...res.errors
        }))
        //if no errors, redirect to dashboard
        else if (res.success) return redirect('/')
    }
    
    //Redirects from login page to dashbaord if user is logged in
    if (login && auth.user)  return <Navigate to='/' />

    
    
    return (
    <Container sx={{pt:3, display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <Typography sx={{textAlign: 'center'}} variant='h3'>{login ? 'Login' : 'Sign Up' }</Typography>
        { login ? <Box autoComplete='off' component='form' sx={{display: 'flex', flexDirection:'column', alignItems:'center', p: 2, '& > *.MuiFormControl-root': {m:'10px', width: '25ch'}}}>
            <TextField 
               required
               label='email'
               name='_email'
               id='outlined-input'
               value={authForm['_email']}
               onChange={handleFormInput}
               helperText={error.email}
               error={Boolean(error.email)}
            />
            {/* TODO: Hide password text somehow without the browser detecting its a password input feild lol idk if that's possible */}
            <TextField 
               required
               label='password'
               name='_password'
               id='outlined-input'
               value={authForm['_password']}
               onChange={handleFormInput}
               helperText={error.password}
               error={Boolean(error.password)}
            />
        </Box> :
        <Box autoComplete='off' component='form' sx={{display: 'flex', flexDirection:'column', alignItems:'center', p: 2, '& > *.MuiFormControl-root': {m:'10px', width: '25ch'}}}>
            <TextField 
               required
               label='name'
               name='_name'
               id='outlined-input'
               value={authForm['_name']}
               onChange={handleFormInput}
               helperText={error.name}
               error={Boolean(error.name)}
            />
            <TextField 
               required
               label='email'
               name='_email'
               id='outlined-input'
               value={authForm['_email']}
               onChange={handleFormInput}
               helperText={error.email}
               error={Boolean(error.email)}
            />
            <TextField 
               required
               label='password'
               name='_password'
               id='outlined-input'
               value={authForm['_password']}
               onChange={handleFormInput}
               helperText={error.password}
               error={Boolean(error.password)}
            />
            <TextField 
               required
               label='Password Confirmation'
               name='_passwordConfirm'
               id='outlined-input'
               value={authForm['_passwordConfirm']}
               onChange={handleFormInput}
               helperText={error.passwordConfirm}
               error={Boolean(error.passwordConfirm)}
            />
        </Box>}
        <Button variant='contained' onClick={submitForm}>{login ? 'Log In' : 'Sign Up' }</Button>
    </Container>
  )
}

export default Auth