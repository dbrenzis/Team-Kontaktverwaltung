const mitarbeiterModel = require("../models/mitarbeiter");

////CRUD functions

const getMitarbeiter = (req, res) => {
    mitarbeiterModel.getMitarbeiter( (err, mitarbeiter) => {
      if(err)
        res.status(500).send(err.message)
      else
        res.send(mitarbeiter)
    });
  };


module.exports = {
    getMitarbeiter
};