import React from 'react'
import { useSelector } from 'react-redux';

export const CalendarEvent = ({ event }) => {

    const { title, user } = event;
    const { name } = useSelector( state => state.auth );

    return (
      <>
        <string>{ title }</string>
        <strong>- { name }</strong>
      </>
    )

}
