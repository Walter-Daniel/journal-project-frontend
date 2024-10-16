import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';


export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
    }


    const refactor = (text) => {
        const newText = useMemo( () => {
            return text.length > 17
                ? text.substring(0,17) + '...'
                : text;
        },[ text ])
        return newText;
    }

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container style={{display: 'flex', flexDirection: 'column'}}>
                <ListItemText primary={ refactor(title) } />
                <ListItemText secondary={ refactor(body) } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
