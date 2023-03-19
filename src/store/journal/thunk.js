import { addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    deleteNote,
    addNewNote, 
    savingNewNote} from './journalSlice';

import { LoadNotes } from '../../helpers/loadNotes';
import journalApi from '../../api/journalApi';

import { fileUpload } from '../../helpers/fileUpload';

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { id } = getState().auth.user
        const notes = await LoadNotes( id );
        dispatch( setNote( notes ) )
    }
}
const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    id: '',
    imageUrls: []
};

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setActiveNote( newNote ) );
    }
};

export const StartSaveNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );
        const { active:note } = getState().journal;

        if (!note.id) {
            const {data} = await journalApi.post(`/notes`, note);
            const id = data.note.id
            dispatch( addNewNote( {...note, id} ) );
            dispatch( setActiveNote( newNote ) );
            return data
        }

        const noteToBackend = { ...note };
        delete noteToBackend.id;
        const { data } = await journalApi.put(`/notes/${note.id}`, noteToBackend);
        dispatch( updateNote( note ) );      
    }
};
// export const StartSaveNote = () => {
//     return async( dispatch, getState ) => {
//         try {

//             dispatch( setSaving() );

//             const { active:note } = getState().journal;
//             const noteToBackend = { ...note };
//             const idNoteActive = note.id
//             if( idNoteActive === note.date)  {
//                 const newNote = await journalApi.post(`/notes`, note);
//                 dispatch( updateNote( note ) );
//             }
//             delete noteToBackend.id;
//             const { data } = await journalApi.put(`/notes/${idNoteActive}`, noteToBackend);
//             console.log(data);

//             dispatch( updateNote( note ) );
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
// };

// export const startUpdateNote = () => {
//     dispatch( setSaving() );
//             const { active:note } = getState().journal;
//             const noteToBackend = { ...note };
//             delete noteToBackend.id;
//             const { data } = await journalApi.put(`/notes/${idNoteActive}`, noteToBackend);
//             console.log(data);

//             dispatch( updateNote( note ) );
// }

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );
        const fileUploadPromises = [];

        for( const file of files  ) {
            fileUploadPromises.push( fileUpload( file ) )
        };

        const photosUrls = await Promise.all( fileUploadPromises );
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
};

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {active:note} = getState().journal;
        const { data } = await journalApi.delete(`/notes/${note.id}`);
        dispatch( deleteNote(note.id) );
    }
}