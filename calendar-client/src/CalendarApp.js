import React from 'react';
import { Provider } from 'react-redux';

import { store } from './state/store/store';
import { AppRouter } from './routers/AppRouter'

export const CalendarApp = () => {
  return (
    <Provider store={ store } >
        <AppRouter />
    </Provider>
  )
}
