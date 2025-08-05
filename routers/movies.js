// importiamo express
const express = require("express");
const router = express.Router();

// importiamo le funzioni del controller
const movieController = require("../controllers/movieController");

/* rotte CRUD */

/* index (read all) */
// router per ottenere tutti i film, con possibilità di filtro tramite query string
router.get("/", movieController.index);

/* show (read) */
// route per ottenere un film specifico tramite ID
router.get("/:id", movieController.show);

/* store (create) */
// route per creare una nuova recensione
router.post("/:id/reviews", movieController.storeReviews);

// esportiamo router
module.exports = router;
