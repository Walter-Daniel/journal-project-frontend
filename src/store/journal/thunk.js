import { useDispatch, useSelector } from 'react-redux';

import { addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    updateNote,
    deleteNote, 
    savingNewNote} from './journalSlice';
import Swal from 'sweetalert2';
import { LoadNotes } from '../../helpers/loadNotes';
import journalApi from '../../api/journalApi';

export const startNewNote = () => {
    
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
};

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { id } = getState().auth.user
        const notes = await LoadNotes( id );
        dispatch( setNote( notes ) )
    }
}

export const StartSaveNote = () => {
    return async( dispatch, getState ) => {
        try {

            dispatch( setSaving() );

            const { active:note } = getState().journal;
            const noteToBackend = { ...note };
            const idNoteActive = note.id
            if(!idNoteActive )  {
                const newNote = await journalApi.post(`/notes`, note);
                dispatch( updateNote( note ) );
                return newNote
            }
            delete noteToBackend.id;
            const { data } = await journalApi.put(`/notes/${idNoteActive}`, noteToBackend);
            console.log(data);

            dispatch( updateNote( note ) );
            
        } catch (error) {
            console.log(error)
        }
    }
}