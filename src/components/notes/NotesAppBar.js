import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { startSaveNote, startUploadImg } from '../../actions/notes';

export const NotesAppBar = () => {
  const { active } = useSelector(state => state.notes);
  const dispatch = useDispatch();

  const noteDate = dayjs(active.date);


  const handleSave = () => {
    console.log('click')
    dispatch(startSaveNote(active));
  };


  const handlePictureUpload = () => {
    console.log('uploadPicture');
    document.querySelector('#fileSelector').click();
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      dispatch( startUploadImg( file ) );
    };

  };

  return (
    <div className='notes__appbar'>
      <span>{noteDate.format('YYYY MMMM DD')}</span>
      <input
        id="fileSelector"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button
          className='btn'
          onClick={handlePictureUpload}
        >
          Picture
        </button>

        <button
          className='btn'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}
