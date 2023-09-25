import { useEffect, useMemo } from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuth, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: '',
  password: ''
}


export const LoginPage = () => {

  const {status, errorMessage} = useSelector(state => state.Authslice)  

  
  const dispatch = useDispatch();
  
  const { email, password, onInputChange } = useForm(formData);
  

  const onSubmit = ( event ) => {
    event.preventDefault();

    console.log({email, password})
    dispatch(startLoginWithEmailPassword(email, password))
    

  }

  const onGoogleSignIn = () => {
      console.log('onGoogleSignIn')
      dispatch(startGoogleSignIn())
  }

  return (
  
  
<AuthLayout title='Login'>

<form className = "animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>

<Grid container>

  <Grid item xs={12} sx={{mt: 2}}>
    <TextField 
    label="Correo" 
    type="email" 
    placeholder='correo@google.com'  
    name="email"
    onChange = {onInputChange}
    value= {email}
    fullWidth/> 
  </Grid>

  <Grid item xs={12} sx={{mt: 2}}>
    <TextField 
    label="Contraseña" 
    type="password" 
    placeholder='Contraseña'  
    name="password"
    onChange = {onInputChange}
    value= {password}
    fullWidth/> 
  </Grid>

   <Grid container >
      <Grid
      item 
      xs={12}
      display = {errorMessage? '': 'none'} >
        <Alert severity='error'> {errorMessage} </Alert>
      </Grid> 
    
    
    </Grid> 


  <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
    <Grid item xs={12} sm={6} >
      
      <Button  type='submit' variant='contained' fullWidth>
      Login
      </Button>
      </Grid> 
    <Grid item xs={12} sm={6}>
      
      <Button  onClick={onGoogleSignIn} variant='contained' fullWidth>
      <Google/>
      <Typography sx={{ml: 1}}>Google</Typography>
      </Button>
      </Grid> 
    </Grid>

<Grid container direction='row' justifyContent='end'>
<Link component={RouterLink} olor='inherit' to="/auth/register">
Crear una cuenta 
</Link>
</Grid>



</Grid>

</form>


   </AuthLayout>

  )
}


