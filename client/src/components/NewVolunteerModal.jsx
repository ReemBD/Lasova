import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveVolunteer } from '../store/actions/volunteerActions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
// import { UploadVolunteerFilesButton } from './UploadButton';
const VolunteerObj = {
  taz: '',
  volunteeringProgram: null,
  firstName: '',
  lastName: '',
  cellphone: '',
  city: '',
  email: '',
  gender: '',
  summary: '',
  volunteerType: '',
  status: '',
  files: []
};

const associatedPrograms = ['מסעדת לשובע ת״א', 'הסרטן הפריך']; // Test array, needed to come from the back end

const NewVolunteerModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const [isOption2, setIsOption2] = useState(false);
  const [isOption3, setIsOption3] = useState(false);
  const [enable, setEnable] = useState(true);
  const [newVolunteer, setNewVolunteer] = useState(VolunteerObj);
  console.log({ newVolunteer });
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === 'file') {
      value = e.target.files;
      console.log('e.target.value', e.target.files);
    }
    setNewVolunteer((prev) => ({ ...prev, [e.target.name]: value }));
    if (e.target.name === 'volunteerType') {
      switch (e.target.value) {
        case 'עצמאי':
          setIsOption2(false);
          setIsOption3(false);
          break;
        case 'null':
          setIsOption2(false);
          setIsOption3(false);
          break;
        case 'סטודנט':
          setIsOption2(true);
          setIsOption3(false);
          break;
        case 'שלצ':
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
    newVolunteer['volunteeringProgram'] ||= user.associatedPrograms[0];
    setNewVolunteer(newVolunteer);

    console.log(newVolunteer);
    dispatch(saveVolunteer(newVolunteer));
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="new_vol_modal">
          <button className="new_vol_close-button" onClick={() => setOpen(false)} type="button" />
          <h1 className="new_vol_title">רישום מתנדב חדש</h1>
          <div className="new_vol_modal_content">
            <form className="new_vol_modal_form" onSubmit={handleSubmit}>
              <div className="right">
                <label htmlFor="firstName" className="new_vol_modal_label">
                  שם פרטי*
                </label>
                <input
                  className="input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  pattern=".{2,}"
                  title="אנא הזן שם פרטי"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="lastName" className="new_vol_modal_label">
                  שם משפחה*
                </label>
                <input
                  className="input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  pattern=".{2,}"
                  title="אנא הזן שם משפחה"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="taz" className="new_vol_modal_label">
                  ת.ז*
                </label>
                <input
                  className="input"
                  type="text"
                  id="taz"
                  name="taz"
                  pattern=".{9}"
                  title="אנא הזן תעודת זהות תקינה"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="cellphone" className="new_vol_modal_label">
                  טלפון*
                </label>
                <input
                  className="input"
                  type="text"
                  id="cellphone"
                  name="cellphone"
                  pattern="05?[0-9]-?[0-9]{7}"
                  title="אנא הזן מספר סלולרי תקין"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="email" className="new_vol_modal_label">
                  מייל*
                </label>
                <input
                  className="input new_vol_modal_input_mail "
                  type="email"
                  id="email"
                  name="email"
                  title="אנא הזן כתובת מייל תקינה"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="center">
                <label htmlFor="city" className="new_vol_modal_label">
                  עיר מגורים*
                </label>
                <input
                  className="input"
                  type="text"
                  id="city"
                  name="city"
                  pattern=".{2,}"
                  title="אנא הזן עיר"
                  required
                  onChange={handleChange}
                />
                <label className="new_vol_modal_label">לשון פניה</label>
                <div className="gender_group" onChange={handleChange}>
                  <span className="gender_btns">
                    <input type="radio" value="זכר" name="gender" />
                    <label htmlFor="male">זכר</label>
                  </span>
                  <span className="gender_btns">
                    <input type="radio" value="נקבה" name="gender" />
                    <label htmlFor="female">נקבה</label>
                  </span>
                  <span className="gender_btns">
                    <input type="radio" value="אחר" name="gender" />
                    <label htmlFor="other">אחר</label>
                  </span>
                </div>
                <label className="new_vol_modal_label">סיכום שיחה</label>
                <TextareaAutosize type="text" name="summary" className="summary_text" onChange={handleChange} />
              </div>
              <div className="left">
                <div>
                  <>
                    <label className="new_vol_modal_label">בחר מסגרת התנדבות</label>
                    <select name="volunteeringProgram" className="input" onChange={handleChange}>
                      {user.associatedPrograms.map((program, idx) => (
                        <option value={program} key={idx}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </>

                  <label className="new_vol_modal_label">בחר מסגרת מפנה</label>
                  <select name="volunteerType" className="input" onChange={handleChange}>
                    <option id="0" value="null">
                      בחר מסגרת מפנה
                    </option>
                    <option id="1" value="עצמאי">
                      עצמאי
                    </option>
                    <option id="2" value="סטודנט">
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
                          <input type="checkbox" value="נקז" name="student" />
                          <label htmlFor="nakaz">נק"ז</label>
                        </span>
                        <span className="student_btns">
                          <input type="checkbox" value="מלגה" name="student" />
                          <label htmlFor="milga">מלגה</label>
                        </span>
                      </div>
                      <label className="new_vol_modal_label">שם המלגה</label>
                      <input className="input" type="text" name="milgaName" required onChange={handleChange} />
                    </>
                  )}
                  {isOption3 && (
                    <>
                      <label className="new_vol_modal_label">שם קצינת מבחן</label>
                      <input className="input" type="text" name="kzinaName" required onChange={handleChange} />
                      <label className="new_vol_modal_label">טלפון קצינת מבחן</label>
                      <input className="input" type="text" name="kzinaPhone" required onChange={handleChange} />
                    </>
                  )}
                  {/* </div>
                <UploadVolunteerFilesButton onChange={handleChange} />
                <div> */}
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  className={enable ? 'new_vol_modal_btn' : 'new_vol_modal_btn disable'}
                >
                  הוסף למסגרת
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NewVolunteerModal;
