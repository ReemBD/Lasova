import React from "react";
import styled from "styled-components";
import VolunteersTable from "../components/VolunteersTable";
import HeaderVT from "../components/HeaderVT";
import SidebarVT from "../components/SidebarVT";
import LogoLine from "../components/LogoLine";

const Home = () => {
  return (
    <Wrapper>
      <LogoLine />
      <div className="content">
        <div className="right_content">
          <SidebarVT />
        </div>
        <div className="left_content">
          <HeaderVT />
          <VolunteersTable />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .content {
    display: flex;
  }
  .right_content {
    flex: 1;
  }
  .left_content {
    flex: 1 1 80%;
  }
`;

export default Home;
