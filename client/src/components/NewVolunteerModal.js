import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const NewVolunteerModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState(0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: 650,
    bgcolor: "background.paper",
    border: "3px solid #000",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    h1: {
      color: "black",
    },
  };

  const labelStyle = {
    fontSize: "2rem",
    display: "block",
  };

  const inputStyle = {
    width: "20rem",
    height: "3rem",
    margin: "1rem 0",
    backgroundColor: "#ebebeb",
    border: "none",
    paddingRight: "0.5rem",
  };

  const mailInputStyle = {
    width: "20rem",
    height: "3rem",
    margin: "1rem 0",
    backgroundColor: "#ebebeb",
    border: "none",
    paddingLeft: "0.5rem",
    direction: "ltr",
  };

  return (
    <Wrapper>
      <button onClick={handleOpen} className="addVolunteerBtn">
        מתנדב חדש +
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1>הוספת מתנדב חדש</h1>
          <div
            style={{
              alignSelf: "start",
              margin: "3rem",
              marginRight: "6rem",
              display: "flex",
              flexDirection: "column",
              width: "50rem",
            }}
          >
            <label style={labelStyle}>בחר מסגרת מפנה</label>
            <select
              style={inputStyle}
              onChange={(e) => {
                console.log(e.target.value);
                setSelected(e.target.value);
              }}
            >
              <option value="1">עצמאי</option>
              <option value="2">סטודנט</option>
              <option value="3">של"צ</option>
              <option value="4">קבוצות ואירגונים</option>
            </select>
            <form
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="right_side">
                <div>
                  <label style={labelStyle}>שם פרטי</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="firstName"
                    required
                  />
                  <label style={labelStyle}>שם משפחה</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="lastName"
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>טלפון</label>
                  <input style={inputStyle} type="tel" name="tel" required />
                </div>
                <div>
                  <label style={labelStyle}>עיר מגורים</label>
                  <input style={inputStyle} type="text" name="city" />
                </div>
              </div>
              <div className="left">
                <div>
                  <label style={labelStyle}>מייל</label>
                  <input style={mailInputStyle} type="email" name="email" />
                </div>
                <div>
                  <label style={labelStyle}>סיכום שיחה</label>
                  <TextareaAutosize
                    type="text"
                    name="summary"
                    style={{
                      minWidth: 200,
                      maxWidth: 200,
                      minHeight: 125,
                      maxHeight: 225,
                      padding: "0.7rem",
                      margin: "1rem 0",
                      backgroundColor: "#ebebeb",
                      border: "none",
                    }}
                  />
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    margin: "1rem 0",
                    padding: "0 8rem",
                    fontSize: "2rem",
                  }}
                >
                  הוסף
                </Button>
              </div>
            </form>
          </div>
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
