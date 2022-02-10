import { useLocation, Link } from "react-router-dom"
import Logo from '../assets/imgs/logo.png';
import { ReactComponent as SettingsIcon } from '../assets/imgs/icons/settings-icon.svg';

const Sidebar = () => {
    const currLocation = useLocation().pathname;
    console.log('currLocation:', currLocation);
    
    const links = [
        { title: 'דשבורד', destination: '/dashboard' },
        { title: 'מתנדבים', destination: '/' },
        { title: 'קבוצות וארגונים', destination: '/groups' },
        { title: 'מנהלי מסגרות', destination: '/managers' },
        { title: 'מסגרות התנדבות', destination: '/misgarot'},
    ];

    return <aside>
        <img src={Logo} alt="laSova" className="logo"/>
        <nav className="flex column">{links.map(link =>
            <Link key={link.title+link.destination} to={link.destination}
                className={currLocation === link.destination ? 'active' : ''}>
                {link.title}
            </Link>)}
        </nav>
        <Link to={'/'} className="settings flex align-center">
            <SettingsIcon />
            <span>הגדרות</span>
        </Link>

    </aside>
};

export default Sidebar;