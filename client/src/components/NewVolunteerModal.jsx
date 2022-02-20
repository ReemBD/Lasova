import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVolunteer } from "../store/actions/volunteerActions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { ReactComponent as NewVolunteerBtn } from "../assets/imgs/icons/new-vol-btn.svg";

const VolunteerObj = {
  groupName: "",
  firstName: "",
  lastName: "",
  phone: "",
  city: "",
  email: "",
  gender: "",
  summary: "",
};

const NewVolunteerModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isOption2, setIsOption2] = useState(false);
  const [isOption3, setIsOption3] = useState(false);
  const [enable, setEnable] = useState(true);
  const [newVolunteer, setNewVolunteer] = useState(VolunteerObj);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setNewVolunteer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "groupName") {
      switch (e.target.value) {
        case "עצמאי":
          setIsOption2(false);
          setIsOption3(false);
          break;
        case "סטודנט":
          setIsOption2(true);
          setIsOption3(false);
          break;
        case "שלצ":
          setIsOption2(false);
          setIsOption3(true);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("..will submit:", newVolunteer);
    setNewVolunteer(newVolunteer);
    dispatch(addVolunteer(newVolunteer));
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <NewVolunteerBtn />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal">
          <h1>רישום מתנדב חדש</h1>
          <div className="modal_content">
            <form className="modal_form" onSubmit={handleSubmit}>
              <div className="right">
                <div>
                  <label className="modal_label">שם פרטי</label>
                  <input
                    className="modal_input"
                    type="text"
                    name="firstName"
                    required
                    // value={newVolunteer["firstName"]}
                    onChange={handleChange}
                  />
                  <label className="modal_label">שם משפחה</label>
                  <input
                    className="modal_input"
                    type="text"
                    name="lastName"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="modal_label">טלפון</label>
                  <input
                    className="modal_input"
                    type="tel"
                    name="phone"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="modal_label">עיר מגורים</label>
                  <input
                    className="modal_input"
                    type="text"
                    name="city"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="modal_label">מייל</label>
                  <input
                    className="modal_input modal_input_mail"
                    type="email"
                    name="email"
                    required
                    // value={newVolunteer["email"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="center">
                <label className="modal_label">לשון פניה</label>
                <div className="gender_group" onChange={handleChange}>
                  <span className="gender_btns">
                    <input type="radio" value="male" name="gender" /> 
                    <label htmlFor="male">זכר</label>
                  </span>
                  <span className="gender_btns">
                    <input type="radio" value="female" name="gender" /> 
                    <label htmlFor="female">נקבה</label>
                  </span>
                  <span className="gender_btns">
                    <input type="radio" value="other" name="gender" /> 
                    <label htmlFor="other">אחר</label>
                  </span>
                </div>
                <label className="modal_label">סיכום שיחה</label>
                <TextareaAutosize
                  type="text"
                  name="summary"
                  className="summary_text"
                  onChange={handleChange}
                />
              </div>
              <div className="left">
                <div>
                  <label className="modal_label">בחר מסגרת מפנה</label>
                  <select
                    name="groupName"
                    className="modal_input"
                    onChange={handleChange}
                  >
                    <option id="dfdfd" value="עצמאי">
                      עצמאי
                    </option>
                    <option id="dsdsd2" value="סטודנט">
                      סטודנט
                    </option>
                    <option id="3" value="שלצ">
                      של"צ
                    </option>
                  </select>
                  {isOption2 && (
                    <>
                      <div className="student_group" onChange={handleChange}>
                        <span className="student_btns">
                          <input type="radio" value="נקז" name="student" /> 
                          <label htmlFor="nakaz">נק"ז</label>
                        </span>
                        <span className="student_btns">
                          <input type="radio" value="מלגה" name="student" /> 
                          <label htmlFor="milga">מלגה</label>
                        </span>
                      </div>
                      <label className="modal_label">שם המלגה</label>
                      <input
                        className="modal_input"
                        type="text"
                        name="milgaName"
                        required
                        onChange={handleChange}
                      />
                    </>
                  )}
                  {isOption3 && (
                    <>
                      <label className="modal_label">שם קצינת מבחן</label>
                      <input
                        className="modal_input"
                        type="text"
                        name="kzinaName"
                        required
                        onChange={handleChange}
                      />
                      <label className="modal_label">טלפון קצינת מבחן</label>
                      <input
                        className="modal_input"
                        type="text"
                        name="kzinaPhone"
                        required
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>
                <div>
                  <Button
                    variant="contained"
                    type="submit"
                    className={enable ? "modal_btn" : "modal_btn disable"}
                  >
                    הוסף למסגרת
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NewVolunteerModal;
