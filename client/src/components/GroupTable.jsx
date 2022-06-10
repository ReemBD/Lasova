import {
    GridOverlay,
    DataGrid,
    GridToolbarContainer,
    useGridApiContext,
  } from "@mui/x-data-grid";


const GroupTable = () => {


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
                loading={volunteers === null}
                hideFooter
                checkboxSelection
                disableColumnMenu
                disableSelectionOnClick
                onRowClick={(ev) => {
                    console.log("open profile of volunteerId:", ev.row);
                    openProfileModal(ev.row);
                }}
            />
        </section>
    )
}

export default GroupTable