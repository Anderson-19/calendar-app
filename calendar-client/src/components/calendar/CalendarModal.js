import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../state/actions/ui';
import { eventDesactive, startEventAddNew, startEventUpdate } from '../../state/actions/events';

import './stylesModal.css';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add( 1, 'hours' );
const later = now.clone().add( 1, 'hours' );

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: later.toDate()
}

export const CalendarModal = () => {
    
    const [startDate, setStartDate] = useState( now.toDate()  );
    const [laterDate, setLaterDate] = useState( later.toDate()  );
    const [formValues, setFormValues] = useState( initEvent );
    const [titleValid, setTitleValid] = useState(true);

    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [ activeEvent, setFormValues ]);

    const handleOnChangeStartTime = (e) => {
        setStartDate(e);
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleOnChangeLaterTime = (e) => {
        setLaterDate(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }

    const modalClose = () => {
        dispatch( closeModal() );
        dispatch( eventDesactive() );
        setFormValues( initEvent );
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentLater = moment( end );

        if ( momentStart.isSameOrAfter( momentLater ) ) {
            return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }
        
        if ( title.trim().length < 2) {
            setTitleValid(false); 
            return Swal.fire('Error','El titulo esta vacio', 'error');
        }

        if ( activeEvent ) {
            dispatch( startEventUpdate( formValues ) );
        } else {
            dispatch( startEventAddNew( formValues ) );
        }

        setTitleValid(true);
        modalClose();

    }

    return (
      <div>
            <Modal
              isOpen={ modalOpen }
              onRequestClose={ modalClose }
              style={ customStyles }
              closeTimeoutMS={ 200 }
              className="modal"
              overlayClassName="modal-fondo"
            >
                <h1> {  ( activeEvent ) ? 'Editar Evento' : 'Nuevo Evento' } </h1>
                <hr />
                <form className="container" onSubmit={ handleSubmit }>

                    <div className="form-group">
                        <label>Fecha y hora inicio  </label>
                        <DateTimePicker 
                            className="form-control"
                            onChange={ handleOnChangeStartTime } 
                            value={ startDate } 
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin  </label>
                        <DateTimePicker 
                            className="form-control"
                            onChange={ handleOnChangeLaterTime } 
                            value={ laterDate } 
                            minDate={ startDate }
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input 
                            type="text"
                            onChange={ handleInputChange }
                            value={ title } 
                            className={`form-control ${ !titleValid && 'is-invalid' }`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea 
                            type="text"
                            onChange={ handleInputChange }
                            value={ notes } 
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                        onClick={ handleSubmit }
                    >
                        <i className="far fa-save"></i>
                        <span> {  ( activeEvent ) ? 'Editar' : 'Guardar' } </span>
                    </button>

                </form>
            </Modal>
      </div>
    )
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
