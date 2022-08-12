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
                    className='new_group_close-button'
                    onClick={() => setOpen(false)}
                    type='button'
                />
                <h1 className='new_group_title'>הוספת קבוצה/ארגון חדשים</h1>
                <form className='new_group_form'>
                    <div className='new_group_organization-data'>
                        <div>
                            <h2 className='title'>ארגון</h2>
                            <div className='new_group_form-block'>
                                <label htmlFor='name'>
                                    <input
                                        className='input'
                                        type='text'
                                        placeholder='שם'
                                        name='name'
                                    />
                                </label>
                                <select name='profile' className='input'>
                                    <option id='0' value='null'>
                                        פרופיל
                                    </option>
                                    <option id='1' value='עצמאי'>
                                        עצמאי
                                    </option>
                                    <option id='2' value='סטודנט'>
                                        סטודנט
                                    </option>
                                    <option id='3' value='שלצ'>
                                        של"צ
                                    </option>
                                </select>
                                <label htmlFor='city'>
                                    <input
                                        className='input'
                                        placeholder='עיר'
                                        type='text'
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='new_group_contact-data'>
                        <h2 className='title'>איש קשר</h2>
                        <div className='new_group_form-block'>
                            <label htmlFor='contactName'>
                                <input
                                    type='text'
                                    className='input'
                                    name='contactName'
                                    placeholder='שם'
                                />
                            </label>
                            <label htmlFor='position'>
                                <input
                                    type='text'
                                    className='input'
                                    name='position'
                                    placeholder='תפקיד'
                                />
                            </label>
                            <label htmlFor='phone'>
                                <input
                                    type='tel'
                                    className='input'
                                    name='phone'
                                    placeholder='טלפון'
                                />
                            </label>
                            <label htmlFor='email'>
                                <input
                                    type='email'
                                    className='input'
                                    name='email'
                                    placeholder='מייל'
                                />
                            </label>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default NewGroupModal;
