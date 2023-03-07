
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CheckingAuth } from "../../ui/components/CheckingAuth";

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {
  const { status  } = useSelector( state => state.auth );

  if( status === 'checking' ) {
    return <CheckingAuth />
  }
  return (
    <>
        <Routes>
            <Route path='/auth/*' element={ <AuthRoutes /> } />

            <Route path='/*' element={ <JournalRoutes /> } />
            
        </Routes>
    
    </>
  )
}
