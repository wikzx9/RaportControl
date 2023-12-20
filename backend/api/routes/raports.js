const express = require("express")
const raport = require("../models/raportModel")
const router = express.Router();
const checkAuth = require("../middleware/checkAuth")
const raportControler = require("../controller/raportsCon")

router.post("/dodaj", checkAuth,  raportControler.raport_dodaj_nowy)

router.get("/lista",raportControler.raport_get_all)

router.get("/:id",raportControler.raport_get_by_id)

router.put("/aktualizuj/:id",raportControler.raport_change)

router.delete("/usun/:id", raportControler.raport_delete)



module.exports = router