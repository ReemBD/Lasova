import { ReactComponent as EnvelopeIcon } from '../assets/imgs/icons/envelope-icon.svg';

const Header = () => {
    return (<header className="flex justify-end align-center">
        <span className="messages">
            <EnvelopeIcon />
            <span className="notification"></span>
            {/* {userHasNotification && <span className="notification">
                {notificationCount}
            </span>} */}
        </span>
        <p>יוליה צמח</p>
        <span className="user-icon"></span>
    </header>)
};

export default Header;