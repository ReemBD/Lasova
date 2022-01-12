import * as React from "react";
import { connect } from "react-redux";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

const VolunteersTable = ({ volunteers = [] }) => {
  const columns = [
    {
      field: "id",
      headerName: "מזהה",
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

  const rows = volunteers.map((volunteer) => {
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
    <div
      style={{
        height: 500,
        width: "80%",
        cursor: "pointer",
        margin: "auto",
        direction: "rtl",
      }}
    >
      <DataGrid
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
        pageSize={7}
        hideFooterSelectedRowCount
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
};

const mapState = (state) => {
  const { volunteers } = state;
  return { volunteers };
};

export default connect(mapState)(VolunteersTable);
