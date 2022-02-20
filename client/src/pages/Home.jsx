import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import { loadVolunteers, setFilter } from "../store/actions/volunteerActions";
import VolunteersTable from "../components/VolunteersTable";
// import Footer from "../components/Footer";

import { ReactComponent as SearchIcon } from '../assets/imgs/icons/search-icon.svg';
import { ReactComponent as ExportIcon } from '../assets/imgs/icons/export-icon.svg';
import { ReactComponent as AddVolunteerIcon } from '../assets/imgs/icons/add-person-icon.svg';
import { ReactComponent as ClearIcon } from '../assets/imgs/icons/close-icon.svg';

const Home = () => {
    const dispatch = useDispatch();
    const { volunteers, volunteersToShow, filters } = useSelector(state => state.volunteerReducer);
    const onExport = useRef(null);
    
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
                            value={filters.search}
                            onChange={ev =>
                                dispatch(setFilter({
                                    ...filters,
                                    search: ev.target.value
                                }))}
                        />
                        <button className={`clear-btn flex-center` +
                            `${filters.search?.length ? ' show' : ''}`}
                            onClick={() =>
                                dispatch(setFilter({
                                    ...filters, search: ''
                                }))}>
                            <ClearIcon />
                        </button>
                    </span>
                    <span className="header-btns flex">
                        <button><AddVolunteerIcon /></button>
                        <button onClick={() => onExport.current()}><ExportIcon /></button>
                    </span>
                </section>
            </section>

            <VolunteersTable volunteers={volunteersToShow} onExport={onExport} />
            {/* <Footer /> */}
        </section>
    );
};

export default Home;