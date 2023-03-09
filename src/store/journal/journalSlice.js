import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: true,
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
    addNewEmptyNote: ( state, action ) => {

    },
    setActiveNote: ( state, action ) => {

    },
    setNote: ( state, action ) => {

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
                setNote,
                setSavinf,
                updateNote,
                deleteNote, } = journalSlice.actions