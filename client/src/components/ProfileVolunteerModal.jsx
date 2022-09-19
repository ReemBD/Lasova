import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { saveVolunteer } from '../store/actions/volunteerActions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button } from '@mui/material';
import { ReactComponent as Table } from '../assets/imgs/icons/profile/table.svg';
import { ReactComponent as Notify } from '../assets/imgs/icons/profile/notify.svg';
import { ReactComponent as Folder } from '../assets/imgs/icons/profile/folder.svg';
import { ReactComponent as NewLead } from '../assets/imgs/icons/status/new-lead.svg';
import { ReactComponent as Standby } from '../assets/imgs/icons/status/standby.svg';
import { ReactComponent as Active } from '../assets/imgs/icons/status/active.svg';
import { ReactComponent as Inactive } from '../assets/imgs/icons/status/inactive.svg';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';

const ProfileVolunteerModal = ({ volunteer, open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const [isOption2, setIsOption2] = useState(false);
  const [isOption3, setIsOption3] = useState(false);
  const [editVolunteer, setVolunteer] = useState({
    ...volunteer
  });

  const handleChange = (e) => {
    setVolunteer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'volunteeringProgram') {
      switch (e.target.value) {
        case 'עצמאי':
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
  function passedVolunteerSession(date) {
    return new Date(date).valueOf() < new Date().valueOf();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveVolunteer(editVolunteer));
    setVolunteer(editVolunteer);
    setOpen(false);
  };

  function setStatusImage(className) {
    if (passedVolunteerSession(editVolunteer.endDate)) {
      editVolunteer.status = 'inactive';
    } else {
      editVolunteer.status = 'active';
    }
    if (editVolunteer.volunteerType === 'בחר מסגרת') {
      editVolunteer.status = 'standby';
    }
    // eslint-disable-next-line default-case
    switch (editVolunteer.status) {
      case 'new': //Need to clarify what new is...
        return <NewLead className={className} />;
      case 'active':
        return <Active className={className} />;
      case 'standby':
      case '':
        return <Standby className={className} />;
      case 'inactive':
        return <Inactive className={className} />;
    }
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className="profile_modal">
        <button className="profile_close-button" onClick={() => setOpen(false)} type="button" />
        <form onSubmit={handleSubmit}>
          <div className="profile_title">
            <h1 className="title">פרופיל מתנדב</h1>
          </div>
          <div className="profile_modal_content">
            <div className="profile_modal_content_top">
              <div className="profile_pic">
                <span className="profile_pic_img">{setStatusImage('profile_pic_status')}</span>
              </div>
              <div className="profile_details">
                <div className="profile_details_packages">
                  <div className="package">
                    <label htmlFor="firstName" className="profile_details_title">
                      שם פרטי:
                    </label>
                    <input
                      className="profile_details_content"
                      onChange={handleChange}
                      name="firstName"
                      type="text"
                      defaultValue={editVolunteer.firstName}
                    />
                    <label htmlFor="lastName" className="profile_details_title">
                      שם משפחה:
                    </label>
                    <input
                      type="text"
                      className="profile_details_content"
                      onChange={handleChange}
                      name="lastName"
                      defaultValue={editVolunteer.lastName}
                    />

                    <br />
                    <label className="profile_details_title">מייל: </label>
                    <input className="profile_details_content" defaultValue={editVolunteer.email} />
                  </div>
                  <div className="package">
                    <label htmlFor="cellphone" className="profile_details_title">
                      טלפון:{' '}
                    </label>
                    <input
                      onChange={handleChange}
                      name="cellphone"
                      className="profile_details_content"
                      defaultValue={editVolunteer.cellphone}
                    />
                    <br />
                    <label htmlFor="taz" className="profile_details_title">
                      ת.ז:
                    </label>
                    <input
                      onChange={handleChange}
                      className="profile_details_content"
                      defaultValue={editVolunteer.taz}
                      name="taz"
                    />
                  </div>
                  <div className="package">
                    <h4 className="profile_details_title">עיר מגורים: </h4>
                    <input className="profile_details_content" defaultValue={editVolunteer.city} />
                    <br />
                    <h4 className="profile_details_title">לשון פנייה: </h4>
                    <p className="profile_details_content">{editVolunteer.gender}</p>
                  </div>
                  {/* <h4 className="profile_details_title">תאריך לידה: </h4>
                <p className="profile_details_content">{volunteer.birth}</p> */}
                </div>
              </div>
            </div>
            <div className="profile_modal_content_bottom">
              <div className="profile_modal_content_right">
                <span className="volunteering_details">
                  {user.userType === 2 && (
                    <>
                      <label className="profile_modal_label">בחר מסגרת התנדבות</label>
                      <select
                        name="volunteerType"
                        className="profile_modal_input"
                        onChange={handleChange}
                        value={editVolunteer.volunteerType}
                      >
                        <option value="בחר מסגרת">בחר מסגרת התנדבות</option>
                        <option value="מסעדת לשובע תא">מסעדת לשובע ת"א</option>
                      </select>
                    </>
                  )}
                  <label className="profile_modal_label" htmlFor="volunteeringProgram">
                    בחר מסגרת מפנה
                  </label>
                  <select
                    name="volunteeringProgram"
                    className="profile_modal_input"
                    onChange={handleChange}
                    value={editVolunteer.volunteeringProgram}
                  >
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
                      <div className="selection_group" onChange={handleChange}>
                        <span className="selection_group_btns">
                          <input type="checkbox" value="נקז" name="student" />
                          <label htmlFor="nakaz">נק"ז</label>
                        </span>
                        <span className="selection_group_btns">
                          <input type="checkbox" value="מלגה" name="student" />
                          <label htmlFor="milga">מלגה</label>
                        </span>
                      </div>
                      <label className="profile_modal_label">שם המלגה</label>
                      <input
                        className="profile_modal_input"
                        type="text"
                        name="milgaName"
                        required
                        onChange={handleChange}
                      />
                    </>
                  )}
                  {isOption3 && (
                    <>
                      <label className="profile_modal_label">שם קצינת מבחן</label>
                      <input
                        className="profile_modal_input"
                        type="text"
                        name="kzinaName"
                        required
                        onChange={handleChange}
                      />
                      <label className="profile_modal_label">טלפון קצינת מבחן</label>
                      <input
                        className="profile_modal_input"
                        type="text"
                        name="kzinaPhone"
                        required
                        onChange={handleChange}
                      />
                    </>
                  )}
                </span>
              </div>
              <div className="profile_modal_content_center">
                {/* <label className="profile_modal_label">לשון פניה</label>
            <div className="selection_group" onChange={handleChange}>
              <span className="selection_group_btns">
                <input type="radio" value="male" name="gender" />
                <label htmlFor="male">זכר</label>
              </span>
              <span className="selection_group_btns">
                <input type="radio" value="female" name="gender" />
                <label htmlFor="female">נקבה</label>
              </span>
              <span className="selection_group_btns">
                <input type="radio" value="other" name="gender" />
                <label htmlFor="other">אחר</label>
              </span>
            </div> */}
                <span className="attached_files">
                  <label className="profile_modal_label">מסמכים מצורפים</label>
                  <button onClick={() => window.open('https://drive.google.com/drive/u/0/?ogsrc=32&tab=mo')}>
                    <Folder />
                  </button>
                </span>
                <span className="selection_group_package">
                  <label className="profile_modal_label">רישיון נהיגה</label>
                  <div className="selection_group" onChange={handleChange}>
                    <span className="selection_group_btns">
                      <input type="radio" value="yes" name="driving_license" />
                      <label htmlFor="yes">יש</label>
                    </span>
                    <span className="selection_group_btns">
                      <input type="radio" value="no" name="driving_license" />
                      <label htmlFor="no">אין</label>
                    </span>
                  </div>
                </span>
                <span className="selection_group_package">
                  <label className="profile_modal_label">זמין להתנדבות בחירום</label>
                  <div className="selection_group" onChange={handleChange}>
                    <span className="selection_group_btns">
                      <input type="radio" value="yes" name="emergency" />
                      <label htmlFor="yes">כן</label>
                    </span>
                    <span className="selection_group_btns">
                      <input type="radio" value="no" name="emergency" />
                      <label htmlFor="no">לא</label>
                    </span>
                  </div>
                </span>
                {/* <div className="attached_files_types">
                <span className="attached_files">
                  <label className="profile_modal_label">אישור משטרה</label>
                  <div className="attached_files_btns">
                    <button>
                      <Pdf />
                    </button>
                    <button>
                      <Download />
                    </button>
                  </div>
                </span>
                <span className="attached_files">
                  <label className="profile_modal_label">הסכם סודיות</label>
                  <div className="attached_files_btns">
                    <button>
                      <Pdf />
                    </button>
                    <button>
                      <Download />
                    </button>
                  </div>
                </span>
                <span className="attached_files">
                  <label className="profile_modal_label">חוזה התנדבות</label>
                  <div className="attached_files_btns">
                    <button>
                      <Pdf />
                    </button>
                    <button>
                      <Download />
                    </button>
                  </div>
                </span>
              </div> */}
              </div>
              <div className="profile_modal_content_left">
                <span className="volunteering_hours">
                  <label className="profile_modal_label">שעות התנדבות</label>
                  <button>
                    <Table />
                  </button>
                  <button>
                    <Notify />
                  </button>
                </span>
                <span className="reported_hours">
                  <div className="reported_hours_sum">
                    <label htmlFor="reportedHours" className="profile_modal_label">
                      שעות מדווחות
                    </label>
                    <input
                      className="profile_modal_mini_input"
                      type="text"
                      name="reportedHours"
                      onChange={handleChange}
                      defaultValue={editVolunteer.reportedHours}
                    />
                  </div>
                  {/* <div className="reported_hours_sum">
                  <label className="profile_modal_label">מאושר</label>
                  <input
                    className="profile_modal_mini_input"
                    type="text"
                    name="volunteer_confirm_hours"
                    required
                    onChange={handleChange}
                  />
                </div> */}
                </span>
                <span className="dates">
                  <div className="date">
                    <label htmlFor="startDate" className="profile_modal_label">
                      תחילת התנדבות
                    </label>
                    <DatePickerComponent
                      format="dd/MM/yyyy"
                      placeholder="הכנס תאריך"
                      onChange={handleChange}
                      className="datepicker"
                      name="startDate"
                    />
                    <p>{`${moment(editVolunteer.startDate).format('DD/MM/YY')}`}</p>
                  </div>
                  <div className="date">
                    <label htmlFor="endDate" className="profile_modal_label">
                      סיום התנדבות
                    </label>
                    <DatePickerComponent
                      placeholder="הכנס תאריך"
                      format="dd/MM/yyyy"
                      className="datepicker"
                      onChange={handleChange}
                      name="endDate"
                    />
                    <p>{`${moment(editVolunteer.endDate).format('DD/MM/YY')}`}</p>
                  </div>
                </span>
                <label className="profile_modal_label">סיכום שיחה אחרונה</label>
                <TextareaAutosize type="text" name="summary" className="summary_text" onChange={handleChange} />
              </div>
            </div>
            <Button className="profile_modal_submit" type="submit" variant="contained">
              שמור
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileVolunteerModal;
