import Footer from "../components/Footer";

const mockVolunteers = [
    {
        "id": "123451",
        "groupName": "קדימה נווה שאנן",
        "firstName": "יוליה",
        "lastName": "צמח",
        "taz": "308786284",
        "birthdate": "16.08.89",
        "gender": "f",
        "policeCertification": "TRUE",
        "otherDocuments": "TRUE",
        "cellphone": "547371761",
        "email": "yulia1608@gmail.com",
        "address": "הקונגרס 31",
        "city": "תל אביב",
        "volunteerType": "חונכות אישית",
        "yearJoined": "שניה ",
        "availableWeekdays": "ב'"
    },
    {
        "id": "123452",
        "groupName": "מסעדת ת\"א",
        "firstName": "גלי ",
        "lastName": "כהן",
        "taz": "308786281",
        "birthdate": "23.11.99",
        "gender": "f",
        "policeCertification": "TRUE",
        "otherDocuments": "FALSE",
        "cellphone": "547371762",
        "email": "אין",
        "address": "יד אליהו",
        "city": "תל אביב",
        "volunteerType": "הגשת מזון",
        "scholarship": "אימפקט",
        "yearJoined": "ראשונה",
        "availableWeekdays": "טרם נקבע יום קבוע"
    },
    {
        "id": "123453",
        "groupName": "קדימה צפת",
        "firstName": "חמי",
        "lastName": "צמח",
        "taz": "308786283",
        "birthdate": "17.11.75",
        "gender": "m",
        "policeCertification": "FALSE",
        "otherDocuments": "TRUE",
        "cellphone": "547371763",
        "email": "chemi@gmail.com",
        "city": "צפת",
        "volunteerType": "שעת למידה",
        "points": "בר אילן",
        "yearJoined": "ראשונה",
        "availableWeekdays": "ג'"
    },
    {
        "id": "123454",
        "groupName": "מסעדת עכו",
        "firstName": "אוקסנה",
        "lastName": "צמח",
        "taz": "308776285",
        "birthdate": "17.10.80",
        "gender": "f",
        "policeCertification": "TRUE",
        "otherDocuments": "TRUE",
        "cellphone": "547371764",
        "email": "oksana@gmail.com",
        "address": "צ'לנוב 18",
        "city": "תל אביב",
        "volunteerType": "הגשת מזון",
        "points": "המכללה למנהל",
        "availableWeekdays": "ד'"
    },
    {
        "id": "123455",
        "groupName": "אסיף העיר",
        "firstName": "מקארה",
        "lastName": "צמח",
        "taz": "308786289",
        "birthdate": "25.7.95",
        "gender": "m",
        "policeCertification": "FALSE",
        "otherDocuments": "TRUE",
        "cellphone": "547371769",
        "email": "makere@gmail.com",
        "address": "הצ'לנוב 31",
        "city": "תל אביב",
        "volunteerType": "איסוף מזון",
        "scholarship": "שח\"ק",
        "yearJoined": "ראשונה",
        "availableWeekdays": "ד'"
    },
    {
        "id": "123456",
        "groupName": "קדימה ערד",
        "firstName": "שי",
        "lastName": "צמח",
        "taz": "308786287",
        "birthdate": "23.3.2000",
        "gender": "m",
        "policeCertification": "TRUE",
        "otherDocuments": "TRUE",
        "cellphone": "547371760",
        "email": "shay@gmail.com",
        "address": "הלח\"י 10",
        "city": "ערד",
        "volunteerType": "יום פעילות מלא",
        "scholarship": "מכינת ישראל",
        "yearJoined": "ראשונה",
        "availableWeekdays": "יומיים קבועים"
    },
    {
        "id": "123457",
        "groupName": "קדימה יפו",
        "firstName": "תמר",
        "lastName": "צמח",
        "taz": "308786288",
        "birthdate": "8.2.2001",
        "gender": "f",
        "policeCertification": "FALSE",
        "otherDocuments": "TRUE",
        "cellphone": "547371766",
        "email": "tamar@gmail.com",
        "city": "תל אביב",
        "volunteerType": "מועדון למידה",
        "scholarship": "דיור - אקדמית",
        "yearJoined": "שניה ",
        "availableWeekdays": "א'"
    },
    {
        "id": "123458",
        "groupName": "קדימה אופקים",
        "firstName": "מיכל",
        "lastName": "צמח",
        "taz": "308788287",
        "birthdate": "23.5.98",
        "gender": "f",
        "policeCertification": "FALSE",
        "otherDocuments": "TRUE",
        "cellphone": "547371776",
        "email": "michal@gmail.com",
        "address": "בן צבי 10",
        "city": "אופקים",
        "volunteerType": "יום פעילות מלא",
        "scholarship": "דיור - אקדמית",
        "yearJoined": "רביעית ומעלה",
        "availableWeekdays": "יומיים קבועים"
    }
]

const Home = () => {
    return (<>
        <section className="home page">
        <section className="home-header">
            <h1>טבלת מתנדבים</h1>
            <section className="actions">
                <span className="search">search</span>
                <span className="header-btns">
                    <button>export</button>
                    <button>add</button>
                </span>
            </section>
        </section>

        <section className="home-body">
            <div className="table-header">
                <span>checkbox</span>
                <span>סטטוס</span>
                <span>שם פרטי</span>
                <span>שם משפחה</span>
                <span>תעודת זהות</span>
                <span>מסגרת התנדבות</span>
                <span>מסגרת מפנה</span>
                <span>דיווח שעות</span>
            </div>

            {mockVolunteers.map(volunteer => 
                <div key={volunteer.id} className="table-row">
                    <span>check</span>
                    <span>stat</span>
                    <span>{volunteer.firstName}</span>
                    <span>{volunteer.lastName}</span>
                    <span>{ volunteer.taz}</span>
                    <span>מסעדת לשובע ת"א</span>
                    <span>מלגה, אימפקט</span>
                    <span>13/45</span>
                </div>
                )}
                <div className="big-div"></div>
            </section>
        </section>
        {/* <Footer /> */}
    </>)
};

export default Home;