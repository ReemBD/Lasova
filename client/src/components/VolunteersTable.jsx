import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { loadVolunteers } from "../store/actions/volunteerActions";
import { Loader } from "./Loader";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

const VolunteersTable = () => {
  const dispatch = useDispatch(); // mapDispatchToProps
  const { allVolunteers, filteredVolunteers } = useSelector(
    (state) => state.volunteerReducer
  ); // mapPropsToState

  // runs only on component mount
  useEffect(() => {
    if (!allVolunteers.length) {
      dispatch(loadVolunteers());
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ת.ז",
      width: 180,
      headerClassName: "header",
    },
    {
      field: "firstName",
      headerName: "שם פרטי",
      width: 200,
      headerClassName: "header",
    },
    {
      field: "lastName",
      headerName: "שם משפחה",
      width: 200,
      headerClassName: "header",
    },
    {
      field: "misgeret_h",
      headerName: "מסגרת התנדבות",
      width: 260,
      headerClassName: "header",
    },
    {
      field: "misgeret_m",
      headerName: "מסגרת מפנה",
      width: 260,
      headerClassName: "header",
    },
    {
      field: "hours",
      headerName: "שעות מדווחות",
      width: 220,
      headerClassName: "header",
    },
  ];

  const rows = filteredVolunteers.map((volunteer) => {
    return {
      id: volunteer.taz,
      firstName: volunteer.first_name,
      lastName: volunteer.last_name,
      misgeret_h: volunteer.group_name,
      misgeret_m: volunteer.scholarship,
      hours: volunteer.hours,
    };
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
      <div className="vt_section">
        {filteredVolunteers.length ? (
          <DataGrid
            sx={{
              "& .header": {
                fontSize: "1.5rem",
              },
            }}
            style={{
              fontSize: "1rem",
            }}
            rows={rows}
            columns={columns}
            pageSize={8}
            hideFooterSelectedRowCount
            checkboxSelection
            components={{
              Pagination: CustomPagination,
              Toolbar: CustomToolbar,
            }}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default VolunteersTable;
