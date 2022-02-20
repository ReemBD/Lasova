import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { ReactComponent as SearchIcon } from "../assets/imgs/icons/search-icon.svg";
import { ReactComponent as ExportBtn } from "../assets/imgs/icons/export-btn.svg";
import NewVolunteerModal from "../components/NewVolunteerModal";
import VolunteersTable from "../components/VolunteersTable";
import { searchVolunteers } from "../store/actions/volunteerActions";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <>
      <section className="home page">
        <section className="home-header">
          <h1>טבלת מתנדבים</h1>
          <section className="actions">
            <span className="search">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                className="serach_input"
                placeholder="חיפוש"
                onChange={(e) => {
                  console.log(e.target.value);
                  dispatch(searchVolunteers(e.target.value));
                }}
              />
            </span>
            <span className="header-btns">
              <button>
                <ExportBtn />
              </button>
              <span>
                <NewVolunteerModal />
              </span>
            </span>
          </section>
        </section>
        <section className="home-body">
          <VolunteersTable />
        </section>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
