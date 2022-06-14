import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignIn } from '../components/auth/SignIn';
import { LogIn } from '../components/auth/LogIn';

export const AuthRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={ <LogIn /> } />
            <Route path="/signIn" element={ <SignIn /> } />
        </Routes>
    </div>
  )
}
