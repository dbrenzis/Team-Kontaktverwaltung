const express = require("express");
const router = express.Router();
const kontaktController = require("../controllers/kontakt");
const mitarbeiterController = require("../controllers/mitarbeiter");

// Kontakt REST-API

router.get("/api/kontakte", kontaktController.getKontakte);

router.get("/api/kontakte/:id", kontaktController.getKontaktById);

router.post("/api/kontakte", kontaktController.postKontakt);

router.put("/api/kontakte/:id", kontaktController.putKontaktById);

router.delete("/api/kontakte/:id", kontaktController.deleteKontaktById);


// Mitarbeiter REST-API

router.get("/api/mitarbeiter", mitarbeiterController.getMitarbeiter);


module.exports = router;
