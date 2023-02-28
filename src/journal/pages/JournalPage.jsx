import { Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati asperiores nisi incidunt omnis molestias itaque rem repudiandae magni suscipit similique. Nulla necessitatibus nam molestiae aspernatur eos quia, nesciunt adipisci ab.</Typography> */}

      {/* <NothingSelectedView /> */}
      <NoteView />

    </JournalLayout>
  )
}
