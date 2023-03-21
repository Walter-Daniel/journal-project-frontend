import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, IconButton, Stack, Alert } from "@mui/material";
import { useMemo, useRef, useEffect, useState } from "react";
import { ImgGallery } from "../components";
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, StartSaveNote, startUploadingFiles } from '../../store/journal/thunk';
import { SnackBarJournal } from '../components/SnackBarJournal';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date )
        const options = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
        return newDate.toLocaleDateString('es-AR', options).toLocaleUpperCase();
    },[date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState]);

    const [notification, setNotification] = useState(false);

    const onSaveNote = () => {
        dispatch( StartSaveNote() )
        setNotification(true);
    };

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return
        dispatch( startUploadingFiles( target.files ) )
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNotification(false);
    };

    const onDelete = () => {
       dispatch( startDeletingNote() ) 
       setNotification(true);
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
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
                <IconButton
                        color='primary'
                        disabled={isSaving}
                        onClick={ () => fileInputRef.current.click() }>
                    <UploadOutlined />
                </IconButton>
                <Button
                        color="primary"
                        sx={{ padding: 2 }}
                        disabled={isSaving}
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
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            {/* <SnackBarJournal handleClose={handleClose} open={onSaveNote} onDelete={onDelete} action={"success"} msg={messageSaved} /> */}

    </Grid>
  )
}
