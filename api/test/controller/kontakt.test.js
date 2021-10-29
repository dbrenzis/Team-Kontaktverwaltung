const kontaktController = require('../../controllers/kontakt')


test('Kontakt Validierung mit konformen Kontakt-Objekt', () => {
    const kontakt = {
        vorname: "Daniel",
        nachname: "Brenzis",
        mailadresse: "daniel@brenzis.de",
        telefonnummer: "01727208508",
        mitarbeiterid: 1
    }

    expect( kontaktController.validationKontakt(kontakt) ).toStrictEqual({value:kontakt})
    expect( kontaktController.validationKontakt(kontakt).error ).toBeUndefined()
})

test('Kontakt Validierung mit zu kurzem Vornamen ', () => {
    const kontakt = {
        vorname: "D",
        nachname: "Brenzis",
        mailadresse: "daniel@brenzis.de",
        telefonnummer: "01727208508",
        mitarbeiterid: 1
    }

    expect( kontaktController.validationKontakt(kontakt).error ).toBeDefined()
    expect( kontaktController.validationKontakt(kontakt).error.message ).toStrictEqual('"vorname" length must be at least 2 characters long')
})

test('Kontakt Validierung mit leerem Nachnamen ', () => {
    const kontakt = {
        vorname: "Daniel",
        nachname: "",
        mailadresse: "daniel@brenzis.de",
        telefonnummer: "01727208508",
        mitarbeiterid: 1
    }

    expect( kontaktController.validationKontakt(kontakt).error ).toBeDefined()
    expect( kontaktController.validationKontakt(kontakt).error.message ).toStrictEqual('"nachname" is not allowed to be empty')
})

test('Kontakt Validierung mit fehlerhafter Mailadresse ', () => {
    const kontakt = {
        vorname: "Daniel",
        nachname: "Brenzis",
        mailadresse: "danielbrenzis.de",
        telefonnummer: "01727208508",
        mitarbeiterid: 1
    }

    expect( kontaktController.validationKontakt(kontakt).error ).toBeDefined()
    expect( kontaktController.validationKontakt(kontakt).error.message ).toStrictEqual('"mailadresse\" must be a valid email')
})

test('Kontakt Validierung ohne Telefonummer ', () => {
    const kontakt = {
        vorname: "Daniel",
        nachname: "Brenzis",
        mailadresse: "daniel@brenzis.de",
        mitarbeiterid: 1
    }

    expect( kontaktController.validationKontakt(kontakt).error ).toBeDefined()
    expect( kontaktController.validationKontakt(kontakt).error.message ).toStrictEqual('"telefonnummer\" is required')
})

test('Kontakt Validierung mit String als Mitarbeiterid ', () => {
    const kontakt = {
        vorname: "Daniel",
        nachname: "Brenzis",
        mailadresse: "daniel@brenzis.de",
        telefonnummer: "01727208508",
        mitarbeiterid: "a"
    }

    expect( kontaktController.validationKontakt(kontakt).error ).toBeDefined()
    expect( kontaktController.validationKontakt(kontakt).error.message ).toStrictEqual('"mitarbeiterid\" must be a number')
})
