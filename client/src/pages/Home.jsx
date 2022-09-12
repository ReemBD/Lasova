import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { DebounceInput } from "react-debounce-input";
import { loadVolunteers, searchVolunteers } from '../store/actions/volunteerActions';
import NewVolunteerModal from '../components/NewVolunteerModal';
import ProfileVolunteerModal from '../components/ProfileVolunteerModal';

import { ReactComponent as NewLead } from '../assets/imgs/icons/status/new-lead.svg';
import { ReactComponent as Standby } from '../assets/imgs/icons/status/standby.svg';
import { ReactComponent as Active } from '../assets/imgs/icons/status/active.svg';
import { ReactComponent as Inactive } from '../assets/imgs/icons/status/inactive.svg';

// import Footer from "../components/Footer";

// import { ReactComponent as SearchIcon } from "../assets/imgs/icons/search-icon.svg";
// import { ReactComponent as ExportIcon } from "../assets/imgs/icons/export-icon.svg";
// import { ReactComponent as AddVolunteerIcon } from "../assets/imgs/icons/add-person-icon.svg";
import BasePage from '../pages/BasePage';
import BaseTable from '../components/BaseTable';
import FilterableHeaderCell from '../components/FilterableHeaderCell';

// import { ReactComponent as ClearIcon } from '../assets/imgs/icons/close-icon.svg';

const Home = () => {
  const dispatch = useDispatch();
  const { volunteers, volunteersToShow } = useSelector((state) => state.volunteerReducer);
  const exportRef = useRef(null);
  const csvBtnRef = useRef(null);

  const [isNewVolModalOpen, setNewVolModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const [volunteerProfileToShow, setVolunteerProfileToShow] = useState({});

  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [filter, setFilter] = useState({
    status: '',
    volunteeringProgram: '',
    volunteerType: ''
  });
  const filterOptions = useMemo(() => {
    if (!volunteers) return {};
    const retval = volunteers.reduce((acc, curr) => {
      Object.keys(filter).forEach((key) => {
        acc[key].add(curr[key]);
      });
      return acc;
    }, createInitialFilterOptions());
    Object.keys(retval).forEach((key) => {
      retval[key] = Array.from(retval[key]);
    });
    return retval;
  }, [createInitialFilterOptions, filter, volunteers]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function createInitialFilterOptions() {
    const retval = {};
    Object.keys(filter).forEach((key) => {
      retval[key] = new Set();
      retval[key].add('בחר הכל');
    });
    return retval;
  }

  const openProfileModal = (volunteer) => {
    setProfileModalOpen(true);
    setVolunteerProfileToShow(volunteer);
  };

  useEffect(() => {
    dispatch(loadVolunteers());
  }, [isProfileModalOpen, isNewVolModalOpen, dispatch]);

  const onSetFilter = (filterBy) => {
    setFilter({
      ...filter,
      [activeFilter]: filterBy
    });
    setActiveFilter('');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFilterableHeaderCellProps = (name, title) => {
    return {
      title,
      onToggleDropdown: ({ bottom, left }) => {
        setDropdownPosition({ top: bottom, left });
        activeFilter === name ? setActiveFilter('') : setActiveFilter(name);
      }
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statuses = [
    { type: 'active', label: 'פעיל', icon: <Active /> },
    { type: 'new', label: 'חדש', icon: <NewLead /> },
    { type: 'standby', label: 'מושהה', icon: <Standby /> },
    { type: 'inactive', label: 'לא פעיל', icon: <Inactive /> }
  ];

  const columns = useMemo(
    () => [
      {
        field: 'status',
        description: 'סטטוס',
        headerName: 'סטטוס',
        renderHeader: () => <FilterableHeaderCell {...getFilterableHeaderCellProps('status', 'סטטוס')} />,
        valueFormatter: ({ value }) => statuses.find((status) => status.type === value)?.label || statuses[2].type,
        renderCell: (params) => statuses.find((status) => status.type === params.row.status)?.icon || <Standby />
      },
      {
        field: 'firstName',
        headerName: 'שם פרטי',
        description: 'שם פרטי',
        valueGetter: (params) => params.row.firstName || ''
      },
      {
        field: 'lastName',
        headerName: 'שם משפחה',
        description: 'שם משפחה',
        valueGetter: (params) => params.row.lastName || ''
      },
      {
        field: 'taz',
        headerName: 'תעודת זהות',
        valueGetter: (params) => params.row.taz || '-'
      },
      {
        field: 'volunteeringProgram.name',
        headerName: 'מסגרת התנדבות',
        description: 'מסגרת התנדבות',
        renderHeader: () => (
          <FilterableHeaderCell {...getFilterableHeaderCellProps('volunteeringProgram', 'מסגרת התנדבות')} />
        ),
        valueGetter: (params) => params.row.volunteeringProgram.name || ''
      },
      {
        field: 'volunteerType',
        headerName: 'מסגרת מפנה',
        description: 'מסגרת מפנה',
        renderHeader: () => (
          <FilterableHeaderCell {...getFilterableHeaderCellProps('volunteerType', 'מסגרת מפנה')} />
        ),
        valueGetter: (params) => {
          if (params.row.scholarship) {
            return `מלגה, ${params.row.scholarship}`;
          }
          return params.row.volunteerType || '';
        }
      },
      {
        field: 'volunteerHours',
        headerName: 'שעות מדווחות',
        description: 'שעות מדווחות',
        sortable: false,
        valueFormatter: ({ _id }) => {
          const volunteer = volunteers?.find((volunteer) => volunteer._id === _id);
          const volunteerHours = volunteer?.reportedHours || 0;
          return volunteerHours;
        },
        renderCell: (params) => (
          <>
            <span className="reported-hours">{params.row.reportedHours || 0}</span>
          </>
        )
      }
      // {
      //     field: 'actions',
      //     type: 'actions',
      //     getActions: params => [
      //         <GridActionsCellItem icon={<Edit />} onClick={...} label="Edit" />,
      //         <GridActionsCellItem icon={<DeleteIcon />} onClick={onRemoveVolunteer(params.row.volunteerId)} label="Delete" />,
      //     ]
      // }
    ],
    [getFilterableHeaderCellProps, statuses, volunteers]
  );

  return (
    <BasePage
      title="טבלת מתנדבים"
      doSearch={(searchWord) => {
        dispatch(searchVolunteers(searchWord));
      }}
      doExport={() => exportRef.current()}
      onAdd={() => setNewVolModalOpen(true)}
    >
      <BaseTable
        entities={volunteersToShow}
        columns={columns}
        exportRef={exportRef}
        csvBtnRef={csvBtnRef}
        exportFileName="לשובע-מתנדבים-"
        activeFilter={activeFilter}
        dropdownPosition={dropdownPosition}
        filterOptions={filterOptions}
        onSetFilter={onSetFilter}
        filter={filter}
        onEntityClick={openProfileModal}
      />
      {/* <VolunteersTable // Probably need to be deleted
        volunteers={volunteersToShow}
        onExport={onExport}
        openProfileModal={openProfileModal}
      /> */}
      {/* <Footer /> */}
      {isNewVolModalOpen && <NewVolunteerModal open={isNewVolModalOpen} setOpen={setNewVolModalOpen} />}
      {isProfileModalOpen && (
        <ProfileVolunteerModal
          volunteers={volunteers}
          volunteer={volunteerProfileToShow}
          open={isProfileModalOpen}
          setOpen={setProfileModalOpen}
          statuses={statuses}
        />
      )}
    </BasePage>
  );
};

export default Home;
