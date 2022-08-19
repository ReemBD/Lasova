
var pgtools = require("pgtools");
const config = {
  user: "lasova-client",
  host: "localhost",
  password: "1234",
  port: 5432
};

pgtools.createdb(config, "lasova_trial", function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

