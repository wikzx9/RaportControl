const mongoose = require("mongoose")

const raportSchema = mongoose.Schema({
    lokalizacja : String,
    pracownicy : String,
    data : String,
    materialy : String,
    zdjecia : {
        nazwa: String,
        lokpliku: String
    }
})

module.exports = mongoose.model("Raport", raportSchema)