var db = require("./db");


const getMitarbeiter = (callback) => {
  db.query(
    "SELECT * FROM mitarbeiter",
    (err, result) => {
      if (err) {
        console.log("Error", err)
        callback(err, null)
        return
      }
      console.log("Mitarbeiter: ", result);
      callback(null, result);
    }
  );
};


module.exports = {
    getMitarbeiter
};
  