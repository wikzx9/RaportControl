const express = require("express")
const raport = require("../models/raportModel")
const router = express.Router();
const checkAuth = require("../middleware/checkAuth")
const raportControler = require("../controller/raportsCon")

router.post("/dodaj", checkAuth,  raportControler.raport_dodaj_nowy)








module.exports = router