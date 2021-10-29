const kontaktModel = require("../models/kontakt");
const Joi = require('joi');


/////Helper functions
/**
 * Dieser Funktion übernimmt die Validierung eines Kontaktobjekts anhand der im validationSchema beschriebenen Bedingungen
 * @param {Object} kontakt - Ein Objekt, bestehende aus einem Vornamen, einem Vachnamen, einer Mailadresse, einer Telefonnummer und einer Mitarbeiterid
 * @returns {Object} Liefert bei positivem Ausgang nur das Kontakt-Objekt zurück. Bei negativem Ausgang werden die gefundenen Fehler zurückgeliefert.
 */
const validationKontakt = kontakt => {
  const validationSchema = Joi.object({
    vorname: Joi.string().min(2).max(200).required(),
    nachname: Joi.string().min(2).max(200).required(),
    mailadresse: Joi.string().email().max(200).required(),
    telefonnummer: Joi.string().min(10).max(20).required(),
    mitarbeiterid: Joi.number().required()
  });

  return validationSchema.validate(kontakt)
}


////CRUD functions

const getKontakte = (req, res) => {
  kontaktModel.getKontakte( (err, kontakte) => {
    if(err)
      res.status(500).send(err.message)
    else
      res.send(kontakte)
  });
};


const getKontaktById = (req, res) => {
  kontaktModel.getKontaktById(req.params.id, (err, kontakt) => {
    if(err){
      if(err.notFound)
        res.status(404).send(err.notFound)
      else
        res.status(500).send(err.message)
    }else
      res.send(kontakt);
  });
};


const postKontakt = (req, res) => {
  const {error} = validationKontakt(req.body)
  if(error)
    res.status(400).send(error.details[0].message)
  else{
    kontaktModel.createKontakt(req.body, (err, createdKontakt) => {
      if(err)
        res.status(500).send(err.message)
      else
        res.send(createdKontakt)
    });
  }
};


const putKontaktById = (req, res) => {
  const {error} = validationKontakt(req.body)
  if(error)
    res.status(400).send(error.details[0].message)
  else{
    kontaktModel.putKontaktById(req.params.id, req.body, (err, updatedKontakt) => {
      if(err){
        if(err.notFound)
          res.status(404).send(err.notFound)
        else
          res.status(500).send(err.message)
      }else
        res.send(updatedKontakt);
    });
  }
};


const deleteKontaktById = (req, res) => {
  kontaktModel.deleteKontaktById(req.params.id, (err, kontakt) => {
    if(err){
      if(err.notFound)
        res.status(404).send(err.notFound)
      else
        res.status(500).send(err.message)
    }else
      res.send({message: `Kontakt was deleted successfully!`});
  });
};

module.exports = {
  getKontakte,
  getKontaktById,
  postKontakt,
  putKontaktById,
  deleteKontaktById,
  validationKontakt
};
