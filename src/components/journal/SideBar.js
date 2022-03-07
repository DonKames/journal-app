import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const SideBar = () => {

    const { name } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    };

    const handleAddNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-3'>
                    <i className='far fa-moon'></i>
                    <span> { name.charAt(0).toUpperCase() + name.slice(1) } </span>
                </h3>
                <button
                    className='btn mt-1'
                    onClick={ handleLogout }
                >
                    Cerrar Sesion
                </button>
            </div>

            <div
                className='journal__new-entry'
                onClick={ handleAddNote }
            >
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>
                    Nueva Entrada
                </p>
            </div>

            <JournalEntries />

        </aside>
    );
}
