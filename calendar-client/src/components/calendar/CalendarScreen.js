import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-esp';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { openModal } from '../../state/actions/ui';
import { eventDesactive, eventSetActive, eventStartLoading } from '../../state/actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
  const { activeEvent, events } = useSelector( state => state.calendar );
  const { uid } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch( eventStartLoading() ); 
    
  }, [ dispatch ] );

  const onDoubleClick = (e) => {
    dispatch( openModal()  );
  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive( e ) );
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch( eventDesactive() );
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return { style }
  }
  return (
    <div>
        <NavBar />
        <div 
          className="calendar-screen my-3" 
          style={{ height: '100vh', display: 'flex', flexFlow: 'column'}}
        >
          <Calendar
            localizer={ localizer }
            events={ events }
            startAccessor="start"
            endAccessor="end"
            messages={ messages }
            eventPropGetter={ eventStyleGetter }
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onSelectEvent }
            onView={ onViewChange }
            onSelectSlot={ onSelectSlot }
            selectable={ true }
            view={ lastView }
            components={{
              event: CalendarEvent
            }}
          />

          <AddNewFab />

          {
            activeEvent && (
              <DeleteEventFab />
            )
          }

          
          <CalendarModal />
            
        

        </div>
    </div>
  )
}
