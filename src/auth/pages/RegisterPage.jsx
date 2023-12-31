import {Link as RouterLink} from 'react-router-dom'
import { Button, Grid, TextField, Typography, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [formsubmited, setformsubmited] = useState(false)

  const { displayName, email, password, onInputChange, formState, 
    isFormValid, displayNameValid, emailValid, passwordValid 
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault()
    setformsubmited(true)
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
  
  
<AuthLayout title='Crear cuenta'>
<h1>Form Valid {isFormValid? 'correcto': 'incorrecto'}</h1>
<form className = "animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>

<Grid container>

  <Grid item xs={12} sx={{mt: 2}}>
    <TextField 
    label="Nombre completo" 
    type="text" 
    placeholder='Tu nombre completo'  
    fullWidth
    name = "displayName"
    value = {displayName}
    onChange={onInputChange}
    error = { !!displayNameValid && formsubmited}
    helperText = {displayNameValid}
    /> 
  </Grid>

  <Grid item xs={12} sx={{mt: 2}}>
    <TextField 
    label="Correo" 
    type="email" 
    placeholder='correo@google.com'  
    fullWidth
    name = "email"
    value = {email}
    onChange={onInputChange}
    error = { !!emailValid && formsubmited }
    helperText = {emailValid}
    /> 
  </Grid>

  <Grid item xs={12} sx={{mt: 2}}>
    <TextField 
    label="Contraseña" 
    type="password" 
    placeholder='Contraseña'  
    name = "password"
    value = {password}
    onChange={onInputChange}
    error = { passwordValid && formsubmited}
    helperText = {passwordValid}
    fullWidth/> 
  </Grid>

  <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
    <Grid item xs={12} sm={6} >
      
      <Button  type ="submit" variant='contained' fullWidth>
      Crear cuenta 
      </Button>
      </Grid> 
    </Grid>

<Grid container direction='row' justifyContent='end'>
  <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
<Link component={RouterLink} olor='inherit' to="/auth/login">
Ingresar
</Link>
</Grid>


</Grid>

</form>


   </AuthLayout>

  )
}


