import { useState, useEffect, useMemo, useRef } from 'react';
import { GridOverlay, DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import Loader from './Loader';

import { ReactComponent as FilterIcon } from '../assets/imgs/icons/arrowhead-down-icon.svg';
import { ReactComponent as NewLead } from '../assets/imgs/icons/status/new-lead.svg';
import { ReactComponent as Standby } from '../assets/imgs/icons/status/standby.svg';
import { ReactComponent as Active } from '../assets/imgs/icons/status/active.svg';
import { ReactComponent as Inactive } from '../assets/imgs/icons/status/inactive.svg';
import { ReactComponent as NoResult } from '../assets/imgs/icons/no-result.svg';

const TableLoader = () => {
    return (<GridOverlay>
        <Loader />
    </GridOverlay>);
};

const FilterColumnBtn = (colType, value) => {
    return (<>
        <p>{value}</p>
        <span className="filter-btn-wrapper">
            <button className='show-filter-btn'
                onClick={ev => {
                    ev.stopPropagation();
                    console.log(`show ${colType} filter`);
                }}>
                <FilterIcon />
            </button>
        </span>
    </>);
};

const CustomNoRowsOverlay = () => {
    return (<GridOverlay>
        <div className='flex column align-center'>
            <NoResult />
            No results
        </div>
    </GridOverlay>);
};

const statuses = [
    { type: 'active', label: 'פעיל', icon: <Active /> },
    { type: 'new', label: 'חדש', icon: <NewLead /> },
    { type: 'standby', label: 'מושהה', icon: <Standby /> },
    { type: 'inactive', label: 'לא פעיל', icon: <Inactive /> }
]; // used for CSV export

const VolunteersTable = ({ volunteers, onExport }) => {
    const csvBtnRef = useRef(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        onExport.current = () => csvBtnRef.current.click();
    }, []);

    useEffect(() => {
        if (volunteers !== null) {
            setRows(volunteers);
        }
    }, [volunteers]);

    const ExportCsvBtn = () => {
        const apiRef = useGridApiContext();
        const csvOptions = {
            utf8WithBom: true,
            fileName: 'לשובע-מתנדבים-' + new Date()
                .toLocaleDateString('he-IL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
        };

        return <GridToolbarContainer>
            <button ref={csvBtnRef} onClick={() => apiRef.current.exportDataAsCsv(csvOptions)}></button>
        </GridToolbarContainer>;
    };

    const columns = useMemo(() => [
        {
            field: 'status',
            description: 'סטטוס',
            renderHeader: () => FilterColumnBtn('status', 'סטטוס'),
            valueFormatter: ({ value }) => statuses.find(status => status.type === value).label,
            renderCell: params => (statuses.find(status =>
                status.type === params.row.status)?.icon || '')
        },
        {
            field: 'firstName',
            headerName: 'שם פרטי',
            description: 'שם פרטי',
            valueGetter: params => params.row.firstName || '',
        },
        {
            field: 'lastName',
            headerName: 'שם משפחה',
            description: 'שם משפחה',
            valueGetter: params => params.row.lastName || '',
        },
        {
            field: 'taz',
            headerName: 'תעודת זהות',
            description: 'תעודת זהות',
            valueGetter: params => params.row.taz || NaN,
        },
        {
            field: 'volunteerType',
            headerName: 'מסגרת התנדבות',
            description: 'מסגרת התנדבות',
            renderHeader: () => FilterColumnBtn('volunteerType', 'מסגרת התנדבות'),
            valueGetter: params => params.row.volunteerType || ''
        },
        {
            field: 'misgeretType',
            headerName: 'מסגרת מפנה',
            description: 'מסגרת מפנה',
            renderHeader: () => FilterColumnBtn('misgeretType', 'מסגרת מפנה'),
            valueGetter: params => {
                if (params.row.scholarship) {
                    return `מלגה, ${params.row.scholarship}`;
                }
                return params.row.groupName || '';
            },
        },
        {
            field: 'volunteerHours',
            headerName: 'שעות מדווחות/מאושרות',
            description: 'שעות מדווחות/מאושרות',
            sortable: false,
            valueFormatter: ({ id }) => {
                const volunteer = volunteers?.find(volunteer => volunteer.id === id);
                const volunteerHours = (volunteer?.reportedHours || 0) + ' / ' + (volunteer?.approvedHours || 0);
                return volunteerHours;
            },
            renderCell: (params) => (<>
                <span className="reported-hours">
                    {params.row.reportedHours || 13}
                </span> /
                <span className="approved-hours">
                    {params.row.approvedHours || 45}
                </span>
            </>),
        },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     getActions: params => [
        //         <GridActionsCellItem icon={<Edit />} onClick={...} label="Edit" />,
        //         <GridActionsCellItem icon={<DeleteIcon />} onClick={onRemoveVolunteer(params.row.volunteerId)} label="Delete" />,
        //     ]
        // }
    ], []);

    return (
        <section className="volunteers-table">
            <DataGrid
                rows={rows}
                columns={columns}
                components={{
                    Toolbar: ExportCsvBtn,
                    LoadingOverlay: TableLoader,
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
                loading={volunteers === null}
                hideFooter
                checkboxSelection
                disableColumnMenu
                disableSelectionOnClick
                onRowClick={ev => console.log('open profile of volunteerId:', ev.id)}
            />
        </section>
    );
};

export default VolunteersTable;