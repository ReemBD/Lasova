import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";

import {
    login,
} from "../store/actions/auth";
import { Navigate, useNavigate } from "react-router-dom";

import styled from "styled-components";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
        (state) => state.groupReducer
    );
  let navigate = useNavigate();
  
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: ''
  // })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const {email, password} = formData;

  // const handelChange = (e) => {
  //   e.preventDefault()
  //   console.log("🚀 ~ file: Login.jsx ~ line 15 ~ handelChange ~ e", e)
  //   setFormData({...formData, [e.target.name]: e.target.value})
  // }

  const handelSubmit = async e => {
    e.preventDefault();
    if (email === "" || password === "") {
      // setError("Fields are required");
      return;
    }
    dispatch(login(email, password))
    if (isAuthenticated) {
      // return <Navigate to="/" replace />;
      navigate('/')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      // return <Navigate to="/" replace />;
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <Wrapper> 
      <img src="logo.svg" alt="logo" className="logo" />
      <form className="login-form">
      {/* <form action="#" className="login-form"> */}
        <label className="mail-label">מייל</label>
        <input type="text" className="mail-input" required name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <label className="password-label">סיסמא</label>
        <input type="password" className="password-input" required  name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        {/* <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/> */}
        <button className="submit" type="submit" onClick={handelSubmit}>כניסה</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  direction: ltr;
  padding: 3rem;
  .logo {
    width: 16rem;
    height: 16rem;
  }
  .login-form {
    display: flex;
    flex-direction: column;
  }
  .mail-label {
    margin-top: 3rem;
    font-size: 2.5rem;
    text-align: right;
    color: #000;
  }
  .mail-input {
    width: 32rem;
    height: 6rem;
    background-color: #c4c4c4;
    font-size: 3rem;
    border: none;
    padding-left: 1rem;
  }
  .password-label {
    margin-top: 3rem;
    font-size: 2.5rem;
    text-align: right;
    color: #000;
  }
  .password-input {
    width: 32rem;
    height: 6rem;
    background-color: #c4c4c4;
    font-size: 3rem;
    border: none;
    padding-left: 1rem;
  }
  .submit {
    width: 10rem;
    height: 5rem;
    margin-top: 5rem;
    font-size: 2.5rem;
    color: #000;
    align-self: center;
    background-color: #c4c4c4;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }
`;

export default Login;
