import { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '../UserInfoContext';
import { styled } from '@mui/material/styles';
import { AppUrl } from '../objectType/AppUrl';
import { Link, useNavigate } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { sendApi_stopMining } from '../api/CommonApi';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';



export const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

export const TopAppBar = (props: {open: boolean, toggleDrawer: () => any}) => {

  const { open, toggleDrawer } = props;
  const [ isStopMining, setIsStopMining] = useState(true);
  const [ isMiningBtnDisable, setIsMiningBtnDisable] = useState(false);

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useContext(UserInfoContext);

  const logOut = () => {
    setUserInfo({
      logIn: false,
      address: undefined,
      privatekey: undefined,
    })

    navigate(AppUrl.Home)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsMiningBtnDisable(false)
    }, 10000);

  }, [isMiningBtnDisable])

  const triggerMine = () => {
    // sendApi_stopMining({isMining: !isStopMining}).catch((er) => {
    //   console.log(er); 
    //   toast.error(`Server error 500: ${er}`)
    // })
    sendApi_stopMining().then(res => {
      const isMining = res.data.isMining 
      setIsStopMining(!isMining)
      setIsMiningBtnDisable(true)
    })
    .catch((er) => {
      console.log(er); 
      toast.error(`Server error 500: ${er}`)
    })

    
  }

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{pr: '24px'}}>   {/*keep right padding when drawer closed*/}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        > <MenuIcon />
        </IconButton>

        
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        ><Link className='HomepageLink' to={AppUrl.Home}> E-Payment </Link>
        </Typography>

        {(userInfo.logIn) && <IconButton color="inherit" onClick={triggerMine}  disabled={isMiningBtnDisable}>
          <Button style={{backgroundColor: "cornflowerblue", minWidth: '10rem'}} variant='contained' disabled={isMiningBtnDisable}>
            {isStopMining ? "Stopped Mining" : "Mining..."}
          </Button>
        </IconButton>}
        
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {(userInfo.logIn) ? /** If login, pop Logout icon */
          <IconButton color="inherit" onClick={logOut}>
            <LogoutIcon/> &nbsp; <span className='TopNavFont'>{'LogOut'}</span>
          </IconButton>
           : /** If logout, pop Login icon */
          <IconButton color="inherit" onClick={() => {navigate(AppUrl.Login)}}>
            <LoginIcon/> &nbsp; <span className='TopNavFont'>{'Login'}</span>
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  )
}