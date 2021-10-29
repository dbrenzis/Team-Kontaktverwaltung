var db = require("./db");


const getKontakte = (callback) => {
  db.query(
    "SELECT kontakt.kontaktid, kontakt.vorname, kontakt.nachname, kontakt.mailadresse, kontakt.telefonnummer, mitarbeiter.mitarbeiter_name FROM kontakt LEFT JOIN mitarbeiter on kontakt.mitarbeiterid = mitarbeiter.mitarbeiterid",
    (err, result) => {
      if (err) {
        console.log("Error", err)
        callback(err, null)
        return
      }
      
      console.log("Contacts: ", result);
      callback(null, result);
    }
  );
};


const getKontaktById = (id, callback) => {
  db.query(
    "SELECT kontakt.mitarbeiterid, kontakt.vorname, kontakt.nachname, kontakt.mailadresse, kontakt.telefonnummer  FROM kontakt WHERE kontaktid = ?",
    id,
    (err, result) => {
      if (err) {
        console.log("Error", err)
        callback(err, null)
        return
      }

      if (result.length) {
        console.log("Found Kontakt: ", result[0])
        callback(null, result[0])
        return
      }
      
      console.log(`Kontakt with the ID: ${id} was not found`)
      callback({notFound: `Kontakt with the ID: ${id} was not found`}, null)
    }
  );
}


const createKontakt = (newKontakt, callback) => {
  db.query(
    "INSERT INTO kontakt SET ?",
    newKontakt,
    (err, result) => {
      if (err) {
        console.log("Error", err)
        callback(err, null)
        return
      }
      
      console.log("Created kontakt: ", { kontaktid: result.insertId, ...newKontakt });
      callback(null, { kontaktid: result.insertId, ...newKontakt });
    }
  );
};


const putKontaktById = (id, updateKontakt, callback) => {
  db.query(
    "UPDATE kontakt SET mitarbeiterid = ?, vorname = ?, nachname = ?, mailadresse = ?, telefonnummer = ? WHERE kontaktid = ?",
    [updateKontakt.mitarbeiterid, updateKontakt.vorname, updateKontakt.nachname, updateKontakt.mailadresse, updateKontakt.telefonnummer, id],
    (err, result) => {
      if (err) {
        console.log("Error", err)
        callback(err, null)
        return
      }

      if (result.affectedRows == 0) {
        console.log(`Kontakt with the ID: ${id} was not found`)
        callback({notFound: `Kontakt with the ID: ${id} was not found`}, null)
        return;
      }
      
      console.log("Created kontakt: ", { kontaktid: id, ...updateKontakt });
      callback(null, { kontaktid: id, ...updateKontakt });
    }
  );
};


const deleteKontaktById = (id, callback) => {
  db.query(
    "DELETE FROM kontakt WHERE kontaktid = ?",
    id,
    (err, result) => {
      if (err) {
        console.log("Error", err)
        callback(err, null)
        return
      }

      if (result.affectedRows == 0) {
        console.log(`kontakt with the ID: ${id} was not found`)
        callback({notFound: `kontakt with the ID: ${id} was not found`}, null)
        return;
      }
      
      console.log("Deleted kontakt with ID: ", id);
      callback(null, result);
    }
  );
}


module.exports = {
  getKontakte,
  getKontaktById,
  createKontakt,
  putKontaktById,
  deleteKontaktById
};
