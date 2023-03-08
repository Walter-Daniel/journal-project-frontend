import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "../../hooks/useAuthStore";


export const NavBar = ({ drawerWidth }) => {

    const { startLogout } = useAuthStore();

  return (
    <AppBar 
        position="fixed"
        className="animate__animated animate__fadeIn animate__faster"
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }` }

         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                sx={{ mr:2, display: { sm: 'none' } }}
                >
                <MenuOutlined />
            </IconButton>
            <Grid
                container
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            
            >
                <Typography variant='h6' noWrap component='div'> Journal App </Typography>
                <IconButton
                    onClick={ startLogout } 
                    color="error">
                    <LogoutOutlined />
                </IconButton>

            </Grid>
        </Toolbar>

    </AppBar>
  )
}
