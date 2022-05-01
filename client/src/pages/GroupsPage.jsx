import { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    loadGroups,
    searchGroups,
} from "../store/actions/groupActions";
import BasePage from './BasePage';
import BaseTable from '../components/BaseTable'

const GroupsPage = () => {

    const exportRef = useRef(null);
    const csvBtnRef = useRef(null);

    const dispatch = useDispatch();
    const { groups, groupsToShow } = useSelector(
        (state) => state.groupReducer
    );

    useEffect(() => {
        if (!groups.length) {
            dispatch(loadGroups());
        }
    }, [groups]);

    const columns = useMemo(
        () => [
            {
                field: "groupType",
                description: "סוג קבוצה",
                headerName: "סוג קבוצה",
                valueGetter: (params) => params.row.groupType || "",
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
        []
    );

    return (
        <BasePage title="טבלת קבוצות וארגונים"
            doExport={() => exportRef.current()}
            doSearch={(searchText) => dispatch(searchGroups(searchText))}
        >
            <BaseTable
                entities={groupsToShow}
                columns={columns}
                rows={groupsToShow}
                exportRef={exportRef}
                csvBtnRef={csvBtnRef}
                exportFileName="לשובע-קבוצות-וארגונים"
            />
        </BasePage>
    )
}


export default GroupsPage;