import { useAuthStore } from "../../hooks/useAuthstore";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth }) => {

  const { user } = useAuthStore();
  const { notes, active } = useSelector( state => state.journal );
  console.log(notes, 'notas inicio')

  return (
    <Box
        component='nav'
        className="animate__animated animate__fadeIn animate__faster"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
          variant="permanent"
          open
          sx={{
            display: {xs: 'block'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div' >
          { user.name }
          </Typography>
        </Toolbar>
        <Divider />

        <List key="nuevalista">
          {
            notes.map( note =>(
              <SideBarItem key={note.id} { ...note } noteActive={active}/>
            ) )
          }
        </List>

      </Drawer>
      
    </Box>
  )
}
