
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

export type menuItem = {
    name: string;
    icon: JSX.Element;
    href: string;
}

export const menu: menuItem[] = [
    {
        name: 'New time',
        icon: (<RestoreIcon />),
        href: "/"
    },
    {
        name: 'Saved times',
        icon: (<RestoreIcon />),
        href: "/list"
    }
]