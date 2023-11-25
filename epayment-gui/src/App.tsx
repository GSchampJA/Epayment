import React from 'react';
import './style-css/App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './Dashboard';
import TracingSearch from './subPage/tracing/TracingSearch';
import ReactPage from './subPage/otherPage/ReactPage';
import LoginPage from './subPage/auth/LoginPage';
import { AppUrl } from './commonComponent/objectType/AppUrl';
import { UserInfoProvider } from './commonComponent/UserInfoContext';
import { TopAppBar } from './commonComponent/navBar/TopAppBar';
import { SideNavBar } from './commonComponent/navBar/SideNavBar';
import RegisterPage from './subPage/auth/RegisterPage';



const App = () => {

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <UserInfoProvider>
        <CssBaseline />
        
        {/* Top bar of the page */}
        <TopAppBar open={open} toggleDrawer={toggleDrawer} />
        {/* Side Navigation Bar */}
        <SideNavBar open={open} toggleDrawer={toggleDrawer} />


        {/* URL Routing */}
        <div className="AppContent">
          <Routes>
            <Route path={AppUrl.Home} element={<Dashboard/>}>
              {/* <Route index element={<Dashboard />} /> */}
            </Route>
            
            <Route path={AppUrl.Transaction} element={<TracingSearch />} />
            <Route path={AppUrl.ReactAmin} element={<ReactPage />} />


            <Route path={AppUrl.Login} element={<LoginPage />} />
            <Route path={AppUrl.RegisterAC} element={<RegisterPage />} />
          </Routes>
        </div>    
      
    
      </UserInfoProvider>
      {/* **Box** is Last Component */}
    </Box>
  );
}

export default App;

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
