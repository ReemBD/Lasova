import React from "react";
import styled from "styled-components";

const SidebarVT = () => {
  return (
    <Wrapper>
      <div className="sidebar">
        <div className="user">
          <img src="" alt="user img" className="user_img" />
          <svg></svg>
        </div>
        <p className="hello_text">מנהלת הארגון, שלום לך</p>
        <ul className="list">
          <a className="list-link" href="#">
            <li className="list-item">מתנדבים</li>
          </a>
          <a className="list-link" href="#">
            <li className="list-item">לידים</li>{" "}
          </a>
          <a className="list-link" href="#">
            <li className="list-item">מסגרות התנדבות</li>{" "}
          </a>
          <a className="list-link" href="#">
            <li className="list-item">מנהלי מסגרות</li>{" "}
          </a>
          <a className="list-link" href="#">
            <li className="list-item">קבוצות ואירגונים</li>{" "}
          </a>
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  .sidebar {
    width: 23.9rem;
    height: 89.5rem;
    background-color: #e5e5e5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .user {
  }
  .user_img {
    width: 9.7rem;
    height: 9.7rem;
    background-color: #c4c4c4;
    border-radius: 100%;
    margin-right: 3rem;
    overflow: hidden;
  }
  .hello_text {
    position: relative;
    top: -23rem;
    width: 10rem;
    font-size: 1.3rem;
    letter-spacing: normal;
    line-height: normal;
    color: #000;
    margin-right: 3rem;
    font-weight: 600;
  }
  .list {
    position: relative;
    top: -30rem;
    margin-right: 3rem;
    font-size: 1.8rem;
    font-weight: 600;
    list-style: none;
    line-height: 5rem;
  }
  .list-link {
    text-decoration: none;
    color: #000;
  }
  .list-item {
  }
`;

export default SidebarVT;
