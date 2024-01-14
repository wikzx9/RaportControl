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

module.exports = mongoose.model("Raport", raportSchema)