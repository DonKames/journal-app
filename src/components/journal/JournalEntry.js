import React from 'react';
//import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';

export const JournalEntry = (note) => {
    const { id, date, title, body, url } = note;
    //const noteDate = moment(date);
    dayjs.locale('es-mx');
    const noteDate = dayjs(date);

    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch( activeNote( id, note ) );
    };

    return (
        <div
            className='journal__entry pointer animate__animated animate__fadeIn animate__faster'
            onClick={ handleEntryClick }
        >

            {
                url
                    ?
                    <div
                        className='journal__entry-picture'
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${url})`
                        }}
                    ></div>
                    :
                    <div
                        className='journal__entry-picture'
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(https://www.online-image-editor.com/styles/2019/images/power_girl.png)`,
                            backgroundPosition: 'right',
                        }}
                    ></div>
            }

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    {title}
                </p>
                <p className='journal__entry-content'>
                    {body}
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('DD') }</h4>
            </div>
        </div>
    )
}