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
      state.user= {};
      state.errorMessage = undefined;
    },

    login: ( state, { payload } ) => {
      state.status= 'authenticated'; //not-authenticated, 'authenticated,
      state.user = payload;
      state.errorMessage = undefined;
    },

    logout: ( state, {payload} ) => {
      state.status= 'non-authenticated'; //not-authenticated, 'authenticated,
      state.user= {};
      state.errorMessage = payload;
    },
    
    clearErrorMsg: ( state ) => {
      state.errorMessage = undefined;
    }
    
  },
})

export const { login, logout, checkingCredentials, clearErrorMsg } = authSlice.actions