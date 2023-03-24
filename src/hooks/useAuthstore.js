import { useDispatch, useSelector } from 'react-redux';
import journalApi from '../api/journalApi';
import { checkingCredentials, clearErrorMsg, login, logout } from '../store/auth/authSlice';

import Swal from 'sweetalert2';
import { startLoadingNotes } from '../store/journal/thunk';
import { clearNotesLogout } from '../store/journal/journalSlice';



export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {

        dispatch( checkingCredentials() );

        try {

            const { data } = await journalApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    name: data.name,
                    surname: data.surname,
                    id: data.id
                }) 
            );
            Swal.fire(`Hola ${ data.name }`, 'te damos la bienvenida!!!', 'success')
            dispatch( startLoadingNotes() );
            

        } catch (error) {
            dispatch(logout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch ( clearErrorMsg() )
            },5);         
        }
    };

    const startRegister = async({ name, surname, email, password }) => {
        try {
            const {data} = await journalApi.post('/auth/register', { name, surname, email, password })
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    name: data.name,
                    id: data.id
                }) 
            );
            Swal.fire('Cuenta creada con éxito', 'Enviamos un mensaje de activación a tu correo!', 'success')
            
        } catch (error) {
            dispatch(logout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch ( clearErrorMsg() )
            },5);  
        }
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch( logout() );
        try {
            const { data } = await journalApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    name: data.name,
                    surname: data.surname,
                    id: data.id
                }) 
            );
        } catch (error) {
            localStorage.clear();
            dispatch( logout() );
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    };

    return {
        // Propiedades
        status,
        errorMessage,
        user,

        //Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}