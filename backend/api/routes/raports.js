const express = require("express")
const router = express.Router();
const raportControler = require("../controller/raportsCon")
const verifyRoles = require('../middleware/verifyRoles')
const ROLES_LIST = require('../config/rolesList')

router.post("/dodaj",raportControler.raport_dodaj_nowy)

router.get("/lista",raportControler.raport_get_all)

router.get("/:id",raportControler.raport_get_by_id)

router.put("/aktualizuj/:id", raportControler.raport_change)

router.delete("/usun/:id", raportControler.raport_delete)



module.exports = router