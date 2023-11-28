import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import NavButton from './NavButton';
import { AppUrl } from '../objectType/AppUrl';


export const NavListItems_primary = (
  <React.Fragment>

    <NavButton url={AppUrl.Home} icon={<DashboardIcon />} buttonTitle='Dashboard'/>
    <NavButton url={AppUrl.Transaction} icon={<ShoppingCartIcon />} buttonTitle='Transaction'/>
    <NavButton url={AppUrl.ReactAmin} icon={<AssignmentIcon />} buttonTitle='React'/>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>My Wallet</ListSubheader>


    <NavButton url={AppUrl.MyUTXOs} icon={<AccountBalanceWalletIcon />} buttonTitle='UTXOs'/>
    <NavButton url={AppUrl.MyTx} icon={<MonetizationOnIcon />} buttonTitle='New transaction'/>
    <NavButton url={AppUrl.MyAddress} icon={<PermIdentityIcon />} buttonTitle='My Address'/>

  </React.Fragment>
);
