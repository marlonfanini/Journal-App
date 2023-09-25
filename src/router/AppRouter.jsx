
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { FirebaseAuth } from '../firebase/config'
import { JournalRoutes } from '../journal/roues/JournalRoutes'
import { login, logout } from '../store/auth/Authslice'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { StartLoadingNotes } from '../store/Journal/thunks'

export const AppRouter = () => {

  const {status} = useSelector( state => state.Authslice );
  const dispatch = useDispatch(); 

  let trunk = false

  useEffect(() => {
    
    if (!trunk ) {
      trunk = true

      onAuthStateChanged(FirebaseAuth, async (user) => {
        if (!user) return dispatch(logout())
        const {uid, email, displayName, photoURL} = user
        dispatch(login({uid, email, displayName, photoURL}))
        dispatch(StartLoadingNotes());
      })
    }
  
    
  }, [])
  

  if (status === 'checking') {
    return <CheckingAuth/>
  }
 
  return (
    <Routes>

      {
      
      (status === 'authenticated')
      ? <Route path="/*" element={<JournalRoutes/>} />
      : <Route path="/auth/*" element={<AuthRoutes/>}/>
       
      }

      <Route path = '/*' element ={<Navigate to = '/auth/login'/> } />  

    </Routes>
  )
}
