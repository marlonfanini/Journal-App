import React from 'react'
import {Route,  Routes, Navigate} from 'react-router-dom'
import { JournalPage } from '../pages/JournalPage'

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<JournalPage/>} ></Route>
        <Route path="/*" element={<Navigate to="/" />}/>
    </Routes>
  )
}
