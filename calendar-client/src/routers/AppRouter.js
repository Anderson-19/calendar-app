import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/calendar" element={ 
              <PrivateRoute>
                  <CalendarScreen /> 
              </PrivateRoute>
            } />

            <Route path="/*" element={ 
              <PublicRoute>                 
                  <AuthRouter /> 
              </PublicRoute>
            } />

        </Routes>
    </BrowserRouter>
  )
}
