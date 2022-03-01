import { useSelector } from "react-redux";
import UserMsg from "../components/UserMsg.jsx";
import { ReactComponent as EnvelopeIcon } from "../assets/imgs/icons/envelope-icon.svg";

const Header = () => {
  const { userMsg } = useSelector((state) => state.systemReducer);

  return (
    <header className="flex justify-end align-center">
      {userMsg.txt && <UserMsg msg={userMsg} />}
      <button className="messages">
        <EnvelopeIcon />
        <span className="notification"></span>
        {/* {userHasNotification && <span className="notification">
                {notificationCount}
            </span>} */}
      </button>
      <p>יוליה צמח</p>
      <button className="user-icon"></button>
    </header>
  );
};

export default Header;
