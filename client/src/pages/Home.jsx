import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import { loadVolunteers, searchVolunteers } from "../store/actions/volunteerActions";
import VolunteersTable from "../components/VolunteersTable";
import NewVolunteerModal from "../components/NewVolunteerModal";
// import Footer from "../components/Footer";

import { ReactComponent as SearchIcon } from '../assets/imgs/icons/search-icon.svg';
import { ReactComponent as ExportIcon } from '../assets/imgs/icons/export-icon.svg';
import { ReactComponent as AddVolunteerIcon } from '../assets/imgs/icons/add-person-icon.svg';
// import { ReactComponent as ClearIcon } from '../assets/imgs/icons/close-icon.svg';

const Home = () => {
    const dispatch = useDispatch();
    const { volunteers, volunteersToShow } = useSelector(state => state.volunteerReducer);
    const onExport = useRef(null);
    const [isNewModalOpen, setNewModalOpen] = useState(false)
    // const [isProfileModalOpen, setProfileModalOpen] = useState(false)
    
    useEffect(() => {
        if (!volunteers.length) {
            dispatch(loadVolunteers());
        }
    }, [volunteers]);

    return (
        <section className="home page">

            <section className="table-header">
                <h1>טבלת מתנדבים</h1>
                <section className="actions flex align-center space-between">
                    <span className="search flex align-center">
                        <label htmlFor="search"><SearchIcon /></label>
                        <DebounceInput
                            type="search"
                            id="search"
                            placeholder="חיפוש"
                            debounceTimeout={300}
                            onChange={ev =>
                                dispatch(searchVolunteers(ev.target.value))}
                        />
                        
                    </span>
                    <span className="header-btns flex">
                        <button className="export" onClick={() => onExport.current()}><ExportIcon /></button>
                        <button className="add-new" onClick={() => setNewModalOpen(true)}><AddVolunteerIcon /></button>
                    </span>
                </section>
            </section>

            <VolunteersTable volunteers={volunteersToShow} onExport={onExport} />
            {/* <Footer /> */}
            {isNewModalOpen && <NewVolunteerModal open={ isNewModalOpen} setOpen={ setNewModalOpen} />}
        </section>
    );
};

export default Home;