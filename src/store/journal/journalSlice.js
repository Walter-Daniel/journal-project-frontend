import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};

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
    addNewNote: ( state, { payload } ) => {
      state.isSaving = false,
      state.notes.push( payload );
      state.messageSaved = `${ payload.title }, se ha guardado con éxito`;
    },
    setPhotosToActiveNote: ( state, action ) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;
    },
    clearNotesLogout: (state, action) => {
      state.isSaving = false,
      state.messageSaved = '',
      state.notes= [],
      state.active = null;
    },
    deleteNote: ( state, action ) => {
      state.active = null,
      state.notes = state.notes.filter( note => note.id !== action.payload )
    },
  },
})

export const {  addNewEmptyNote,
                addNewNote,
                setActiveNote,
                savingNewNote,
                setNote,
                setSaving,
                updateNote,
                setPhotosToActiveNote,
                clearNotesLogout,
                deleteNote } = journalSlice.actions