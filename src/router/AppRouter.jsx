
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CheckingAuth } from "../../ui/components/CheckingAuth";

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from "../hooks";
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {

  const { checkAuthToken, status  } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, []);

  if( status === 'checking' ) {
    return <CheckingAuth />
  };

  return (
    <>
        <Routes>
            { 
              (status === 'authenticated')     
                ?<Route path='/*' element={ <JournalRoutes /> } />
                :<Route path='/auth/*' element={ <AuthRoutes /> } />
            }
            <Route path='/*' element={ <Navigate to='/auth/login' /> } />    
        </Routes>
    
    </>
  )
}
