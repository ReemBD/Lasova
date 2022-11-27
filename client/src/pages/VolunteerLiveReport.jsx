import React from 'react';
import {useState, useEffect } from 'react';
import Logo from '../assets/imgs/logo-mobile.png';
import BasePage from './BasePage';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { loadVolunteerById,loadVolunteers,saveVolunteer } from '../store/actions/volunteerActions';
import Loader from '../components/Loader';



export default function VolunteerLiveReport() {
  const [isStarted,setIsStarted] = useState(false)
  const [btn,setBtn]=useState({color:"#92CE7F",text:"התחל"})

  const [startTime,setStartTime]=useState(0)
  const [timeToShow,setTimeToShow]=useState(new Date().toString().split(' ')[4])
  const [endTime,setEndTime]=useState(null)

  const { isAuthenticated, user } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
 
  useEffect(() => {
    if (!volunteer) {
       //dispatch(loadVolunteerById(user._id));
       dispatch(loadVolunteers(user.email)); // working but not getting the correct volunteer, maybe better to use ref in the backend to get the same id from the user
       //dispatch(loadVolunteerById("62a5c9a42071b52f89b35c82")); //for example only-"Reemos"
    }
  }, []);
    
  const { volunteer } = useSelector((state) => state.volunteerReducer);

  const [editVolunteer,setEditVolunteer]= useState({
    ...volunteer
  });
  //console.log("editVolunteer: ",editVolunteer)
  let reportedHours={date:"",start:"",end:"",verified:false}
  let hours=[]
  //console.log(hours)
  
  const toggleBtn=()=> {
    setIsStarted(!isStarted)
  }

  useEffect(()=>{
    console.log("volunteer: ", volunteer)
    if (volunteer) {
    hours=[...JSON.parse(JSON.stringify(volunteer.hours))] //same as spread, need to be changed in the data
  }},[volunteer])

  useEffect(()=>{
    if (isStarted) {
      setStartTime(Date.now())
    }
    else if (!isStarted && startTime>0) {
      setEndTime(Date.now())
    }
    setBtn(isStarted ? {color:"#C87575",text:"סיום"} : {color:"#92CE7F",text:"התחל"})
  },[isStarted])

  useEffect(()=>{ 
    let intervalId = null;
    if (isStarted) {
      intervalId = setInterval(()=> {
        setTimeToShow(new Date(Date.now()-startTime-7200000).toString().split(' ')[4])
      },1000)
    }
    return () => {
      clearInterval(intervalId);
    }
  },[isStarted,startTime])

  useEffect(()=>{
    if (endTime>0) {
    setTimeToShow(new Date(endTime-startTime).toString().split(' ')[4])
    reportedHours={date:startTime,start:startTime,end:endTime,verified:false}
    hours=[reportedHours,...volunteer.hours]
    setEditVolunteer({...volunteer,hours})
  }
  },[endTime])

  useEffect(()=>{
    if (volunteer) {
    console.log(editVolunteer)
    dispatch(saveVolunteer(editVolunteer))
    //console.log(volunteer)
    }
  },[editVolunteer])

  return (
    <>
    {volunteer && (
    <div className="volunteer-report">
      <Footer />
       <div className="logo-img">
        <img src={Logo} alt="laSova" className="logo-mobile" />
        </div>
        {!endTime && <h2 className="header">היי {user.firstname}, חיכינו רק לך!</h2>}
        {!endTime && (<div className="report-form">
          <p className='report-program'>{volunteer.groupName}</p>
          <button className='report-btn' style={{backgroundColor: btn.color}} onClick={toggleBtn}>{btn.text}</button>
          {(!isStarted && !endTime) && <p className='report-text'>שכחת לדווח?</p>}
          {(isStarted) && <p className='report-text'>{timeToShow}</p>}
          {(!isStarted && endTime) && <p className='report-text'>{timeToShow}</p>}
        </div>)}
        {endTime && <h2 className="header">אז מה היה לנו?</h2>}
        {endTime && (<div className="report-form">
          <p className='report-program'>{volunteer.groupName}</p>
          <p className='date-text'>תאריך הפעילות</p>
          <p>{new Date(startTime).getDate()+"."+(+(new Date(startTime).getMonth())+1)+"."+new Date(startTime).getFullYear()}</p>
          <div className='hours'>
          <p className='start-hour-text'>שעת התחלה</p>
          <p>{new Date(startTime).toString().split(" ")[4]}</p>
          <p className='end-hour-text'>שעת סיום</p>
          <p>{new Date(endTime).toString().split(" ")[4]}</p>
          </div>
          <button className='confirm-btn'>אישור</button>
        </div>)}

        <div className="volunteer-user">
        <Header />
        </div>
    </div>)}
    </>
  )
}
