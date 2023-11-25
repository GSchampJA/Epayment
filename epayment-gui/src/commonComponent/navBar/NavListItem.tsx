import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavButton from './NavButton';
import { AppUrl } from '../objectType/AppUrl';

export const NavListItems_primary = (
  <React.Fragment>

    <NavButton url={AppUrl.Home} icon={<DashboardIcon />} buttonTitle='Dashboard'/>
    <NavButton url={AppUrl.Transaction} icon={<ShoppingCartIcon />} buttonTitle='Transaction'/>
    <NavButton url={AppUrl.ReactAmin} icon={<PeopleIcon />} buttonTitle='React'/>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>My Wallet</ListSubheader>


    <NavButton url={AppUrl.MyUTXOs} icon={<AssignmentIcon />} buttonTitle='UTXOs'/>
    <NavButton url={AppUrl.Transaction} icon={<AssignmentIcon />} buttonTitle='New transaction'/>
    <NavButton url={AppUrl.MyAddress} icon={<AssignmentIcon />} buttonTitle='My Address'/>

  </React.Fragment>
);
