import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import { loadVolunteers } from "../store/actions/volunteerActions";

import { Loader } from "./Loader";

export const VolunteersTable = () => {
  const dispatch = useDispatch();
  const { volunteers, filteredVolunteers } = useSelector(state => state.volunteerModule);

  // runs only on component mount
  useEffect(() => {
    if (!volunteers.length) dispatch(loadVolunteers());
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ת.ז",
      width: 150,
      headerClassName: "header",
    },
    {
      field: "firstName",
      headerName: "שם פרטי",
      width: 180,
      headerClassName: "header",
    },
    {
      field: "lastName",
      headerName: "שם משפחה",
      width: 180,
      headerClassName: "header",
    },
    {
      field: "misgeret_h",
      headerName: "מסגרת התנדבות",
      width: 220,
      headerClassName: "header",
    },
    {
      field: "misgeret_m",
      headerName: "מסגרת מפנה",
      width: 220,
      headerClassName: "header",
    },
    {
      field: "hours",
      headerName: "שעות מדווחות",
      width: 220,
      headerClassName: "header",
    },
  ];

  const volunteersToShow = filteredVolunteers || volunteers;
  const rows = volunteersToShow.map((volunteer) => {
    const obj = {
      id: volunteer.taz,
      firstName: volunteer.first_name,
      lastName: volunteer.last_name,
      misgeret_h: volunteer.group_name,
      misgeret_m: volunteer.scholarship,
      hours: volunteer.year_joined,
    };
    return obj;
  });

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return (
      <Pagination
        style={{ margin: "auto", direction: "ltr" }}
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "8rem",
          marginBottom: "5rem",
          backgroundColor: "#c4c4c4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#000",
            fontSize: "3rem",
            fontWeight: "400",
          }}
        >
          רשימת מתנדבים
        </h1>
      </div>
      <div
        style={{
          height: 500,
          width: "80%",
          cursor: "pointer",
          margin: "auto",
          direction: "rtl",
        }}
      >
        {volunteers.length ? <DataGrid
          sx={{
            "& .header": {
              fontSize: "2rem",
            },
          }}
          style={{
            fontSize: "1.5rem",
          }}
          rows={rows}
          columns={columns}
          pageSize={6}
          hideFooterSelectedRowCount
          components={{
            Pagination: CustomPagination,
            Toolbar: CustomToolbar,
          }}
        /> :
        <Loader />
      }
      </div>
    </>
  );
};
