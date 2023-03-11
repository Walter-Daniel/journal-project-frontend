import { useDispatch, useSelector } from 'react-redux';

import { addNewEmptyNote,
    setActiveNote,
    setNote,
    setSavinf,
    updateNote,
    deleteNote, 
    savingNewNote} from './journalSlice';
import Swal from 'sweetalert2';
import { LoadNotes } from '../../helpers/loadNotes';

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