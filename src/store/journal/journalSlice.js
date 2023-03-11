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
    },
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    setNote: ( state, { payload } ) => {
      state.notes = payload
    },
    setSavinf: ( state ) => {

    },
    updateNote: ( state, action ) => {

    },
    deleteNote: ( state, action ) => {

    },
  },
})

export const {  addNewEmptyNote,
                setActiveNote,
                savingNewNote,
                setNote,
                setSavinf,
                updateNote,
                deleteNote } = journalSlice.actions