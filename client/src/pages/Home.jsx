import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import {
  loadVolunteers,
  searchVolunteers,
} from "../store/actions/volunteerActions";
import VolunteersTable from "../components/VolunteersTable";
import NewVolunteerModal from "../components/NewVolunteerModal";
import ProfileVolunteerModal from "../components/ProfileVolunteerModal";
// import Footer from "../components/Footer";

import { ReactComponent as SearchIcon } from "../assets/imgs/icons/search-icon.svg";
import { ReactComponent as ExportIcon } from "../assets/imgs/icons/export-icon.svg";
import { ReactComponent as AddVolunteerIcon } from "../assets/imgs/icons/add-person-icon.svg";
import BasePage from "../pages/BasePage";
// import { ReactComponent as ClearIcon } from '../assets/imgs/icons/close-icon.svg';

const Home = () => {
  const dispatch = useDispatch();
  const { volunteers, volunteersToShow } = useSelector(
    (state) => state.volunteerReducer
  );
  const onExport = useRef(null);
  const [isNewVolModalOpen, setNewVolModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [volunteerProfileToShow, setVolunteerProfileToShow] = useState({});

  const openProfileModal = (volunteer) => {
    setProfileModalOpen(true);
    setVolunteerProfileToShow(volunteer);
  };

  useEffect(() => {
    if (!volunteers.length) {
      dispatch(loadVolunteers());
    }
  }, [volunteers]);

  return (

    <BasePage
      title='טבלת מתנדבים'
      doSearch={(searchWord) => { dispatch(searchVolunteers(searchWord)) }}
      doExport={() => onExport.current()}
      onAdd={() => setNewVolModalOpen(true)}
    >
      <VolunteersTable
        volunteers={volunteersToShow}
        onExport={onExport}
        openProfileModal={openProfileModal}
      />
      {/* <Footer /> */}
      {isNewVolModalOpen && (
        <NewVolunteerModal
          open={isNewVolModalOpen}
          setOpen={setNewVolModalOpen}
        />
      )}
      {isProfileModalOpen && (
        <ProfileVolunteerModal
          volunteer={volunteerProfileToShow}
          open={isProfileModalOpen}
          setOpen={setProfileModalOpen}
        />
      )}
    </BasePage>

  );
};

export default Home;
