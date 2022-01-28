import styled from "styled-components";
import LogoLine from "../components/LogoLine";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { VolunteersTable } from "../components/VolunteersTable";

const Home = () => {
  return (
    <Wrapper>
      <LogoLine />
      <main className="main">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <section className="content">
          <Header />
          <VolunteersTable />
        </section>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  main {
    display: flex;
  }
  aside {
    flex: 1;
  }
  section {
    flex: 1 1 80%;
  }
`;

export default Home;
