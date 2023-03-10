// import { useDispatch, useSelector } from 'react-redux';

import journalApi from "../api/journalApi"


// import { addNewEmptyNote,
//         setActiveNote,
//         setNote,
//         setSavinf,
//         updateNote,
//         deleteNote } from '../store/journal/journalSlice';
// import Swal from 'sweetalert2';



// export const startNewNote= () => {
//     const dispatch = useDispatch();

//     return async( dispatch, getState ) => {
//     const { isSaving, active,  } = useSelector( state => state.journal );

//     try {

//         const newNote = {

//             title: '',
//             body: '',
//             date: new Date().getTime()

//         };

        
//     } catch (error) {
        
//     }
        



//     return {
//         Propiedades
//         isSaving,
//         active,

//         Metodos
//         startNewNote
//     }
// }

export const useJournalStore = () => {

    const loadNotes = async() => {

        const getNotes = await journalApi.get('/notes');
        console.log(getNotes) 
    }

}

