import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // notes: [],
  // actie: null

  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
//   active: {
//     id: 'ABC',
//     title: '',
//     body: '',
//     date: 12343,
//     imageUrls: []

//   }
}
export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: ( state, { payload } ) => {
      state.notes.push( payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, { payload } ) => {
      state.active = payload;
      state.messageSaved = '';
    },
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    setNote: ( state, { payload } ) => {
      state.notes = payload;
    },
    setSaving: ( state ) => {
      state.isSaving = true;
      state.messageSaved = ''
    },
    updateNote: ( state, action ) => {
      state.isSaving = false;
      state.notes = state.notes.map( note => {
        if( note.id === action.payload.id ) {
          return action.payload;
        }
          return note;
      });
      state.messageSaved = `${ action.payload.title }, se ha guardado con éxito`;
    },
    deleteNote: ( state, action ) => {

    },
  },
})

export const {  addNewEmptyNote,
                setActiveNote,
                savingNewNote,
                setNote,
                setSaving,
                updateNote,
                deleteNote } = journalSlice.actions