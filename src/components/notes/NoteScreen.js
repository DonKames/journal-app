import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteImg } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { active: note } = useSelector(state => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, id } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {

    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    };

  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch])

  const handleDelete = () => {
    dispatch( startDeleteImg( id ) );
  };

  return (
    <div className='notes__main-content'>
      <NotesAppBar />
      <div className='notes__content'>
        <input
          name='title'
          type='text'
          placeholder='Some awesome Title'
          className='notes__title-input'
          autoComplete='off'
          onChange={handleInputChange}
          value={title}
        />
        <textarea
          name='body'
          placeholder='what happened today'
          className='notes__textarea'
          onChange={handleInputChange}
          value={body}
        ></textarea>
        <div className='notes__image'>
          <img
            src={
              note.url?
                note.url
                :
                'https://www.online-image-editor.com/styles/2019/images/power_girl.png'
            }
            alt='imagen de nota'
          />
        </div>
      </div>
      <button
        className='btn btn-danger'
        onClick={handleDelete}
      >
        Borrar Nota
      </button>
    </div>
  )
}
