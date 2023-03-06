import { useDispatch, useSelector } from 'react-redux';
import journalApi from '../api/journalApi';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const startLogin = async(data) => {


        try {
            const resp = await journalApi.post('/auth', { data })
            console.log({ resp })
        } catch (error) {
            console.log(error)
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