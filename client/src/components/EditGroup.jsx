import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveGroup } from "../store/actions/groupActions";
// import { saveVolunteer } from "../store/actions/volunteerActions";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

function EditGroupModal({ open, setOpen, group }) {
    const dispatch = useDispatch();
    const [newGroup, setNewGroup] = useState({ ...group });
    const handleChange = (e) => {
        let value = e.target.value;
        setNewGroup((prev) => ({ ...prev, [e.target.name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("..will submit:", newGroup);
        dispatch(saveGroup(newGroup));
        setNewGroup(newGroup);
        setOpen(false);
    };
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className='new_group_modal'>
                <button
                    className='new_group_close-button'
                    onClick={() => setOpen(false)}
                    type='button'
                />
                <h1 className='new_group_title'>עריכת פרטי קבוצה</h1>
                <form className='new_group_form' onSubmit={handleSubmit}>
                    <div className='new_group_block'>
                        <div className='new_group_form-titles__even'>
                            <h2 className='title'>ארגון</h2>
                            <h2 className='title' style={{ marginLeft: "36%" }}>
                                עיר
                            </h2>
                        </div>
                        <div className='new_group_form-block__between'>
                            <div className='new_group_form-block'>
                                <label htmlFor='name'>
                                    <input
                                        className='input'
                                        type='text'
                                        placeholder='שם'
                                        name='name'
                                        onChange={handleChange}
                                        defaultValue={group.name}
                                    />
                                </label>
                                <select
                                    name='type'
                                    className='input'
                                    defaultValue={group.type}
                                    onChange={handleChange}>
                                    <option id='0' value='null'>
                                        פרופיל
                                    </option>
                                    <option id='1' value='עמותה'>
                                        עמותה
                                    </option>
                                    <option id='2' value='ממשלתי'>
                                        ממשלתי
                                    </option>
                                    <option id='3' value='שלצ'>
                                        של"צ
                                    </option>
                                </select>
                            </div>

                            <div
                                className='new_group_form-block'
                                style={{ marginLeft: "18%" }}>
                                <label htmlFor='city'>
                                    <input
                                        className='input'
                                        placeholder='עיר'
                                        type='text'
                                        name='city'
                                        onChange={handleChange}
                                        defaultValue={group.city}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='new_group_block'>
                        <h2 className='title'>איש קשר</h2>
                        <div className='new_group_form-block'>
                            <label htmlFor='contactName'>
                                <input
                                    type='text'
                                    className='input'
                                    name='contactName'
                                    placeholder='שם'
                                    onChange={handleChange}
                                    defaultValue={group.contactName}
                                />
                            </label>
                            <label htmlFor='contactRole'>
                                <input
                                    type='text'
                                    className='input'
                                    name='contactRole'
                                    placeholder='תפקיד'
                                    onChange={handleChange}
                                    defaultValue={group.contactRole}
                                />
                            </label>
                            <label htmlFor='contactCellphone'>
                                <input
                                    type='tel'
                                    className='input'
                                    name='contactCellphone'
                                    placeholder='טלפון'
                                    onChange={handleChange}
                                    defaultValue={group.contactCellphone}
                                />
                            </label>
                            <label htmlFor='contactEmail'>
                                <input
                                    type='email'
                                    className='input'
                                    name='contactEmail'
                                    placeholder='מייל'
                                    onChange={handleChange}
                                    defaultValue={group.contactEmail}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='new_group_block'>
                        <div className='new_group_form-titles__even'>
                            <h2 className='title'>מתנדבים</h2>
                            <h2 className='title' style={{ marginLeft: "36%" }}>
                                העדפות
                            </h2>
                        </div>

                        <div className='new_group_form-block__between'>
                            <div className='new_group_form-block'>
                                <label htmlFor='volunteersCount'>
                                    <input
                                        className='input'
                                        placeholder='מספר מתנדבים'
                                        type='text'
                                        name='volunteersCount'
                                        onChange={handleChange}
                                        defaultValue={group.volunteersCount}
                                    />
                                </label>
                            </div>

                            <div className='new_group_form-block'>
                                <label htmlFor='association'>
                                    <input
                                        className='input'
                                        placeholder='העדפת מסגרת 1'
                                        type='text'
                                        name='association'
                                    />
                                </label>
                                <label htmlFor='association-one'>
                                    <input
                                        className='input'
                                        placeholder='העדפת מסגרת 2'
                                        type='text'
                                        name='association-one'
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='new_group_block'>
                        <h2 className='title'>מסגרת</h2>
                        <div className='new_group_form-block'>
                            <label htmlFor='placement'>
                                <input
                                    className='input'
                                    placeholder='שיבוץ'
                                    type='text'
                                    name='placement'
                                />
                            </label>
                            <label htmlFor='placementManager'>
                                <input
                                    className='input'
                                    placeholder='מנהל מסגרת'
                                    type='text'
                                    name='placementManager'
                                />
                            </label>
                        </div>
                    </div>
                    <div className='new_group_block'>
                        <h2 className='title'>אחר</h2>
                        <div className='new_group_form-block'>
                            <label htmlFor='comments'>
                                <textarea
                                    className='input'
                                    placeholder='הערות נוספות'
                                    type='text'
                                    name='comments'
                                />
                            </label>
                        </div>
                    </div>
                    <Button
                        variant='contained'
                        type='submit'
                        className='new_group_modal_btn'>
                        שמירה
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default EditGroupModal;
