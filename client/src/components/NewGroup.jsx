import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { saveVolunteer } from "../store/actions/volunteerActions";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function NewGroupModal({ open, setOpen }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className='new_group_modal'>
                <button
                    className='new_vol_close-button'
                    onClick={() => setOpen(false)}
                    type='button'
                />
                <h1 className='new_group_title'>הוספת קבוצה/ארגון חדשים</h1>
            </Box>
        </Modal>
    );
}

export default NewGroupModal;
