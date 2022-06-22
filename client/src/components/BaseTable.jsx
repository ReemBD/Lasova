import { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';

import ExportCsvBtn from './ExportCsvBtn';
import CustomNoRowsOverlay from './dataGrid/CustomNoRowsOverlay';
import TableLoader from './dataGrid/TableLoader';

const BaseTable = ({
  entities,
  columns,
  exportRef,
  csvBtnRef,
  exportFileName,
  onEntityClick,
  activeFilter,
  dropdownPosition,
  filterOptions,
  onSetFilter,
  filter,
}) => {
  const [rows, setRows] = useState(entities || []);

  useEffect(() => {
    exportRef.current = () => csvBtnRef.current.click();
  }, []);

  useEffect(() => {
    if (entities !== null) {
      let entitiesToShow = entities;
      for (let filterBy in filter) {
        const currFilter = filter[filterBy];
        if (currFilter) {
          if (currFilter !== 'בחר הכל') {
            entitiesToShow = entitiesToShow.filter(
              (val) => val[filterBy] === currFilter
            );
          }
        }
      }
      setRows(entitiesToShow);
    }
  }, [entities, filter]);

  return (
    <>
      {activeFilter && (
        <div
          className='filter-menu'
          style={{
            ...dropdownPosition,
          }}>
          {filterOptions[activeFilter].map((o) => (
            <MenuItem
              className='filter-option'
              key={o}
              onClick={() => onSetFilter(o)}>
              {o}
            </MenuItem>
          ))}
        </div>
      )}
      <section className='base-table'>
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          components={{
            Toolbar: () => (
              <ExportCsvBtn name={exportFileName} csvBtnRef={csvBtnRef} />
            ),
            LoadingOverlay: () => <TableLoader />,
            NoRowsOverlay: () => <CustomNoRowsOverlay />,
          }}
          loading={!rows}
          hideFooter
          checkboxSelection
          disableColumnMenu
          disableSelectionOnClick
          onRowDoubleClick={(ev) => {
            onEntityClick(ev.row);
          }}
        />
      </section>
    </>
  );
};

export default BaseTable;
