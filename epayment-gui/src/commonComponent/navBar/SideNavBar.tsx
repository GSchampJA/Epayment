import { useContext } from "react";
import { drawerWidth } from "./TopAppBar";
import { styled } from '@mui/material/styles';
import { UserInfoContext } from "../UserInfoContext";
import { NavListItems_primary, secondaryListItems } from "./NavListItem";

import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

export const SideNavBar = (props: {open: boolean, toggleDrawer: () => any}) => {

  const { open, toggleDrawer } = props;
  const [ userInfo ] = useContext(UserInfoContext);


  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />


      <List component="nav">
        {NavListItems_primary}
        <Divider sx={{ my: 1 }} />


        {
          true ?
        // (userInfo.logIn) ? /** If login, pop my wallet information */
          <> {secondaryListItems} </> : <></>
        }
      </List>
      
    </Drawer>
  )
}