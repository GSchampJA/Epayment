import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavButtonProps {
    url: string;
    icon?: any
    buttonTitle?: string
}


const NavButton = (props: NavButtonProps) => {
    const {url, icon, buttonTitle} = props

    return (
        <Link to={url}>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={buttonTitle} />
            </ListItemButton>
        </Link>
    )
    
}

export default NavButton;
