import { useMemo } from 'react';
import { TurnedInNot, TurnedIn } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ title, body, id, date, imageUrls = [], noteActive={} }) => {

  const dispatch = useDispatch();
  
  const onClickNote = () => {
    dispatch( setActiveNote({ title, body, id, date, imageUrls }) );
  };

  const newTitle = useMemo( () => {
    return title.length > 17
        ? title.substring(0,17) + '...'
        : title;
  }, [ title ]);

  const dateString = useMemo(() => {
    const newDate = new Date( date )
    const options = {year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
    return newDate.toLocaleDateString('es-AR', options)
    ; 
},[date]);

  

  return (
    <ListItem key={ id } disablePadding >
        <ListItemButton onClick={ onClickNote }>
          <ListItemIcon>
            {
              ( noteActive === null || noteActive.id !== id  ) ? <TurnedInNot />:<TurnedIn />
            }
          </ListItemIcon>
          <Grid container>
            <ListItemText  primary={ newTitle } />
            <ListItemText secondary={ dateString } />
          </Grid>
        </ListItemButton>
    </ListItem>
  )
}
