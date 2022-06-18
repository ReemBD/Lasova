import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserMsg } from "../store/actions/systemActions.js";

const ExportCsvBtn = ({name, csvBtnRef}) => {
    const dispatch = useDispatch();
    const apiRef = useGridApiContext();
    const csvOptions = {
        utf8WithBom: true,
        fileName:
        name +
            new Date().toLocaleDateString("he-IL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
    };
    const exportSelectedData = () => {
        if (!apiRef.current.state.selection.length) {
            const msg = {
                txt: "יש לסמן רשומות לפני ייצוא",
                type: "failure",
            };
            dispatch(updateUserMsg(msg));
            return;
        }
        apiRef.current.exportDataAsCsv(csvOptions);
    };

    return (
        <GridToolbarContainer>
            <button ref={csvBtnRef} onClick={exportSelectedData}></button>
        </GridToolbarContainer>
    );
};


export default ExportCsvBtn;