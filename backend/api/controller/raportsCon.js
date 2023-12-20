const Raport = require("../models/raportModel")

exports.raport_dodaj_nowy = (req, res, next) => {
    const raport = new Raport({
        lokalizacja: req.body.lokalizacja,
        pracownicy: req.body.pracownicy,
        data: req.body.data,
        materialy: req.body.materialy,
        zdjecia:{
            nazwa: req.body.nazwa,
            lokpliku: req.body.lokpliku,
        }
    })

    raport.save()
    .then(result => {
        res.status(201).json({
            wiadomosc: "Dodano nowy raport",
            info: result
        })
    })
    .catch(err=> res.status(500).json(err))
}