import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";

import { updateUserMsg } from "../store/actions/systemActions.js";

import { ReactComponent as NewLead } from "../assets/imgs/icons/status/new-lead.svg";
import { ReactComponent as Standby } from "../assets/imgs/icons/status/standby.svg";
import { ReactComponent as Active } from "../assets/imgs/icons/status/active.svg";
import { ReactComponent as Inactive } from "../assets/imgs/icons/status/inactive.svg";

import CustomNoRowsOverlay from "./dataGrid/CustomNoRowsOverlay";
import TableLoader from "./dataGrid/TableLoader";
import FilterableHeaderCell from "./FilterableHeaderCell";
import ExportCsvBtn from "./ExportCsvBtn";

const statuses = [
  { type: "active", label: "פעיל", icon: <Active /> }, //Green
  { type: "new", label: "חדש", icon: <NewLead /> }, //Blue, undefined yet what is the function for
  { type: "standby", label: "מושהה", icon: <Standby /> }, //Yellow
  { type: "inactive", label: "לא פעיל", icon: <Inactive /> }, //Red
];

export const VolunteersTable = ({ volunteers, onExport, openProfileModal }) => {
  const csvBtnRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    groupName: "",
    volunteerType: "",
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
  }, [volunteers]);
  function createInitialFilterOptions() {
    const retval = {};
    Object.keys(filter).forEach((key) => {
      retval[key] = new Set();
      retval[key].add("בחר הכל");
    });
    return retval;
  }

  useEffect(() => {
    onExport.current = () => csvBtnRef.current.click();
  }, []);

  useEffect(() => {
    if (volunteers !== null) {
      let volunteersToShow = volunteers;
      for (let filterBy in filter) {
        const currFilter = filter[filterBy];
        if (currFilter) {
          if (currFilter !== "בחר הכל") {
            volunteersToShow = volunteersToShow.filter(
              (val) => val[filterBy] === currFilter
            );
          }
        }
      }
      setRows(volunteersToShow);
    }
  }, [volunteers, filter]);

  const onSetFilter = (filterBy) => {
    setFilter({
      ...filter,
      [activeFilter]: filterBy,
    });
    setActiveFilter("");
  };

  const getFilterableHeaderCellProps = (name, title) => {
    return {
      name,
      value: filter[name],
      title,
      options: filterOptions[name],
      isSelectingFilter: dropdownPosition === name,
      onToggleDropdown: ({ bottom, left }) => {
        setDropdownPosition({ top: bottom, left });
        activeFilter === name ? setActiveFilter("") : setActiveFilter(name);
      },
    };
  };
  const columns = useMemo(
    () => [
      {
        field: "status",
        description: "סטטוס",
        headerName: "סטטוס",
        renderHeader: () => (
          <FilterableHeaderCell
            {...getFilterableHeaderCellProps("status", "סטטוס")}
          />
        ),
        valueFormatter: ({ value }) =>
          statuses.find((status) => status.type === value)?.label,
        renderCell: (params) =>
          statuses.find((status) => status.type === params.row.status)?.icon ||
          "",
      },
      {
        field: "firstName",
        headerName: "שם פרטי",
        description: "שם פרטי",
        valueGetter: (params) => params.row.firstName || "",
      },
      {
        field: "lastName",
        headerName: "שם משפחה",
        description: "שם משפחה",
        valueGetter: (params) => params.row.lastName || "",
      },
      {
        field: "taz",
        headerName: "תעודת זהות",
        valueGetter: (params) => params.row.taz || "-",
      },
      {
        field: "volunteerType",
        headerName: "מסגרת התנדבות",
        description: "מסגרת התנדבות",
        renderHeader: () => (
          <FilterableHeaderCell
            {...getFilterableHeaderCellProps("volunteerType", "מסגרת התנדבות")}
          />
        ),
        valueGetter: (params) => params.row.volunteerType || "",
      },
      {
        field: "groupName",
        headerName: "מסגרת מפנה",
        description: "מסגרת מפנה",
        renderHeader: () => (
          <FilterableHeaderCell
            {...getFilterableHeaderCellProps("groupName", "מסגרת מפנה")}
          />
        ),
        valueGetter: (params) => {
          if (params.row.scholarship) {
            return `מלגה, ${params.row.scholarship}`;
          }
          return params.row.groupName || "";
        },
      },
      {
        field: "volunteerHours",
        headerName: "שעות מדווחות/מאושרות",
        description: "שעות מדווחות/מאושרות",
        sortable: false,
        valueFormatter: ({ id }) => {
          const volunteer = volunteers?.find(
            (volunteer) => volunteer._id === id
          );
          const volunteerHours =
            (volunteer?.reportedHours || 0) +
            " / " +
            (volunteer?.approvedHours || 0);
          return volunteerHours;
        },
        renderCell: (params) => (
          <>
            <span className="reported-hours">
              {params.row.reportedHours || 13}
            </span>{" "}
            /
            <span className="approved-hours">
              {params.row.approvedHours || 45}
            </span>
          </>
        ),
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
    [filterOptions, filter, dropdownPosition]
  );

  return (
    <>
      {activeFilter && (
        <div
          className="filter-menu"
          style={{
            ...dropdownPosition,
          }}
        >
          {filterOptions[activeFilter].map((o) => (
            <MenuItem
              className="filter-option"
              key={o}
              onClick={() => onSetFilter(o)}
            >
              {o}
            </MenuItem>
          ))}
        </div>
      )}
      <section className="base-table">
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          components={{
            Toolbar: () => (
              <ExportCsvBtn name={"לשובע-מתנדבים-"} csvBtnRef={csvBtnRef} />
            ),
            LoadingOverlay: () => <TableLoader />,
            NoRowsOverlay: () => <CustomNoRowsOverlay />,
          }}
          loading={volunteers === null}
          hideFooter
          checkboxSelection
          disableColumnMenu
          disableSelectionOnClick
          onRowClick={(ev) => {
            console.log("open profile of volunteerId:", ev.row);
            openProfileModal(ev.row);
          }}
          onCellClick={(ev) => {
            ev.stopPropagation();
          }}
        />
      </section>
    </>
  );
};

export default VolunteersTable;
