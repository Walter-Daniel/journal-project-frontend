import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati asperiores nisi incidunt omnis molestias itaque rem repudiandae magni suscipit similique. Nulla necessitatibus nam molestiae aspernatur eos quia, nesciunt adipisci ab.</Typography> */}

      <NothingSelectedView />
      {/* <NoteView /> */}
      <IconButton
        className="animate__animated animate__fadeIn"
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
