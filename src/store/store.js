import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { JournalSlice } from './Journal/JournalSlice'

export const store = configureStore({
  reducer: {
    Authslice: authSlice.reducer,
    journal: JournalSlice.reducer
  },
})

