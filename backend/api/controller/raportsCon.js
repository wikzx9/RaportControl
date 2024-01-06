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

exports.raport_get_all =(req, res, next) => {
    Raport.find()
    .then(result =>{
        res.status(200).json({
            wiadomosc:"Lista wszystkich raportów",
            info: result
        })
    })
    .catch(err=> res.status(500).json(err))
}

exports.raport_get_by_id =(req, res, next) =>{
    const id = req.params.id
    Raport.findById(id)
    .then(result =>{
        res.status(200).json({
            wiadomosc:"Szczegóły raportu o nr"+id,
            info:result
        })
    })
    .catch(err=> res.status(500).json(err))  
}

exports.raport_change=(req, res, next) =>{
    const id = req.params.id
    Raport.findByIdAndUpdate(id,{
        lokalizacja: req.body.lokalizacja,
        pracownicy: req.body.pracownicy,
        data: req.body.data,
        materialy: req.body.materialy,
        zdjecia:{
            nazwa: req.body.nazwa,
            lokpliku: req.body.lokpliku,
        }
    })
    .then(result =>{
        res.status(200).json({
            wiadomosc:"Raport o id: "+id+" został zaktualizowany"
        })
    })
    .catch(err=> res.status(500).json(err))  
}

exports.raport_delete = (req,res,next) =>{
    const id = req.params.id
    Raport.findByIdAndDelete(id)
    .then(() => res.status(200).json({wiadomosc: "Usunięcie raportu o numerze " + id}))
    .catch(err=> res.status(500).json(err))   
}