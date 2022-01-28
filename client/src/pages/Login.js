import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <Wrapper>
      <img src="logo.svg" alt="logo" className="logo" />
      <form action="#" className="login-form">
        <label className="mail-label">מייל</label>
        <input type="text" className="mail-input" required />
        <label className="password-label">סיסמא</label>
        <input type="password" className="password-input" required />
        <button className="submit">כניסה</button>
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
