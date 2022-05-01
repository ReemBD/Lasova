import { useEffect } from 'react';

import {
  DataGrid,
} from "@mui/x-data-grid";

import ExportCsvBtn from './ExportCsvBtn'
import CustomNoRowsOverlay from './dataGrid/CustomNoRowsOverlay';
import TableLoader from './dataGrid/TableLoader';

const BaseTable = ({ entities, rows, columns, exportRef, csvBtnRef, exportFileName, onEntityClick }) => {

  useEffect(() => {
    exportRef.current = () => csvBtnRef.current.click();
  }, [])

  return (
    <section className="base-table">
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: () => <ExportCsvBtn name={exportFileName} csvBtnRef={csvBtnRef} />,
          LoadingOverlay: () => <TableLoader />,
          NoRowsOverlay: () => <CustomNoRowsOverlay />,
        }}
        loading={entities === null}
        hideFooter
        checkboxSelection
        disableColumnMenu
        disableSelectionOnClick
        onRowClick={(ev) => {
          onEntityClick(ev.row);
        }}
      />
    </section>
  );
};

export default BaseTable;
