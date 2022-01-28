import styled from "styled-components";

const LogoLine = () => {
  return (
    <Wrapper>
      <div className="logo_line">
        <img src="logo.svg" alt="logo" className="logo" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  .logo_line {
    width: 100%;
    background-color: #c4c4c4;
  }
  .logo {
    width: 4rem;
    height: 4rem;
    float: left;
    padding: 1rem;
  }
`;

export default LogoLine;
