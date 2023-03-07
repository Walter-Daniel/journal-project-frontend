import { useDispatch, useSelector } from 'react-redux';
import journalApi from '../api/journalApi';
import { checkingCredentials, clearErrorMsg, login, logout } from '../store/auth/authSlice';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {

        dispatch( checkingCredentials() );

        try {

            const { data } = await journalApi.post('/auth', { email, password})
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    name: data.name,
                    id: data.id
                }) 
            );

        } catch (error) {
            dispatch(logout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch ( clearErrorMsg() )
            },5);         
        }
    }

    return {
        // Propiedades
        status,
        errorMessage,
        user,

        //Metodos
        startLogin
    }
}