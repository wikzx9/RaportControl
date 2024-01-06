const mongoose = require("mongoose")

const raportSchema = mongoose.Schema({
    lokalizacja : String,
    pracownicy : String,
    data : String,
    czaspracy : String,
    opis : String,
    materialy : String,
    zdjecia : {
        nazwa: String,
        lokpliku: String
    }
},
{
    timestamps: true,
})
//dodać opis i czas pracy
module.exports = mongoose.model("Raport", raportSchema)