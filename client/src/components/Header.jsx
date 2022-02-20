import { ReactComponent as EnvelopeIcon } from '../assets/imgs/icons/envelope-icon.svg';

const Header = () => {
    return (<header className="flex justify-end align-center">
        <button className="messages">
            <EnvelopeIcon />
            <span className="notification"></span>
            {/* {userHasNotification && <span className="notification">
                {notificationCount}
            </span>} */}
        </button>
        <p>יוליה צמח</p>
        <button className="user-icon"></button>
    </header>)
};

export default Header;