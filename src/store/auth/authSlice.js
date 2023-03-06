import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  status: 'non-authenticated', //not-authenticated, 'authenticated,
  user: {},
  errorMessage: undefined,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    checkingCredentials: (state) => {
      state.status = 'checking';
      // state.name = {};
      // state.surname = {};
      // state.errorMessage = undefined;
      state.user= {};
      state.errorMessage = undefined;
    },

    login: ( state, { payload } ) => {
      state.status= 'authenticated'; //not-authenticated, 'authenticated,
      // state.id= payload.id;
      // state.email= payload.email;
      // state.name= payload.name;
      // state.surname= payload.surname;
      // state.photoURL= payload.photoURL;
      // state.errorMessage= payload.errorMessage;
      state.user = payload;
      state.errorMessage = undefined;
    },

    logout: ( state ) => {
      state.status= 'non-authenticated'; //not-authenticated, 'authenticated,
      // state.id= null;
      // state.email= null;
      // state.name= null;
      // state.surnamename= null;
      // state.photoURL= null;
      // state.errorMessage= payload.errorMessage;
    }  
  },
})

export const { login, logout, checkingCredentials } = authSlice.actions