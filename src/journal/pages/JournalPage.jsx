import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunk'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal )

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  };
  
  

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati asperiores nisi incidunt omnis molestias itaque rem repudiandae magni suscipit similique. Nulla necessitatibus nam molestiae aspernatur eos quia, nesciunt adipisci ab.</Typography> */}

      {
        ( active === null ) ? <NothingSelectedView />
                            :<NoteView />
      }
      
      <IconButton
        onClick={ onClickNewNote }
        disabled={ active }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined />
      </IconButton>

    </JournalLayout>
  )
}
