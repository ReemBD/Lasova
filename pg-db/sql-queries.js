const { Client } = require("pg");
var validator = require("validator");
const TAZ_PATTERN = new RegExp("^(d{8,9})$");
const MOBILE_PATTERN = new RegExp("^(d{10})$");

const client = new Client({
  host: "127.0.0.1",
  user: "lasova-client",
  database: "lasova_trial",
  password: "1234",
  port: 5432,
});

// this is a very general query executor I found online; its pretty good for now, but wont work when we need to debug things properly.
const execute = async (query) => {
  try {
    await client.connect(); // gets connection if clause
    await client.query(query); // sends queries
    console.log("hopa");
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end(); // closes connection
  }
};

const createVolunteerTable = `
    CREATE TABLE IF NOT EXISTS "volunteers" (
    "id" SERIAL,
    "taz" VARCHAR(10) NOT NULL UNIQUE,
    "first_name" VARCHAR(15),
    "last_name" VARCHAR(25),
    "police_certification" BOOL DEFAULT FALSE,
    "other_certications" BOOL DEFAULT FALSE,
    "cellphone" VARCHAR(11) NOT NULL UNIQUE,
    "email" VARCHAR(40) NOT NULL UNIQUE,
    "password" VARCHAR(25) NOT NULL,
    "home_adress" VARCHAR(100),
    "volunteer_type" INT DEFAULT 0,
    "year_joined" INT DEFAULT 2022,
    "gender" int DEFAULT 0,
    PRIMARY KEY("id")
    );`;

// this attributes are not matched with Yulia; so currently wont create any queries related to this table.
const createPotentialTable = `
    CREATE TABLE IF NOT EXISTS "potentials" (
    "id" SERIAL,
    "first_name" VARCHAR(15),
    "last_name" VARCHAR(25),
    "cellphone" VARCHAR(11) NOT NULL UNIQUE,
    "email" VARCHAR(40) NOT NULL UNIQUE,
    "password" VARCHAR(25) NOT NULL,
    "home_adress" VARCHAR(100),
    "gender" int DEFAULT 0,
    PRIMARY KEY("id")
    );`;

const paramQuery = {
  text: "INSERT INTO users(name, email) VALUES($1, $2)",
  values: ["brianc", "brian.m.carlson@gmail.com"],
};

execute(createVolunteerTable).then((result) => {
  if (result) {
    console.log("Table created");
  }
});

/**this function has very basic validation of email, taz and mobile phone- the regex patters are viewable in the begginning of this code.
 * also- function will return true/false according to if the volunteers was added successfuly.
 * BUG- still doesnt handle case where id, cellphone or any of the unique values already exists in table
 */
function insertVolunteer(
  taz,
  first_name,
  last_name,
  cellphone,
  email,
  password
) {
  const add_vol_query = `INSERT INTO volunteers(taz, first_name, last_name, cellphone, email, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [taz, first_name, last_name, cellphone, email, password];
  if (
    validator.isEmail(email) &&
    MOBILE_PATTERN.test(cellphone) &&
    TAZ_PATTERN.test(taz)
  ) {
    console.log(
      "one of the details you entered is invalid. please try to check it again."
    );
    return false;
  }
  client
    .query(add_vol_query, values)
    .then((res) => {
      console.log(res.rows[0]); //inside the table, as long as it runs w/o errors.
      return true;
    })
    .catch((e) => console.error(e.stack));
}

insertVolunteer(
  7429185646,
  "tprob3Ori",
  // the log will show the values new row
  "sfds",
  "0547859798",
  "rel2@s2h.com",
  "1password"
);
//volunteer_list = execute('select * from volunteers')
//console.log(volunteer_list)
// callback
// // promise
// client
//  .query(text, values)
//  .then(res => {
//    console.log(res.rows[0])
//    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//  })
//  .catch(e => console.error(e.stack))
// // async/await
// try {
//  const res = await client.query(text, values)
//  console.log(res.rows[0])
//  // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
// } catch (err) {
//  console.log(err.stack)
// }

//export default insertVolunteer()
