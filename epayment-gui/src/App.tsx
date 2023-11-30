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
import NotFoundPage from './subPage/otherPage/NotFoundPage';
import MyAddressPage from './subPage/myAccount/MyAddress';
import MyUtxosPage from './subPage/myAccount/MyUtxosPage';
import MyTxPage from './subPage/myAccount/MyTransaction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBlock from './subPage/tracing/SearchBlock';

export const API_URL = process.env.REACT_APP_API_URL;
const App = () => {

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <UserInfoProvider>
        <ToastContainer />
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
            <Route path={AppUrl.SearchBlockDetail} element={<SearchBlock/>} />
            <Route path={AppUrl.ReactAmin} element={<ReactPage />} />


            <Route path={AppUrl.Login} element={<LoginPage />} />
            <Route path={AppUrl.RegisterAC} element={<RegisterPage />} />

            {/* My wallet */}
            <Route path={AppUrl.MyAddress} element={<MyAddressPage />} />
            <Route path={AppUrl.MyTx} element={<MyTxPage />} />
            
            <Route path={AppUrl.MyUTXOs} element={<MyUtxosPage />} />
            


            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>    
      
    
      </UserInfoProvider>
      {/* **Box** is Last Component */}
    </Box>
  );
}

export default App;