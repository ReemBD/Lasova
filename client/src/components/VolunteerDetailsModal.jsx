import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const NewVolunteerModal = ({ volunteer, open, setOpen }) => {
  const [editVolunteer, setVolunteer] = useState(volunteer);
  const [isEdit, setIsEdit] = useState({});

  console.log(volunteer);

  const handleChange = (e) => {
    setVolunteer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("..will submit:", editVolunteer);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className="profile_modal">
        <h1 className="profile_title">פרופיל מתנדב/ת</h1>
        <div className="profile_modal_content">
          <span className="personal_details">
            <h4>שם מלא: </h4>
            <p className="full_name">
              {`${volunteer.firstName} ${volunteer.lastName}`}
            </p>
            <br />
            <h4>תאריך לידה: </h4>
            <p className="birthday">{volunteer.birth}</p>
            <br />
            <h4>ת.ז: </h4>
            <p className="taz">{volunteer.taz}</p>
            <br />
            <h4>כתובת: </h4>
            <p className="adrress">{`${volunteer.homeAddress}, ${volunteer.city}`}</p>
            <br />
            <h4>טלפון: </h4>
            <p className="phone">{volunteer.cellphone}</p>
            <br />
            <h4>מייל: </h4>
            <p className="email">{volunteer.email}</p>
          </span>
        </div>
      </Box>
    </Modal>
  );
};

export default NewVolunteerModal;
