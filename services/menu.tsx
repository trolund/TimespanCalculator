
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

export type menuItem = {
    name: string;
    icon: JSX.Element;
    href: string;
}

export const menu: menuItem[] = [
    {
        name: 'home',
        icon: (<RestoreIcon />),
        href: "/"
    },
    {
        name: 'list',
        icon: (<RestoreIcon />),
        href: "/list"
    }
]