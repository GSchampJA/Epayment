import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavButton from './NavButton';

export const NavListItems_primary = (
  <React.Fragment>

    <NavButton url='/' icon={<DashboardIcon />} buttonTitle='Dashboard'/>
    <NavButton url='trace' icon={<ShoppingCartIcon />} buttonTitle='Transaction'/>
    <NavButton url='reactPage' icon={<PeopleIcon />} buttonTitle='Customers'/>


    <NavButton url='/' icon={<BarChartIcon />} buttonTitle='BarChartIcon'/>
    <NavButton url='/' icon={<PeopleIcon />} buttonTitle='Layers'/>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>


    <NavButton url='/' icon={<AssignmentIcon />} buttonTitle='quarter'/>
    <NavButton url='/' icon={<AssignmentIcon />} buttonTitle='Last quarter'/>
    <NavButton url='/' icon={<AssignmentIcon />} buttonTitle='Year-end sale'/>

  </React.Fragment>
);
