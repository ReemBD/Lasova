import {
    GridOverlay,
} from "@mui/x-data-grid";
import { ReactComponent as NoResult } from "../../assets/imgs/icons/no-result.svg";


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

export default CustomNoRowsOverlay;