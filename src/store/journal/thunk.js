import { addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    deleteNote,
    addNewNote, 
    onSaveNote,
    savingNewNote} from './journalSlice';

import { LoadNotes } from '../../helpers/loadNotes';
import journalApi from '../../api/journalApi';

import { fileUpload } from '../../helpers/fileUpload';

import Swal from 'sweetalert2';

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
            dispatch( onSaveNote() );
            Swal.fire('Carga exitosa', `Se ha guardado con exito la nota: ${note.title}` , 'success')
            return data
            
        }

        const noteToBackend = { ...note };
        delete noteToBackend.id;
        const { data } = await journalApi.put(`/notes/${note.id}`, noteToBackend);
        dispatch( updateNote( note ) );
        Swal.fire('Edición exitosa', `Se ha editado con éxito la nota: ${note.title}` , 'success')    
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
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        const {active:note} = getState().journal;
        const id = note.id
        const images = await fileUpload( files, id );
        dispatch( setPhotosToActiveNote( images ) );
        // if(!dispatch) {
        //     Swal.fire({
        //     title: 'Quieres salir sin guardar las fotos?',
        //     text: "Al salir, no podras recuperarlas",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Si, quiero salir!'
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //       Swal.fire(
        //         'Borradas!',
        //         'Tus fotos no se han guardado.',
        //         'success'
        //       )
        //     }
        //   })
        // }
    }
};

export const startDeletingNote = (  ) => {
    return async(dispatch, getState) => {
        const {active:note} = getState().journal;
        const { data } = await journalApi.delete(`/notes/${note.id}`);
        dispatch( deleteNote(note.id) );
        Swal.fire('Nota eliminada', `Se ha eliminado se con éxito la nota` , 'success')    

    }
};
