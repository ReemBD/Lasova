import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { groupService } from "../services/group-service"

import {
    GridToolbarContainer,
    useGridApiContext,
} from "@mui/x-data-grid";

import { updateUserMsg } from "../store/actions/systemActions.js";

import BasePage from './BasePage';
import BaseTable from '../components/BaseTable'

const GroupsPage = () => {


    const [groups, setGroups] = useState();
    const [groupsToShow, setGroupsToShow] = useState();
    const exportRef = useRef(null);
    const csvBtnRef = useRef(null);


    // const dispatch = useDispatch();
    // const { groups, groupsToShow } = useSelector(
    //   (state) => state.volunteerReducer
    // );
    useEffect(() => {
        if (!groups) {
            loadGroups()
        }
    }, [])

    const loadGroups = async () => {
        //should move to store
        if (!JSON.parse(localStorage.getItem('group'))) {
            const mockData = require('../services/group-mock-data.json');
            localStorage['group'] = JSON.stringify(mockData);
        }
        const newGroups = await groupService.query()
        setGroups(newGroups)
        setGroupsToShow(newGroups)
    }


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


    //should move to store
    function searchGroups(searchText) {
        if(!searchText) setGroupsToShow(groups)
        let filteredGroups = groups.filter((group) => {
            return (
                group.groupName.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        setGroupsToShow(filteredGroups)
    };


    return (
        <BasePage title="טבלת קבוצות וארגונים"
            doExport={() => exportRef.current()}
            doSearch={(searchText) => searchGroups(searchText)}
        >
            <BaseTable
                entities={groupsToShow}
                columns={columns}
                rows={groupsToShow}
                exportRef={exportRef}
                csvBtnRef={csvBtnRef}
            />
        </BasePage>
    )
}


export default GroupsPage;