
import { DebounceInput } from "react-debounce-input";

import { ReactComponent as SearchIcon } from "../assets/imgs/icons/search-icon.svg";
import { ReactComponent as ExportIcon } from "../assets/imgs/icons/export-icon.svg";
import { ReactComponent as AddVolunteerIcon } from "../assets/imgs/icons/add-person-icon.svg";

const BasePage = ({ children, title, doSearch, doExport, onAdd }) => {
    return (
        <section className="base-page">
            <section className="table-header">
                <h1>{title}</h1>
                <section className="actions flex align-center space-between">
                    <span className="search flex align-center">
                        <label htmlFor="search">
                            <SearchIcon />
                        </label>
                        <DebounceInput
                            type="search"
                            id="search"
                            placeholder="חיפוש"
                            debounceTimeout={300}
                            // onChange={(ev) => dispatch(searchVolunteers(ev.target.value))}
                            onChange={(ev) => doSearch(ev.target.value)}
                        />
                    </span>
                    <span className="header-btns flex">
                        {/* <button className="export" onClick={() => onExport.current()}> */}
                        <button className="export" onClick={doExport}>
                            <ExportIcon />
                        </button>
                        <button
                            className="add-new"
                            // onClick={() => setNewVolModalOpen(true)}
                            onClick={onAdd}
                        >
                            <AddVolunteerIcon />
                        </button>
                    </span>
                </section>
            </section>
            {children}
        </section>

    );
};

export default BasePage;

