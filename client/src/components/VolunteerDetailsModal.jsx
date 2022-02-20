import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

//  "group_name": "קדימה נווה שאנן",
//     "first_name": "יוליה",
//     "last_name": "צמח",
//     "taz": "308786284",
//     "birth": "16.08.89",
//     "gender": "f",
//     "police_certification": "TRUE",
//     "other_documents": "TRUE",
//     "cellphone": "547371761",
//     "email": "yulia1608@gmail.com",
//     "home_adress": "הקונגרס 31",
//     "city": "תל אביב",
//     "volunteer_type": "חונכות אישית",
//     "year_joined": "שניה ",
//     "weekday_available": "ב'"

const NewVolunteerModal = ({ volunteer, isOpen, setOpen }) => {
  const [editVolunteer, setVolunteer] = useState(volunteer);
  const [isEdit, setIsEdit] = useState({});

  const handleChange = (e) => {
    setVolunteer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("..will submit:", editVolunteer);
  };

  return (
    <Wrapper>
      <Modal open={isOpen} onClose={() => setOpen(false)}>
        <Box>
          <h1>פרטי מתנדב/ת</h1>
          <span>
            <h4>שם מלא:</h4>
            <p className="first-name">{volunteer.firstName}</p>
            <p className="last-name"></p>
          </span>
          <Button
            variant="contained"
            type="submit"
            style={{
              margin: "1rem 0",
              padding: "0 8rem",
              fontSize: "2rem",
            }}
          >
            שמירה
          </Button>
        </Box>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .addVolunteerBtn {
    width: 14rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 1.9rem;
    background-color: #4b5563;
    color: #e5e5e5;
    font-size: 1.5rem;
    letter-spacing: 0.26rem;
    text-align: right;
    cursor: pointer;
    border: none;
  }
  .addVolunteerBtn:hover {
    opacity: 0.9;
  }
`;

export default NewVolunteerModal;
