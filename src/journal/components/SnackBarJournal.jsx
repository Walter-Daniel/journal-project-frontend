import { Alert, Snackbar } from "@mui/material"


export const SnackBarJournal = ({action, msg, handleClose, open}) => {

  return (
    <Snackbar open={open} 
              autoHideDuration={6000} 
              onClose={handleClose} 
    >
      <Alert onClose={handleClose} severity={action} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  )
}
