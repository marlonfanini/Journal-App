import { Button, Grid, IconButton, TextField, Typography, useFormControl } from '@mui/material'
import {SaveOutlined, UploadOutlined} from "@mui/icons-material"
import { ImageGallery } from '../Components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveNote } from '../../store/Journal/JournalSlice'
import { StartSavingNotes, startUploadingFiles } from '../../store/Journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

  const dispatch = useDispatch();
  const {active:note, messageSaved, isSaving} = useSelector((state)=> state.journal)
  const {body, date, title, onInputChange, formState } = useForm(note)
  const dateString = useMemo(()=> {
    const newdate = new Date(date);

    return newdate.toUTCString();
    

  }, [date])

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(()=> {
    if(messageSaved.length >0 ) {
      Swal.fire("Nota actualizada", null, 'success');
    }
  }, [messageSaved])
  
  const onSaveNote = () => {
    dispatch(StartSavingNotes())

  }

  const onFileInputChange = ({target}) => {
      dispatch(startUploadingFiles(target.files))
  }


  return (
    <Grid container direction="row" alignItems="center" justifyContent="space-between"  sx={{mb:1}}>

      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>
      <Grid item>


        <input 
        type="file" 
        multiple
        ref={fileInputRef}
        onChange = {onFileInputChange}
        style={{ 
          display: 'none'
        }}
        >
        

        
        </input>

        <IconButton
          color = "primary"
          disabled = {isSaving}
          onClick={()=> fileInputRef.current.click()}
        >  
        <UploadOutlined/>
        </IconButton>

        <Button disabled = {isSaving} onClick={onSaveNote} color="primary" sx={{padding:2}}>
          <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
          Guardar
        </Button>
      </Grid>

    <Grid container>
      
      <TextField
        type="text"
        variant="filled"
        fullWidth
        placeholder='Ingrese titulo'
        label="Titulo"      
        sx={{border: 'none', mb: 1}}
        name='title'
        value={title}
        onChange={onInputChange}
      />

       <TextField
        type="text"
        variant="filled"
        fullWidth
        multiline
        placeholder='¿Que sucedio hoy?'
        label="Titulo"      
        sx={{border: 'none', mb: 1}}
        minRows={5}
        name='body'
        value={body}
        onChange={onInputChange}
        
      />
    </Grid>

    {/* Image gallery */}
    <ImageGallery images={note.imageurl}/>

    </Grid> 
  )
}


