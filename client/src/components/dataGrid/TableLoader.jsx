import {
    GridOverlay,
} from "@mui/x-data-grid";
import Loader from "../Loader";

const TableLoader = () => {
    return (
        <GridOverlay>
            <Loader />
        </GridOverlay>
    );
};

export default TableLoader;