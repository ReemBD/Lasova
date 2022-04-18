import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { groupService } from "../services/group-service"

import BasePage from './BasePage';
import BaseTable from '../components/BaseTable'
// (function loadMockToStorage() {
//     console.log()
//     if (!JSON.parse(localStorage.getItem('group'))) {
//         const mockData = require('../services/group-mock-data.json');
//         localStorage['group'] = JSON.stringify(mockData);
//     }
// })();
const GroupsPage = () => {


    const [groups, setGroups] = useState();
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
        if (!JSON.parse(localStorage.getItem('group'))) {
            const mockData = require('../services/group-mock-data.json');
            localStorage['group'] = JSON.stringify(mockData);
        }
        const newGroups = await groupService.query()
        console.log({newGroups})
        setGroups(newGroups)
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
            // {
            //     field: 'actions',
            //     type: 'actions',
            //     getActions: params => [
            //         <GridActionsCellItem icon={<Edit />} onClick={...} label="Edit" />,
            //         <GridActionsCellItem icon={<DeleteIcon />} onClick={onRemoveVolunteer(params.row.volunteerId)} label="Delete" />,
            //     ]
            // }
        ],
        []
    );

    return (
        <BasePage title="טבלת קבוצות וארגונים">
            <BaseTable
                entities={groups}
                columns={columns}
                rows={groups}
            />
        </BasePage>
    )
}


export default GroupsPage;