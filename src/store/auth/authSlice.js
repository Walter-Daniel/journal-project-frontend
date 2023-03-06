import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  status: 'non-authenticated', //not-authenticated, 'authenticated,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: ( state, { payload } ) => {
      state.status= 'authenticated'; //not-authenticated, 'authenticated,
      state.id= payload.id;
      state.email= payload.email;
      state.name= payload.name;
      state.surname= payload.surname;
      state.photoURL= payload.photoURL;
      state.errorMessage= payload.errorMessage;
    },
    logout: ( state, { payload } ) => {
      state.status= 'non-authenticated'; //not-authenticated, 'authenticated,
      state.id= null;
      state.email= null;
      state.name= null;
      state.surnamename= null;
      state.photoURL= null;
      state.errorMessage= payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
      state.name = {};
      state.surname = {};
      state.errorMessage = undefined;
    }
  },
})

export const { login, logout, checkingCredentials } = authSlice.actions