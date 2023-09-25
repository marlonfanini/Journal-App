import { createSlice } from '@reduxjs/toolkit';

export const  JournalSlice = createSlice({
name: 'label',
initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [], 
    active: null, 
    },
reducers: {
        addNewNote: (state, action) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action ) => {
            state.notes.push(action.payload);
            state.isSaving = false; 
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = ""
        }, 
        setNotes: (state, action) => {
            state.notes = action.payload;
           
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = ""
            //Mensaje de error 
        }, 
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(notes=> {
                if (notes.id === action.payload.id) {
                    return action.payload;
                } else {
                    return notes
                }
                 
            })

            state.messageSaved =  `${action.payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageurl = [...state.active.imageurl, action.payload];
            state.isSaving = false;
        }, 
        deleteNoteByID: (state, action) => {

        }
    }
});
// Action creators are generated for each case reducer function
export const { 
    addNewNote,
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updateNote, 
    setPhotosToActiveNote,
    deleteNoteByID } = JournalSlice.actions;