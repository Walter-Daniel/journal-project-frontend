import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import { useMemo, useRef, useEffect } from "react";
import { ImgGallery } from "../components";
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { StartSaveNote } from '../../store/journal/thunk';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( note );


    const dateString = useMemo(() => {
        const newDate = new Date( date )
        const options = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
        // return newDate.toUTCString('es-Ar'); 
        return newDate.toLocaleDateString('es-AR', options).toLocaleUpperCase()
        ; 
    },[date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState]);

    const onSaveNote = () => {
        dispatch( StartSaveNote() )
    }
    

  return (
    <Grid 
        container
        direction='row'
        justifyContent='space-between'
        className='box-shadow animate__animated animate__fadeIn animate__faster'
        sx={{ mb:1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>
            <Grid item>
                <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    // onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
                <Button 
                        color="primary" 
                        sx={{ padding: 2 }}
                        onClick= { onSaveNote }
                        >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    <Typography>
                        Guardar
                    </Typography>
                </Button>
            </Grid>
            <Grid container>

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField 
                    type="text"
                    variant="filled"
                    multiline
                    fullWidth
                    placeholder="¿Qué sucedió el día de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    // onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>


            <ImgGallery />

    </Grid>
  )
}
