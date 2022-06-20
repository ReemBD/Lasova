import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    loadGroups,
    searchGroups,
} from "../store/actions/groupActions";
import BasePage from './BasePage';
import BaseTable from '../components/BaseTable'
import FilterableHeaderCell from '../components/FilterableHeaderCell';

const GroupsPage = () => {

    const exportRef = useRef(null);
    const csvBtnRef = useRef(null);

    const dispatch = useDispatch();
    const { groups, groupsToShow } = useSelector(
        (state) => state.groupReducer
    );

    useEffect(() => {
        if (!groups) {
            dispatch(loadGroups());
        }
    }, [groups]);

    const [dropdownPosition, setDropdownPosition] = useState(null);
    const [activeFilter, setActiveFilter] = useState('');
    const [filter, setFilter] = useState({
        groupType: '',
    });
    const filterOptions = useMemo(() => {
        if (!groups) return {};
        const retval = groups.reduce((acc, curr) => {
            Object.keys(filter).forEach(key => {
                acc[key].add(curr[key])
            })
            return acc;
        }, createInitialFilterOptions())
        Object.keys(retval).forEach(key => { retval[key] = Array.from(retval[key]) })
        return retval;
    }, [groups])

    function createInitialFilterOptions() {
        const retval = {};
        Object.keys(filter).forEach(key => {
            retval[key] = new Set()
            retval[key].add('בחר הכל')
        })
        return retval;
    }

    const onSetFilter = (filterBy) => {
        setFilter({
            ...filter,
            [activeFilter]: filterBy
        })
        setActiveFilter('')
    }

    const getFilterableHeaderCellProps = (name, title) => {
        return {
            title,
            onToggleDropdown: ({ bottom, left }) => {
                setDropdownPosition({ top: bottom, left });
                activeFilter === name ? setActiveFilter('') : setActiveFilter(name);
            },
        }
    }


    const columns = useMemo(
        () => [
            {
                field: "groupType",
                description: "סוג קבוצה",
                headerName: "סוג קבוצה",
                // valueGetter: (params) => params.row.groupType || "",
                renderHeader: () => <FilterableHeaderCell {...getFilterableHeaderCellProps('groupType', "סוג קבוצה")} />,
            },
            {
                field: "groupName",
                headerName: "שם הארגון",
                description: "שם הארגון",
                valueGetter: (params) => params.row.groupName || "",
            },
            {
                field: "contactNane",
                headerName: "איש קשר",
                description: "איש קשר",
                valueGetter: (params) => params.row.contactNane || "",
            },
            {
                field: "contactRole",
                headerName: "תפקיד",
                description: "תפקיד",
                valueGetter: (params) => params.row.contactRole || "",
            },
            {
                field: "cellphone",
                headerName: "טלפון",
                description: "טלפון",
                valueGetter: (params) => params.row.cellphone || "",
            },
            {
                field: "volunteersCount",
                headerName: "מספר מתנדבים",
                description: "מספר מתנדבים",
                valueGetter: (params) => params.row.volunteersCount || "",

            },
            {
                field: "reportedHours",
                headerName: "סהכ שעות התנדבות",
                description: "סהכ שעות התנדבות",
                valueGetter: (params) => params.row.reportedHours || "",
            },
            {
                field: "volunteeringsCount",
                headerName: "סהכ התנדבויות ",
                description: "סהכ התנדבויות",
                valueGetter: (params) => params.row.volunteeringsCount || "",
            },
        ],
        [filterOptions, filter, dropdownPosition]
    );


    return (
        <BasePage title="טבלת קבוצות וארגונים"
            doExport={() => exportRef.current()}
            doSearch={(searchText) => dispatch(searchGroups(searchText))}
        >
            <BaseTable
                entities={groupsToShow}
                columns={columns}
                // rows={groupsToShow}
                exportRef={exportRef}
                csvBtnRef={csvBtnRef}
                exportFileName="לשובע-קבוצות-וארגונים"
                activeFilter={activeFilter}
                dropdownPosition={dropdownPosition}
                filterOptions={filterOptions}
                onSetFilter={onSetFilter}
                filter={filter}
            />
        </BasePage>
    )
}


export default GroupsPage;