import { useEffect } from 'react';

import {
  GridOverlay,
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import Loader from "./Loader";

import { ReactComponent as NoResult } from "../assets/imgs/icons/no-result.svg";

const TableLoader = () => {
  return (
    <GridOverlay>
      <Loader />
    </GridOverlay>
  );
};


const CustomNoRowsOverlay = () => {
  return (
    <GridOverlay>
      <div className="flex column align-center">
        <NoResult />
        No results
      </div>
    </GridOverlay>
  );
};

const BaseTable = ({ entities, rows, columns, ExportCsvBtn, onEntityClick }) => {

  useEffect(() => { console.log({ entities }) }, [])

  return (
    <section className="base-table">
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: ExportCsvBtn,
          LoadingOverlay: TableLoader,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        loading={entities === null}
        hideFooter
        checkboxSelection
        disableColumnMenu
        disableSelectionOnClick
        onRowClick={(ev) => {
          console.log("open profile of volunteerId:", ev.row);
          onEntityClick(ev.row);
        }}
      />
    </section>
  );
};

export default BaseTable;
