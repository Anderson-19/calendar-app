import React from 'react';
import { useDispatch } from 'react-redux';

import { eventStartDelete } from '../../state/actions/events';

import './stylesUI.css';

export const DeleteEventFab = ( ) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( eventStartDelete() );
    }

    return (
      <button
          className="btn btn-danger fab-danger"
          onClick={ handleDelete }
      >
          <i className="fas fa-trash" ></i>
          <span> Borra</span>
      </button>
    )
}
