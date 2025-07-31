// importiamo express
const express = require("express");
const router = express.Router();

// importiamo le funzioni del controller
const movieController = require("../controllers/movieController");

/* rotte CRUD */

/* index (read) */
// router per ottenere tutti i film, con possibilità di filtro tramite query string
router.get("/", movieController.index);

/* show (read) */
// route per ottenere un film specifico tramite ID
router.get("/:id", movieController.show);

// esportiamo router
module.exports = router;
