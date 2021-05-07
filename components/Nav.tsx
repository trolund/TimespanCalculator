import { BottomNavigation, BottomNavigationAction, Link } from '@material-ui/core';
import React, { useEffect } from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { menu } from '../services/menu';
import { useRouter } from 'next/router'

interface navProps {
    setLocation: (page: number) => void;
    location: number;
}

const Nav: React.FC<navProps> = ({ setLocation, location }) => {
    const router = useRouter()

    useEffect(() => {
        if (router.route.includes("list")) {
            setLocation(1)
        } else {
            setLocation(0)
        }

    }, [router]);

    const go = (event, newValue) => {
        router.push(menu[newValue].href)
        setLocation(newValue);
    }

    return (<BottomNavigation
        className="nav"
        value={location}
        onChange={go}
        showLabels
    >
        {menu.map(item => {
            return (<BottomNavigationAction key={item.name} label={item.name} icon={item.icon} />)
        })}

    </BottomNavigation>)
}

export default Nav;